import { useState } from "react";
import { useDropzone } from "react-dropzone";
import './Upload.css';
import cloudImg from '../cloud.png';
import axios from "axios";

function Upload() {
  const [showUpload, setShowUpload] = useState(false);
  const [showEmployeeInput, setShowEmployeeInput] = useState(false);
  const [showCompanyInput, setShowCompanyInput] = useState(false);
  const [newEmployee, setNewEmployee] = useState("");
  const [newCompany, setNewCompany] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    employeeId: '',
    companyId: '',
    signerName: '',
    signerTitle: '',
    purpose: '',
    signDate: '',
    expirationDate: ''
  });
  
  // Sample dropdown options (fetch these from API later)
  const employees = [
    { id: 1, name: 'John Doe (HR)' },
    { id: 2, name: 'Jane Smith (Finance)' }
  ];
  
  const companies = [
    { id: 1, name: 'Acme Corp' },
    { id: 2, name: 'Globex Inc' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEmployee = () => {
    setShowEmployeeInput(true); // Show input field
  };

  const handleAddCompany = () => {
    setShowCompanyInput(true); // Show input for new company
  };
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // TODO: Optionally validate formData here
    setShowUpload(true);
  };
  
  const [files, setFiles] = useState([]);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    onDrop: async(acceptedFiles) => {
      setFiles(acceptedFiles);
      setLoading(true);

      const formData = new FormData();
      formData.append("Title", "Gamer")
      formData.append("File", acceptedFiles[0]); 

      try {
        const res = await axios.post("https://localhost:7103/api/Document/process", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*"
          },
        });

        setResponse({
          Title: res.data.title || "No Title", // Ensure title exists
          RawText: res.data.rawText || "No extracted text available", // Fix RawText mapping
          TimeStamp: res.data.timeStamp || "1/1/1967 12:00:00 AM",
          metadata: {
            size: acceptedFiles[0].size,
            type: acceptedFiles[0].type,
          },
        });
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleReload = () => {
    setFiles([]);
    setResponse(null);
  };

  return (
    <div className="upload-container">
      {!showUpload ? (
        <form onSubmit={handleFormSubmit} className="pre-upload-form">
          <h2>Contract Details</h2>
          
          {/* Employee Dropdown */}
          <label>Employee:</label>
          <select name="employeeId" value={formData.employeeId} onChange={handleInputChange} required={!newEmployee}>
            <option value="">Select Employee</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>{emp.name}</option>
            ))}
          </select>

          {/* Add New Employee Button */}
          {!showEmployeeInput ? (
            <button type="button" onClick={handleAddEmployee} className="add-btn">
              + Add New Employee
            </button>
          ) : (
            <input
              type="text"
              placeholder="Enter new employee name"
              value={newEmployee}
              onChange={(e) => setNewEmployee(e.target.value)}
              className="input-field"
            />
          )}

          {/* Company Dropdown */}
          <label>Company:</label>
          <select name="companyId" value={formData.companyId} onChange={handleInputChange} required={!newCompany}>
            <option value="">Select Company</option>
            {companies.map(comp => (
              <option key={comp.id} value={comp.id}>{comp.name}</option>
            ))}
          </select>

          {/* Add New Company Button */}
          {!showCompanyInput ? (
            <button type="button" onClick={handleAddCompany} className="add-btn">
              + Add New Company
            </button>
          ) : (
            <input
              type="text"
              placeholder="Enter new company name"
              value={newCompany}
              onChange={(e) => setNewCompany(e.target.value)}
              className="input-field"
            />
          )}

          <label>Signer Name:</label>
          <input type="text" name="signerName" value={formData.signerName} onChange={handleInputChange} required />

          <label>Signer Title:</label>
          <input type="text" name="signerTitle" value={formData.signerTitle} onChange={handleInputChange} required/>

          <label>Purpose:</label>
          <textarea name="purpose" value={formData.purpose} onChange={handleInputChange} required placeholder="Enter the purpose of the contract..." />

          <label>Sign Date:</label>
          <input type="date" name="signDate" value={formData.signDate} onChange={handleInputChange} required />

          <label>Expiration Date:</label>
          <input type="date" name="expirationDate" value={formData.expirationDate} onChange={handleInputChange} required />

          <button type="submit" className="upload-button">Proceed to Upload</button>
        </form>
      ) : (
        <>
          {/* Your existing upload/dropzone code here */}
          {!response && (
            <div {...getRootProps()} className="upload-box">
              <input {...getInputProps()} />
              <div className="upload-image">
                <img src={cloudImg} alt="Cloud Icon" className="rotating-gear rotate" />
              </div>
              <h4>Drag & drop files here, or click to browse</h4>
              <p>Files Supported: PDF, TEXT, DOC, DOCX, PNG, JPG</p>
              <button className="upload-button" onClick={open}>
                Browse
              </button>
            </div>
          )}
          {loading && <p>Processing document...</p>}
          {response && (
            <div className="response-container">
              <h2 className="document-title">{response.Title}</h2>
              <p className="metadata"><strong>Timestamp:</strong> {response.TimeStamp}</p>
              <div className="extracted-text">
                <h3>Extracted Text:</h3>
                <p>{response.RawText}</p>
              </div>
              <button onClick={handleReload} className="upload-button">Upload Another Document</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Upload;
