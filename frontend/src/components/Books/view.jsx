import React, { useState } from "react";

import { useSelector } from "react-redux";

import { PageHeader, Button } from "antd";

import { Document, Page } from "react-pdf/dist/entry.webpack";

function MyApp() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const currentReading = useSelector((state) => state.books.currentReading);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={false}
          title="Reading"
          onBack={() => window.history.back()}
        ></PageHeader>
      </div>
      <Document file={currentReading.url} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        <Button
          onClick={() => {
            if (pageNumber > 1) {
              setPageNumber(pageNumber - 1);
            }
          }}
        >
          Prev
        </Button>{" "}
        Page {pageNumber} of {numPages}{" "}
        <Button
          onClick={() => {
            if (pageNumber < numPages) {
              setPageNumber(pageNumber + 1);
            }
          }}
        >
          Next
        </Button>
      </p>
    </div>
  );
}
export default MyApp;
