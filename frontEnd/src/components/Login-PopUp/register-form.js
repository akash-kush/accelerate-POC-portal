import React from "react";
import { connect } from "react-redux";
import {RegisterUser} from "../../REDUX/actions"
import {withStyles,Grid, TextField, Button} from '@material-ui/core';
import history from "../../history";
import {Redirect} from "react-router-dom";
const styles = theme => ({
    margin: {
        margin: theme.spacing.unit * 2
    },
    padding: {
        padding: theme.spacing.unit 
    },
    root: {
      justifyContent: 'center'
  }
});

const nameRegex=RegExp(
  
   /^(([a-zA-Z]+\s)*[a-zA-Z]+){3,}$/
);


const emailRegex = RegExp(
  /^([a-zA-Z0-9\'_]+)(\.[a-zA-Z0-9\'_]+)*@([a-zA-Z0-9]([a-zA-Z0-9]{0,61}[a-zA-Z0-9])?\.)([a-zA-Z]{2,3})$/
   // /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  const phoneNumberRegex=RegExp(
    /^[6-9]\d{9}$/
    // /^[0][1-9]\d{9}$|^[1-9]\d{9}$/
  );
  const passwordRegex=RegExp(
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/
  );
  const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
  
    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });
  
    // validate the form was filled out
    Object.values(rest).forEach(val => {
      val === null && (valid = true);
    });
  
    return valid;
  };
  class RegisterUserForm extends React.Component{
    constructor(props){
        super();
        this.state = {
          Name: null,
          email: null,
          password: null,
          phoneNumber:null,
          formErrors: {
            Name: "",
            phoneNumber:"",
            email: "",
            password: "",
          },
          redirect:false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleSubmit = e => {
        e.preventDefault();
    
        if (formValid(this.state)) {
          const User={
            name:this.state.Name,
            password:this.state.password,
            email:this.state.email,
            phone_number:this.state.phoneNumber,
            category:'N.A',
            subcategory:'N.A',
            role:"U"
          }
          console.log(User);
          this.props.RegisterUser(User);
          new Promise((resolve)=>resolve(this.props.RegisterUser(User))).then(() =>{
              this.setState({redirect:true})
              console.log('redirect value..',this.state.redirect);
           })
         
        } else {
          console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
      };  
      
      
    
    
    
    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
        switch (name) {
          case "Name":
            formErrors.Name = nameRegex.test(value)
          ? ""
          :"atleast 3 characters having alphabets and spaces only "
//              value.length < 3 ? "minimum 3 characaters required" : "";
            break;
          case "email":
            formErrors.email = emailRegex.test(value)
              ? ""
              : "invalid email address";
            break;
          case "password":
            formErrors.password = passwordRegex.test(value)
            ? ""
            : "min 6 characters, with at least a symbol, upper and lower case letters and a number ";
            // value.length < 6 ? "min 6 characters, with at least a symbol, upper and lower case letters and a number " : "";
            break;
          case "phoneNumber":
            formErrors.phoneNumber = phoneNumberRegex.test(parseInt(value))
            ? ""
            : "Enter vaid 10 digit mobile number";
            break;
          default:
            break;
        }
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
      }
  render(){
    const { classes } = this.props;
    const { formErrors } = this.state;
    return(
      <React.Fragment>
   { this.state.redirect && <Redirect to="/" /> }
   


                <div className={classes.margin} >
                     <form onSubmit={this.handleSubmit}>
                    <Grid container spacing={10} alignItems="flex-end" style={{marginTop:"0rem"}}>
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
                            helperText={formErrors.Name.length >0 ? formErrors.Name : null}
                            required />
                        </Grid>
                    </Grid>

                    <Grid container spacing={10} alignItems="flex-end" style={{marginTop:"0rem"}}>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField 
                            id="email"
                            error={formErrors.email.length > 0 ? true : false}
                            name="email" 
                            label="Enter Your Email" 
                            type="email" 
                            fullWidth 
                            autoFocus
                            onChange={this.handleChange}
                            helperText={formErrors.email.length >0 ? formErrors.email : null} 
                            required />
                        </Grid>
                    </Grid>

                    <Grid container spacing={8} alignItems="flex-end" style={{marginTop:"0rem"}}>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField 
                            id="password"
                            error={formErrors.password.length > 0 ? true : false} 
                            name="password"
                            label="Enter Password" 
                            type="password" 
                            fullWidth
                            onChange={this.handleChange}
                            helperText={formErrors.password.length >0 ? formErrors.password : null} 
                            required />
                            
                        </Grid>
                    </Grid>
                   
                    <Grid container spacing={8} alignItems="flex-end" style={{marginTop:"0rem"}}>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField 
                            id="phoneNumber"
                            error={formErrors.phoneNumber.length > 0 ? true : false} 
                            name="phoneNumber"
                            label="Your Mobile Number" 
                            type="text" 
                            fullWidth
                            onChange={this.handleChange}
                            helperText={formErrors.phoneNumber.length >0 ? formErrors.phoneNumber : null} 
                            required />
                            
                        </Grid>
                    </Grid>


                    <Grid container justify="center" container spacing={10}>
                        <Grid item>
                        <Button variant="contained" 
                        color="primary" 
                        type="submit"
                        style={{backgroundColor:'#23aac7'}}
                        >Register
                        </Button>
                        </Grid>
                        
                    </Grid>
                          
                   
                    </form>
                </div>
                </React.Fragment>          
    );
 
}

}
const mapDispacthToProps = dispatch => {
    return {
      RegisterUser: User => dispatch(RegisterUser(User)),
    };
  };
  export default connect(null,mapDispacthToProps)(withStyles(styles)(RegisterUserForm));