import './Dashboard.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [checkedFiles, setCheckedFiles] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const filesPerPage = 10;

  const files = [
    { id: 1, name: '1.docx', type: '📄', size: '11 KB', updated: '6/23/2020 10:53 AM', company: 'ABC Corp', employee: 'John Doe' },
    { id: 2, name: '1.pptx', type: '📄', size: '32 KB', updated: '6/23/2020 12:04 PM', company: 'XYZ Inc', employee: 'Jane Smith' },
    { id: 3, name: '1.xlsx', type: '📊', size: '6.25 KB', updated: '6/23/2020 9:27 AM', company: 'ABC Corp', employee: 'Alice Johnson' },
    { id: 4, name: '2.docx', type: '📄', size: '22.5 KB', updated: '6/23/2020 11:55 AM', company: 'XYZ Inc', employee: 'Mark Evans' },
    { id: 5, name: 'Book1.xlsx', type: '📊', size: '6.1 KB', updated: '6/23/2020 8:00 AM', company: 'ABC Corp', employee: 'David Lee' },
    { id: 6, name: 'Report1.docx', type: '📄', size: '15 KB', updated: '6/24/2020 10:00 AM', company: 'XYZ Inc', employee: 'Peter Parker' },
    { id: 7, name: 'Image.png', type: '📷', size: '4 MB', updated: '6/25/2020 2:20 PM', company: 'ABC Corp', employee: 'Bruce Wayne' },
    { id: 8, name: 'Presentation.pptx', type: '📄', size: '18 KB', updated: '6/26/2020 9:45 AM', company: 'XYZ Inc', employee: 'Clark Kent' },
    { id: 9, name: 'Sheet1.xlsx', type: '📊', size: '10 KB', updated: '6/27/2020 3:30 PM', company: 'ABC Corp', employee: 'Diana Prince' },
    { id: 10, name: 'Document.docx', type: '📄', size: '25 KB', updated: '6/28/2020 8:15 AM', company: 'XYZ Inc', employee: 'Barry Allen' },
    { id: 11, name: 'Book2.xlsx', type: '📊', size: '5 KB', updated: '6/29/2020 10:00 AM', company: 'ABC Corp', employee: 'Wally West' },
    { id: 12, name: 'B=bar.xlsx', type: '📊', size: '6.1 KB', updated: '6/23/2020 8:00 AM', company: 'ABC Corp', employee: 'David Lee' },
    { id: 13, name: 'ril.xlsx', type: '📊', size: '6.1 KB', updated: '6/23/2020 8:00 AM', company: 'ABC Corp', employee: 'David Lee' },
    { id: 14, name: 'ethan.xlsx', type: '📊', size: '6.1 KB', updated: '6/23/2020 8:00 AM', company: 'ABC Corp', employee: 'David Lee' },
    { id: 15, name: 'josh.xlsx', type: '📊', size: '6.1 KB', updated: '6/23/2020 8:00 AM', company: 'ABC Corp', employee: 'David Lee' },
    { id: 16, name: 'viv.xlsx', type: '📊', size: '6.1 KB', updated: '6/23/2020 8:00 AM', company: 'ABC Corp', employee: 'David Lee' },
    { id: 17, name: 'grg.xlsx', type: '📊', size: '6.1 KB', updated: '6/23/2020 8:00 AM', company: 'ABC Corp', employee: 'David Lee' },
    { id: 18, name: 'cont.xlsx', type: '📊', size: '6.1 KB', updated: '6/23/2020 8:00 AM', company: 'ABC Corp', employee: 'David Lee' },
    { id: 19, name: 'log.xlsx', type: '📊', size: '6.1 KB', updated: '6/23/2020 8:00 AM', company: 'ABC Corp', employee: 'David Lee' },
    { id: 20, name: 'semilogy.xlsx', type: '📊', size: '6.1 KB', updated: '6/23/2020 8:00 AM', company: 'ABC Corp', employee: 'David Lee' },
];

//Apply filtering first
  const filteredFiles = files
    .filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name)); // Ensure consistent sorting

  // Calculate the files for the current page
  const totalPages = Math.ceil(filteredFiles.length / filesPerPage);
  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = filteredFiles.slice(indexOfFirstFile, indexOfLastFile);

  // Select All Logic
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setCheckedFiles(!selectAll ? currentFiles.map((file) => file.id) : []);
  };

  // Handle individual file selection
  const handleFileSelect = (id) => {
    if (checkedFiles.includes(id)) {
      setCheckedFiles(checkedFiles.filter((fileId) => fileId !== id));
    } else {
      setCheckedFiles([...checkedFiles, id]);
    }
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Pagination controls
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredFiles.length / filesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container">
      <div className="sidebar">
        <Link to="/Upload">
          <button className="create-btn">Create</button>
        </Link>
        {/* FIX */}
        <ul className="menu">
          <li>📁 My documents</li>
          <li>📂 Shared with me</li>
          <li>⭐ Favorites</li>
          <li>⏰ Recent</li>
          <li>🔒 Private Room
            <ul>
              <li>Sales</li>
              <li>Management</li>
              <li>Test Documents</li>
            </ul>
          </li>
          <li>🗂 Common</li>
          <li>🔄 In projects</li>
          <li>🗑 Trash</li>
        </ul>
      </div>

      <div className="main-content">
        <div className="toolbar">
          <div className="search-container">
            <button className="filter-btn">Filter +</button>
            <input
              type="text"
              className="search-box"
              placeholder="Search files"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-icon">🔍</span>
            <label className="sort-label">
              Sort by:
              <select className="sort-dropdown">
                <option>Last Modified Date</option>
                <option>File Name (A-Z)</option>
                <option>Company Name (A-Z)</option>
                <option>Employee Name (A-Z)</option>
                <option>File Type (A-Z)</option>
              </select>
            </label>
          </div>
          <div className="select-container">
            <div className="checkbox-container">
                <input className="checkbox" type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                <div className='check-text'>
                    Select All
                </div>
            </div>
            <div className="toolbar-btn-container">
              <button className="toolbar-btn">Sharing Settings</button>
              <button className="toolbar-btn">Download</button>
              <button className="toolbar-btn">Move to</button>
              <button className="toolbar-btn">Delete</button>
            </div>
          </div>
        </div>

        {/* FIX: Add Database API to update file list */}
        <div className="file-list-1">
          {currentFiles.length > 0 ? (
            currentFiles.map((file) => (
              <div key={file.id} className={`file-item ${checkedFiles.includes(file.id) ? 'selected' : ''}`}>
                <div className= "item-checkbox">
                  <input type="checkbox" checked={checkedFiles.includes(file.id)} onChange={() => handleFileSelect(file.id)} />
                </div>
                <Link to={`/file/${file.id}`} className="file-item-link">
                  <div className="middle-details">
                    <div className="file-info">
                      {file.type} {file.name}
                    </div>
                    <div className="file-details-line">
                      Company: {file.company} | Employee: {file.employee}
                    </div>
                  </div>
                  <div className="right-details">
                    <div className="file-details">
                      Updated: {file.updated} | Size: {file.size}
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>No files found matching your query.</p>
          )}
        </div>

        <div className="pagination">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`page-button ${number === currentPage ? 'active' : ''}`}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;