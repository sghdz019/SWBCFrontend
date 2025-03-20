import { useState } from "react";
import { useDropzone } from "react-dropzone";
import './Upload.css';
import cloudImg from '../cloud.png';

function Upload() {
  const [files, setFiles] = useState([]);
  const [response, setResponse] = useState(null);

  const { getRootProps, getInputProps, open } = useDropzone({
    noClick: true,
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
      setTimeout(() => {
        setResponse({
          Title: "Extracted Document Title",
          RawText: "This is the extracted text from the uploaded document...",
          TimeStamp: new Date().toISOString(),
          metadata: { size: acceptedFiles[0].size, type: acceptedFiles[0].type },
        });
      }, 2000);
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

      {/* Show the response once file is processed */}
      {response && (
        <div className="response-container">
          <h2 className="document-title">{response.Title}</h2>
          <p className="metadata">
            <strong>Size:</strong> {response.metadata.size} bytes | <strong>Type:</strong>{" "}
          {response.metadata.type}
          </p>
          <p><strong>Timestamp:</strong> {new Date(response.TimeStamp).toLocaleString()}</p>
          <div className="extracted-text">
            <h3>Extracted Text:</h3>
            <p>{response.text}</p>
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