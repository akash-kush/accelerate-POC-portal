import React, {useState} from "react";
import { connect } from "react-redux";
import {Button,Modal} from "react-bootstrap";
import {getAllCardsOnRoleBasis } from "../../../REDUX/actions";
function Role(props) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => {
        
        setShow(true);
       
    }
  

    let pref_value="";
    const handleOnChange=(value)=>{
        console.log('handleonchange...',value);
        pref_value= value;
    }
    const handleSubmit=()=>{
        props.getAllCardsOnRoleBasis(pref_value);
        handleClose();
    }
    return (
      <>
        <Button variant="primary" onClick={handleShow} style={{marginLeft:"8px"}}>
          Roles
        </Button>
  
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Filter by Roles</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <select class="mdb-select md-form" onChange={(e)=>handleOnChange(e.target.value)}>
          <option selected>Choose Your Prefered Role</option>
          <option value="U">User</option>
          <option value="P">Providers</option>
            </select>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  const mapStateToProps = state => {
    return { user: state.user.user };
  };
  const mapDispacthToProps = dispatch => {
    return {
        getAllCardsOnRoleBasis:  role=> dispatch(getAllCardsOnRoleBasis(role)),
    };
  }
export default connect(mapStateToProps,mapDispacthToProps)(Role);