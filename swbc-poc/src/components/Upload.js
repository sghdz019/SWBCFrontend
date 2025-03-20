import { useState } from "react";
import { useDropzone } from "react-dropzone";
import './Upload.css';
import cloudImg from '../cloud.png';
import axios from "axios"

function Upload() {
  const [files, setFiles] = useState([]);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    onDrop: async(acceptedFiles) => {
      setFiles(acceptedFiles);
      setLoading(true);

      const formData = new FormData();
      formData.append("file", acceptedFiles[0]); 

      try {
        const res = await axios.post("http://localhost:5000/api/documents/process", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setResponse(res.data);
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
      {/* Hide upload box when response is received */}
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

      {/* Show loading state */}
      {loading && <p>Processing document...</p>}

      {/* Show the response once file is processed */}
      {response && (
        <div className="response-container">
          <h2 className="document-title">{response.Title}</h2>
          <p className="metadata">
            <strong>Timestamp:</strong> {new Date(response.TimeStamp).toLocaleString()}
          </p>
          <div className="extracted-text">
            <h3>Extracted Text:</h3>
            <p>{response.RawText}</p>
          </div>
          <button onClick={handleReload} className="upload-button">
            Upload Another Document
          </button>
        </div>
      )}
    </div>
  );
}

export default Upload;