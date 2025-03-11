import { useState } from "react";
import { useDropzone } from "react-dropzone";
import './Upload.css';

function Upload() {
  const [files, setFiles] = useState([]);
  const [response, setResponse] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
      setTimeout(() => {
        setResponse({
          metadata: { size: acceptedFiles[0].size, type: acceptedFiles[0].type },
          text: "Extracted text from document...",
        });
      }, 2000);
    },
  });

  const handleReload = () => {
    // Reset the state to allow uploading another file
    setFiles([]);
    setResponse(null);
  };

  return (
    <div className="flex flex-col items-center p-10">
      <div
        {...getRootProps()}
        className="upload-box"
      >
        <input {...getInputProps()} />
        <p>Drag & drop files here, or click to browse</p>
      </div>
      <div className="mt-4">
        {files.length > 0 && files.map((file) => (
          <p key={file.path}>{file.path} - {file.size} bytes</p>
        ))}
      </div>
      {response && (
        <div className="mt-4 border p-4">
          <h3 className="font-bold">Metadata:</h3>
          <p>Size: {response.metadata.size} bytes</p>
          <p>Type: {response.metadata.type}</p>
          <h3 className="font-bold mt-2">Extracted Text:</h3>
          <p>{response.text}</p>
        </div>
      )}
      {/* Conditionally render the "Upload Another Document" button */}
      {files.length > 0 && (
        <button
          onClick={handleReload}
          className="upload-button"
        >
          Upload Another Document
        </button>
      )}
    </div>
  );
}

export default Upload;