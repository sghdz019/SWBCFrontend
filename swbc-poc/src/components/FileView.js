import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './FileView.css'; // Add the styles for the viewer

function ViewFile() {
  const { id } = useParams(); // Get the file ID from the URL
  const [fileDetails, setFileDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data for the file details (to simulate API response)
  const mockFileData = {
    id: id,
    name: 'Sample Contract Document',
    type: '📄', // Example: '📄' for document, '📷' for image
    size: '2MB',
    updated: '2025-04-04',
    company: 'Acme Corp',
    employee: 'John Doe (HR)',
    extractedText: 'This is some extracted text from the document... [mock text]',
    imageUrl: 'https://via.placeholder.com/600x400', // Placeholder image URL
  };

  useEffect(() => {
    const fetchFileDetails = async () => {
      try {
        // Simulating API data fetching delay
        setTimeout(() => {
          setFileDetails(mockFileData);
          setLoading(false);
        }, 1000); // Simulate 1 second delay
      } catch (err) {
        setError('File not found');
        setLoading(false);
      }
    };

    fetchFileDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!fileDetails) {
    return <div>No file data available</div>;
  }

  return (
<div className="view-file__container">
  <div className="view-file__header">
    <h2>File Details</h2>
    <div className="view-file__info">
      <div><strong>File Name:</strong> {fileDetails.name}</div>
      <div><strong>File Type:</strong> {fileDetails.type}</div>
      <div><strong>Size:</strong> {fileDetails.size}</div>
      <div><strong>Updated:</strong> {fileDetails.updated}</div>
      <div><strong>Company:</strong> {fileDetails.company}</div>
      <div><strong>Employee:</strong> {fileDetails.employee}</div>
    </div>
  </div>

  <div className="view-file__content">
    <h3>File Preview</h3>
    {/* Conditionally render the file content based on file type */}
    {fileDetails.type === '📄' || fileDetails.type === '📊' ? (
      <div className="view-file__preview">
        <h4>Extracted Text:</h4>
        <pre className="view-file__extracted-text-viewer">{fileDetails.extractedText}</pre>
      </div>
    ) : fileDetails.type === '📷' ? (
      <div className="view-file__image-preview">
        <img src={fileDetails.imageUrl} alt="File Preview" />
      </div>
    ) : (
      <div>Unsupported file type preview</div>
    )}
  </div>

  <div className="view-file__actions">
    <button className="view-file__download-btn">Download File</button>
    <button className="view-file__share-btn">Share File</button>
    <button className="view-file__edit-btn">Edit File</button>
  </div>
</div>

  );
}

export default ViewFile;
