import React, { useState } from 'react';
import ReactPDF from 'react-pdf-js';
import "./PDFViewer.css"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
export default function PDFViewer({ url }) {
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const onDocumentLoad = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className='pdf-viewer-container'>
      <ReactPDF
        file={url}
        onLoad={onDocumentLoad}
        page={page}
        error={<p>Failed to load PDF. Please check the file URL.</p>}
      />
      <div className='pdf-viewer-btn'>
        <button type='button' onClick={() => setPage(page - 1)} disabled={page === 1}><FaChevronLeft /></button>
        <p>Page {page} / {numPages}</p>
        <button type='button' onClick={() => setPage(page + 1)} disabled={page === numPages}><FaChevronRight /></button>
      </div>
    </div>
  );
}
