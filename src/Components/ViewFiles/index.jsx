import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { Button, Modal, Table, Pagination } from "react-bootstrap";

const ViewFiles = ({ userId }) => {
  const [files, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filesPerPage] = useState(10);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const filesRef = collection(db, "imported_files");
        const q = query(filesRef, where("userId", "==", userId));
        const snapshot = await getDocs(q);
        const fileList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFiles(fileList);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, [userId]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Pagination logic
  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = files.slice(indexOfFirstFile, indexOfLastFile);

  const totalPages = Math.ceil(files.length / filesPerPage);

  const handleClickPageNumber = (number) => {
    setCurrentPage(number);
  };

  return (
    <div>
      <a
        href="javascript:void(0)"
        className="btn btn-default border-1"
        onClick={handleShowModal}
      >
        {" "}
        <i className="fa fa-file-text">&nbsp;</i> View Imported Files
      </a>
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Imported Files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {currentFiles.map((file) => (
                <tr key={file.id}>
                  <td>{file.filename}</td>
                  <td>
                    <a href={file.fileURL} rel="noopener noreferrer">
                      Download File
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
            <Pagination.First
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />
            {[...Array(totalPages).keys()].map((number) => (
              <Pagination.Item
                key={number + 1}
                active={number + 1 === currentPage}
                onClick={() => handleClickPageNumber(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewFiles;
