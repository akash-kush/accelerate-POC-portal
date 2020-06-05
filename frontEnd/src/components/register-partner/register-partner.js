import React from "react";
import "./register-partner.css";
import axios from "axios";
//import history from "../../history";
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';

import { Grid, Paper, TextField, Button, withStyles } from "@material-ui/core";
import { Row, Col, Container, InputGroup } from "react-bootstrap";
const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 2
    // marginBottom:'40%'
  },
  padding: {
    padding: theme.spacing.unit
  },
  root: {
    justifyContent: 'center'
  },
  button:{
    backgroundColor:'red'
  }
});
const emailRegex = RegExp(
  /^([a-zA-Z0-9\'_]+)(\.[a-zA-Z0-9\'_]+)*@([a-zA-Z0-9]([a-zA-Z0-9]{0,61}[a-zA-Z0-9])?\.)([a-zA-Z]{2,3})$/
  // /^([a-zA-Z0-9\'_]+)(\.[a-zA-Z0-9\'_]+)*@([a-zA-Z0-9]([a-zA-Z0-9]{0,61}[a-zA-Z0-9])?\.)*([a-zA-Z]{2,3})$/
  // /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
const phoneNumberRegex = RegExp(
  /^[6-9]\d{9}$/
  // /^[0][1-9]\d{9}$|^[1-9]\d{9}$/
);
const GSTIN =RegExp(
 /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/
);
const PAN=RegExp(
 /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/
);

const formValid = ({ formErrors}) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  // Object.values(rest).forEach(val => {
  //   val === null && (valid = false);
  // });

  return valid;
};
const nextFormValid =({nextFormErrors})=>{
  let valid = true;

  // validate form errors being empty
  Object.values(nextFormErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  // Object.values(rest).forEach(val => {
  //   val === null && (valid = false);
  // });

  return valid;
}



class registerPartner extends React.Component {
  constructor(props) {
    super();
    this.state = {
      AllLocations:null,
      AllbusinessType:null,
      AllbusinessExperties:null,
      Name: null,
      phoneNumber: null,
      email: null,
      password: null,
      
      nextForm: false,
      typeChooseing:false,
      expertiseChoosing:false,
     
        GSTINID: null,
        PAN: null,
        location: "",


      formErrors: {
        Name: "",
        email: "",
        phoneNumber: "",
        password: "",
      },

      nextFormErrors: {
        GSTINID: "",
        PAN: "",

      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  componentDidMount(){
    axios.get('./db.json').then(
      (values)=>{
        this.setState({
          AllLocations:values.data.locations,
          AllbusinessType:values.data.type,
        AllbusinessExperties:values.data.Expertise
        });
      }).catch(err=>console.log(err));

      
  }
  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Name: ${this.state.Name}
        PhoneNumber:${this.state.phoneNumber}
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
      //redux action handler
      const Provider = {
        name: this.state.Name,
        password: this.state.password,
        email: this.state.email,
        phone_number: this.state.phoneNumber,
        role: "P"
      }
      console.log('first form details are ', Provider);
      console.log('state after first form is ', this.state);
      this.setState({ ...this.state, nextForm: true });
      // history.push({
      //   pathname:'/finalsetpsforRegistration',
      //   state:Provider
      //  } )
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
  
    // console.log('event is ', e.target);
    switch (name) {
      case "Name":
        formErrors.Name =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      case "phoneNumber":
        formErrors.phoneNumber = phoneNumberRegex.test(parseInt(value))
          ? ""
          : "Enter 10 digit mobile number";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
  }
handleNextFormChange=(e)=>{
  e.preventDefault();
  const { name, value } = e.target;
  let nextFormErrors = { ...this.state.nextFormErrors };
  console.log('event is ', e.target);
  switch(name){
    case "GSTINID":
      console.log('inside....');
      nextFormErrors.GSTINID =
        GSTIN.test(value) ? "" : "GSTIN should be of 15 charecters and Valid";
      break;
    case "PAN":
      nextFormErrors.PAN =
        PAN.test(value) ? "" : "PAN should be of 10 charecters and Valid";
      break;
  }
  this.setState({ nextFormErrors, [name]: value }, () => console.log(this.state));
}
handleNextFormSubmit = (e)=>{
  e.preventDefault();
  console.log(this.state);
  console.log(this.state.GSTINID," ",this.state.PAN, " ",this.state.location);
  if(nextFormValid(this.state)){
    console.log(`
    --SUBMITTING--
    GST: ${this.state.GSTINID}
    PAN:${this.state.PAN}
    location:${this.state.location}
  `);

  this.setState({typeChooseing:true});
  }
  else {
    console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
  }
}

handleTypeSubmit =(e)=>{
  this.setState({expertiseChoosing:true});
}
handleExpertiseSubmit = (e) =>{
  console.log('finalized partner state',this.state);
}



  render() {
    // console.log('looging state object ', this.state);
    const { classes } = this.props;
    const { formErrors } = this.state;
    const { nextFormErrors } = this.state;


 

    let businessTypes=[];
    if(this.state.typeChooseing == true){
      businessTypes= this.state.AllbusinessType.map(values=>{
        return (
        <span className="badges">{values}</span>
        )
      })
    }

    return (
      <React.Fragment>
        <div className="wrapper">
          <Container>
            <Row className="my-row" >
              <Col md={5} xs={{ span: 12, offset: 0 }} sm={{ span: 12, offset: 0 }} className="form-col">
                {this.state.nextForm === false ?

                  <Paper square elevation={20} style={{ padding: '2rem' }}>
                    <div className={classes.margin}>
                      <Grid container spacing={0} alignItems="flex-end">
                        <Grid item md={true} sm={true} xs={true}>
                          <h3>Create Your Provider Account</h3>
                        </Grid>
                      </Grid>

                      <form onSubmit={this.handleSubmit}>
                        <Grid container spacing={10} alignItems="flex-end" style={{ marginTop: "0rem" }}>
                          <Grid item md={true} sm={true} xs={true}>
                            <TextField
                              id="Name"
                              error={formErrors.Name.length > 0 ? true : false}
                              name="Name"
                              label="Enter Name"
                              type="text"
                              fullWidth
                              autoFocus
                              onChange={this.handleChange}
                              helperText={formErrors.Name.length > 0 ? formErrors.Name : null}
                              InputProps={{
                                endAdornment:formErrors.Name.length === 0 && this.state.Name!==null ? <CheckOutlinedIcon style={{color:'green'}}/>:null
                              }}
                             
                              required />
                             
                          </Grid>
                        </Grid>

                        <Grid container spacing={8} alignItems="flex-end" style={{ marginTop: "0rem" }}>
                          <Grid item md={true} sm={true} xs={true}>
                            <TextField
                              id="email"
                              name="email"
                              error={formErrors.email.length > 0 ? true : false}
                              label="Enter Email"
                              type="email"
                              fullWidth
                              helperText={formErrors.email.length > 0 ? formErrors.email : null}
                              autoFocus
                              onChange={this.handleChange}
                              InputProps={{
                                endAdornment:formErrors.email.length === 0 && this.state.email!==null ? <CheckOutlinedIcon style={{color:'green'}}/>:null
                              }}
                              required />

                          </Grid>
                        </Grid>
                        <Grid container spacing={8} alignItems="flex-end" style={{ marginTop: "0rem" }}>
                          {/* <Grid item>
                            <Fingerprint />
                        </Grid> */}
                          <Grid item md={true} sm={true} xs={true}>
                            <TextField
                              id="password"
                              error={formErrors.password.length > 0 ? true : false}
                              name="password"
                              label="Enter Password"
                              type="password"
                              fullWidth
                              helperText={formErrors.password.length > 0 ? formErrors.password : null}
                              onChange={this.handleChange}
                              InputProps={{
                                endAdornment:formErrors.password.length === 0 && this.state.password!==null ? <CheckOutlinedIcon style={{color:'green'}}/>:null
                              }}
                              required />
                          </Grid>
                        </Grid>
                        <Grid container spacing={8} alignItems="flex-end" style={{ marginTop: "0rem" }}>
                          <Grid item md={true} sm={true} xs={true}>
                            <TextField
                              id="phoneNumber"
                              error={formErrors.phoneNumber.length > 0 ? true : false}
                              name="phoneNumber"
                              label="Your Mobile Number"
                              type="text"
                              fullWidth
                              onChange={this.handleChange}
                              helperText={formErrors.phoneNumber.length > 0 ? formErrors.phoneNumber : null}
                              InputProps={{
                                endAdornment:formErrors.phoneNumber.length === 0 && this.state.phoneNumber!==null ? <CheckOutlinedIcon style={{color:'green'}}/>:null
                              }}
                              required />

                          </Grid>
                        </Grid>
                        <Grid container spacing={9} >
                          <Grid item md={true} sm={true} xs={true}>
                            <Button variant="contained"
                              style={{ textTransform: "none", textAlign: 'left', width: '30%', backgroundColor: '#23aac7', color: 'white' }}
                              type="submit"
                            >Next
                        </Button>
                          </Grid>

                        </Grid>


                      </form>
                    </div>
                  </Paper>

                  :
                  //....... Next-form for storing additional details.....

                  this.state.typeChooseing === false ? 
                 
                 <Paper square elevation={20} style={{ padding: '2rem' }}>
                  <div className={classes.margin}>
                    <Grid container spacing={0} alignItems="flex-end">
                      <Grid item md={true} sm={true} xs={true}>
                        <h3>Give Your Business Deatils</h3>
                      </Grid>
                    </Grid>

                    <form onSubmit={this.handleNextFormSubmit.bind(this)}>
                      <Grid container spacing={10} alignItems="flex-end" style={{ marginTop: "0rem" }}>
                        <Grid item md={true} sm={true} xs={true}>
                          <TextField
                            id="GSTINID"
                            error={nextFormErrors.GSTINID.length > 0 ? true : false}
                            name="GSTINID"
                            //value={this.state.GSTINID}
                            label="Enter Your GSTIN ID"
                            type="text"
                            fullWidth
                            autoFocus
                            onChange={this.handleNextFormChange.bind(this)}
                            helperText={nextFormErrors.GSTINID.length > 0 ? nextFormErrors.GSTINID : null}
                            InputProps={{
                              endAdornment:nextFormErrors.GSTINID.length === 0 && this.state.GSTINID!==null ? <CheckOutlinedIcon style={{color:'green'}}/>:null
                            }}
                            required />
                        </Grid>
                      </Grid>

                      <Grid container spacing={8} alignItems="flex-end" style={{ marginTop: "0rem" }}>
                        <Grid item md={true} sm={true} xs={true}>
                          <TextField
                            id="PAN"
                            name="PAN"
                            error={nextFormErrors.PAN.length > 0 ? true : false}
                            label="Enter Your Pan Number "
                            type="text"
                             //value={this.state.PAN}
                            onChange={this.handleNextFormChange.bind(this)}
                            fullWidth
                            helperText={nextFormErrors.PAN.length > 0 ? nextFormErrors.PAN : null}
                            autoFocus 
                            InputProps={{
                              endAdornment:nextFormErrors.PAN.length === 0 && this.state.PAN!==null ? <CheckOutlinedIcon style={{color:'green'}}/>:null
                            }}
                            required />

                        </Grid>
                      </Grid>
                       
                        <Grid container spacing={8} alignItems="flex-end" style={{ marginTop: "1rem" }}>
                        <Grid  item md={true} sm={true} xs={true}>
                        <Autocomplete
                         onChange={(event,value)=>this.setState({location:value})}
                         name="location"
                        id="combo-box-demo"
                          options={this.state.AllLocations}
                          getOptionLabel={(option) => option}
                            renderInput={(params) => 
                            <TextField {...params} 
                            label="Select Your Location"
                            variant="outlined"  
                            required  
                           
                            
                            />}

                           
                        />
                          </Grid>
                        </Grid>
                       



                      
                      <Grid container spacing={8} alignItems="flex-end">
                        <Grid item md={true} sm={true} xs={true}>
                          <input
                            accept="image/*"
                            className={classes.input}
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            multiple
                            type="file"
                          />
                          </Grid>
                          <Grid item md={true} sm={true} xs={true}>
                          <label htmlFor="raised-button-file">
                            <Button variant="raised" component="span" className={classes.button}>
                              Upload
                            </Button>
                          </label>
                        </Grid>
                  </Grid>


                      <Grid container spacing={9} >
                        <Grid item md={true} sm={true} xs={true}>
                          <Button variant="contained"
                            style={{ textTransform: "none", textAlign: 'left', width: '30%', backgroundColor: '#23aac7', color: 'white' }}
                            type="submit"
                          >Next
                        </Button>
                        </Grid>

                      </Grid>


                    </form>
                  </div>
                </Paper>
                      
                  :
                  this.state.expertiseChoosing === false ?

                  <Paper square elevation={20} style={{ padding: '1rem' }}>
                  <div className={classes.margin}>
                    <Grid container spacing={0} alignItems="flex-end">
                      <Grid item md={true} sm={true} xs={true}>
                        <h3>Select your Business Type</h3>
                      </Grid>
                    </Grid>
                    <Grid container spacing={10}>
                        <Grid item md={true} sm={true} xs={true}>
                              Types:
                        </Grid>
                      </Grid>
                    </div>
                    
                    <Grid container spacing={4} alignItems="flex-end" style={{ marginTop: "0rem" }}>
                        <Grid item md={true} sm={true} xs={true}>
                         {businessTypes}
                          </Grid>
                    </Grid>

                   

                    <Grid container spacing={9} >
                        <Grid item md={true} sm={true} xs={true}>
                          <Button variant="contained"
                            style={{ textTransform: "none", textAlign: 'left', width: '30%', backgroundColor: '#23aac7', color: 'white' }}
                            type="submit"
                            onClick={this.handleTypeSubmit.bind(this)}
                          >Next
                        </Button>
                        </Grid>

                      </Grid>

              </Paper>
                            :
                            <Paper square elevation={20} style={{ padding: '2rem' }}>
                            <div className={classes.margin}>
                              <Grid container spacing={0} alignItems="flex-end">
                                <Grid item md={true} sm={true} xs={true}>
                                  <h3>Select your Expertise</h3>
                                </Grid>
                              </Grid>
                              </div>
                              <Grid container spacing={10} alignItems="flex-end" style={{ marginTop: "0rem" }}>
                                  <Grid item md={true} sm={true} xs={true}>
                                    some demo item....
                                    </Grid>
                              </Grid>
          
                              <Grid container spacing={9} >
                                  <Grid item md={true} sm={true} xs={true}>
                                    <Button variant="contained"
                                      style={{ textTransform: "none", textAlign: 'left', width: '30%', backgroundColor: '#23aac7', color: 'white' }}
                                      type="submit"
                                      onClick={this.handleExpertiseSubmit.bind(this)}
                                    >Next
                                  </Button>
                                  </Grid>
          
                                </Grid>
          
                        </Paper>
                  }

               
               


              </Col>
              <Col md={{ span: 5, offset: 1 }} xs={{ span: 12, offset: 0 }} sm={{ span: 12, offset: 0 }}>
                {/* <div className="side-img"></div> */}
                <div className="side-img"></div>
              </Col>
            </Row>
          </Container>
        </div>



      </React.Fragment>


    )
  }
}
export default (withStyles(styles)(registerPartner));