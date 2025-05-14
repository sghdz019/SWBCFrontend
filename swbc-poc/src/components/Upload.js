import { useState } from "react";
import { useDropzone } from "react-dropzone";
import './Upload.css';
import cloudImg from '../cloud.png';
import axios from "axios";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField } from '@mui/material';
import { parse } from 'date-fns';

//Purpose: Asks user for form submission and to upload a file
function Upload() {
  const [showEmployeeInput, setShowEmployeeInput] = useState(false);
  const [showCompanyInput, setShowCompanyInput] = useState(false);
  const [newEmployee, setNewEmployee] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [formData, setFormData] = useState({
    employeeId: '',
    companyId: '',
    signerName: '',
    signerTitle: '',
    purpose: '',
    signDate: '',
    expirationDate: ''
  });

  const [files, setFiles] = useState([]);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
    setShowEmployeeInput(true);
  };

  const handleAddCompany = () => {
    setShowCompanyInput(true);
  };

  const handleReload = () => {
    setFiles([]);
    setResponse(null);
    setSubmitted(false); // reset submit state
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    onDrop: async (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
  });

  //Purpose: This function handles upload submission (API)
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      alert("Please upload a document before submitting.");
      return;
    }

    setLoading(true);
    setSubmitted(true);

    const doc = {
      // Build UnprocessedDocument 
      title: formData.docTitle,
      fileName: files[0].name,
      companyId: formData.companyId,
      employeeId: formData.employeeId,
      signerName: formData.signerName,
      signerTitle: formData.signerTitle,
      purpose: formData.purpose,
      signDate: formData.signDate,
      expirationDate: formData.expirationDate,
    };
  
    try {
      const method = "DETECT"; // or "ANALYZE"?
  
      const res = await axios.post(
        `https://localhost:7103/api/Document/process?method=${method}`,
        doc,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const jobId = res.data;
  
      // Call the second endpoint with jobId
      const format = "text"; // or "html"?
      const processedRes = await axios.get(
        `https://localhost:7103/api/Document/getProcessedDocument`,
        {
          params: {
            jobId: jobId,
            method: method,
            format: format,
          },
        }
      );
  
      //Purpose: Response back from API
      setResponse({
        Title: doc.title || "No Title",
        RawText: res.data.rawText || "No extracted text available",
        TimeStamp: new Date().toLocaleString() || "1/1/1967 12:00:00 AM",
        metadata: {
          size: files[0].size,
          type: files[0].type,
        },
      });
    } catch (error) {
      console.error("Error processing document:", error);
    } finally {
      setLoading(false);
    }
  };
//This is what was there before (worked with raw text)
  //   const uploadData = new FormData();
  //   uploadData.append("Title", "Gamer");
  //   uploadData.append("File", files[0]);

  //   try {
  //     const res = await axios.post("https://localhost:7103/api/Document/process", uploadData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         "Access-Control-Allow-Origin": "*"
  //       },
  //     });

  //     setResponse({
  //       Title: res.data.title || "No Title",
  //       RawText: res.data.rawText || "No extracted text available",
  //       TimeStamp: res.data.timeStamp || "1/1/1967 12:00:00 AM",
  //       metadata: {
  //         size: files[0].size,
  //         type: files[0].type,
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="upload-container">
      {!submitted ? (
        <form onSubmit={handleFormSubmit} className="pre-upload-form">
          <h2>Contract Details</h2>
  
          {/* Employee */}
          <label>Employee:</label>
          <select name="employeeId" value={formData.employeeId} onChange={handleInputChange} required={!newEmployee}>
            <option value="">Select Employee</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>{emp.name}</option>
            ))}
          </select>
          <div className="or-divider">or</div>
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
  
          {/* Company */}
          <label>Company:</label>
          <select name="companyId" value={formData.companyId} onChange={handleInputChange} required={!newCompany}>
            <option value="">Select Company</option>
            {companies.map(comp => (
              <option key={comp.id} value={comp.id}>{comp.name}</option>
            ))}
          </select>
          <div className="or-divider">or</div>
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
  
          {/* Other form fields */}
          <label>Signer Name:</label>
          <input type="text" name="signerName" value={formData.signerName} onChange={handleInputChange} required />
  
          <label>Signer Title:</label>
          <input type="text" name="signerTitle" value={formData.signerTitle} onChange={handleInputChange} required />
  
          <label>Purpose:</label>
          <textarea name="purpose" value={formData.purpose} onChange={handleInputChange} required placeholder="Enter the purpose of the contract..." />
  
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Sign Date"
              value={formData.signDate ? parse(formData.signDate, 'yyyy-MM-dd', new Date()) : null}
              onChange={(newValue) => {
                if (newValue instanceof Date && !isNaN(newValue)) {
                  setFormData((prev) => ({
                    ...prev,
                    signDate: newValue.toISOString().split('T')[0], // format as yyyy-MM-dd
                  }));
                }
              }}
              renderInput={(params) => (
                <TextField {...params} required fullWidth margin="dense" />
              )}
              views={['year', 'month', 'day']}
            />

            <DatePicker
              label="Expiration Date"
              value={formData.expirationDate ? parse(formData.expirationDate, 'yyyy-MM-dd', new Date()) : null}
              onChange={(newValue) => {
                if (newValue instanceof Date && !isNaN(newValue)) {
                  setFormData((prev) => ({
                    ...prev,
                    expirationDate: newValue.toISOString().split('T')[0],
                  }));
                }
              }}
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="dense" />
              )}
              views={['year', 'month', 'day']}
            />
        </LocalizationProvider>
  
          {/* Dropzone Upload Section */}
          <div {...getRootProps()} className="upload-box">
            <input {...getInputProps()} />
            <div className="upload-image">
              <img src={cloudImg} alt="Cloud Icon" className="cloud" />
            </div>
            {files.length > 0 ? (
              <div className="file-preview">
                <p><strong>Selected File:</strong> {files[0].name}</p>
                <p><strong>Type:</strong> {files[0].type}</p>
                <p><strong>Size:</strong> {(files[0].size / 1024).toFixed(2)} KB</p>
                <button type="button" className="upload-button" onClick={() => setFiles([])}>
                  Remove File
                </button>
              </div>
            ) : (
              <>
                <h4>Drag & drop files here, or click to browse</h4>
                <p>Files Supported: PDF, TEXT, DOC, DOCX, PNG, JPG</p>
                <button type="button" className="upload-button" onClick={open}>
                  Browse
                </button>
              </>
            )}
          </div>
  
          <button type="submit" className="upload-button">Submit</button>
        </form>
      ) : (
        <div className="response-container">
          {loading ? (
            <p>Processing document...</p>
          ) : (
            <>
              <h2 className="document-title">{response?.Title || "Pending Analysis"}</h2>
              <p className="metadata"><strong>Timestamp:</strong> {response?.TimeStamp || "Not processed yet"}</p>
              <div className="extracted-text">
                <h3>Extracted Text:</h3>
                <p>{response?.RawText || "Waiting for extracted text..."}</p>
              </div>
              <button type="button" onClick={handleReload} className="upload-button">
                Upload Another Document
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
  
}

export default Upload;
