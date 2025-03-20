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
            <strong>Timestamp:</strong> {response.TimeStamp}
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