import React, { useState } from "react";
import { db } from "../../FirebaseConfig";
import * as XLSX from "xlsx";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { collection, getDocs } from "firebase/firestore";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

// Register fonts for PDF generation
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const FirestoreDataDownloader = () => {
  const [selectedCollection, setSelectedCollection] = useState("");
  const [format, setFormat] = useState("xlsx");

  console.log("db", db);

  const collections = [
    "agency2",
    "calendar2",
    "calendar_dates2",
    "created_agencies",
    "routes",
    "routes2",
    "shapes2",
    "stop_times",
    "stop_times2",
    "stops2",
    "trips2",
  ];

  const fetchCollectionData = async (collectionName) => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName)); // Use collection function to reference a collection
      return querySnapshot.docs.map((doc) => doc.data());
    } catch (error) {
      console.error(
        `Error fetching data from collection ${collectionName}:`,
        error,
      );
      return [];
    }
  };

  const handleDownload = async () => {
    if (!selectedCollection) return;

    try {
      const data = await fetchCollectionData(selectedCollection);

      // Convert data to Excel or PDF based on user selection
      if (format === "xlsx") {
        // Generate Excel file
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, selectedCollection);
        XLSX.writeFile(workbook, `${selectedCollection}.xlsx`);
      } else if (format === "pdf") {
        // Generate PDF
        const pdfDocDefinition = {
          content: [
            { text: selectedCollection, style: "header" },
            { text: "\n" },
            {
              table: {
                headerRows: 1,
                body: [Object.keys(data[0])].concat(
                  data.map((row) => Object.values(row)),
                ),
              },
            },
          ],
          styles: {
            header: { fontSize: 18, bold: true },
          },
        };
        pdfMake
          .createPdf(pdfDocDefinition)
          .download(`${selectedCollection}.pdf`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Select Collection:</h2>
          <Form.Select
            value={selectedCollection}
            onChange={(e) => setSelectedCollection(e.target.value)}
          >
            <option value="">Select a collection</option>
            {collections.map((collection) => (
              <option key={collection} value={collection}>
                {collection}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col>
          <h2>Select Format:</h2>
          <Form.Select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value="xlsx">Excel (XLSX)</option>
            <option value="pdf">PDF</option>
          </Form.Select>
        </Col>
        <Col style={{ margin: "auto" }}>
          <Button onClick={handleDownload} disabled={!selectedCollection}>
            Download
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default FirestoreDataDownloader;
