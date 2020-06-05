import React,{useState} from "react";
import {Button,Modal} from "react-bootstrap";
function Category() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Category
        </Button>
  
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Filter by Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <select class="mdb-select md-form">
          <option selected>Choose Categories</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
            </select>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
export default Category;