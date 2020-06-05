import React from "react";
import { connect } from "react-redux";
import { LoginUser } from "../../REDUX/actions"
import {withStyles,Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import {Redirect} from 'react-router'

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
const emailRegex = RegExp(
  /^([a-zA-Z0-9\'_]+)(\.[a-zA-Z0-9\'_]+)*@([a-zA-Z0-9]([a-zA-Z0-9]{0,61}[a-zA-Z0-9])?\.)([a-zA-Z]{2,3})$/
  // /^([a-zA-Z0-9\'_]+)(\.[a-zA-Z0-9\'_]+)*@([a-zA-Z0-9]([a-zA-Z0-9]{0,61}[a-zA-Z0-9])?\.)*([a-zA-Z]{2,3})$/
   // /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
  
    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });
  
    // validate the form was filled out
    Object.values(rest).forEach(val => {
      val === null && (valid = false);
    });
  
    return valid;
  };

class LoginForm extends React.Component{
    constructor(props){
        super();
        this.state={
            email:"",
            password:"",
            formErrors:{
                email:"",
                password:""
              }
        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
}
handleOnChange=(e)=>{
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
      switch(name){
        case "email":
          formErrors.email = emailRegex.test(value)
            ? ""
            : "invalid email address";
          break;
        case "password":
          formErrors.password =
            value.length < 6 ? "minimum 6 characaters required" : "";
          break;
          default:
            break;

      }
      this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  }


  handleOnSubmit=(event)=>{
    event.preventDefault();
    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
      const user={
        email: this.state.email,
        password: this.state.password
      }
      //redux action handlercon
     
      this.props.LoginUser(user);
      
     
    }
}
render(){
    const { classes } = this.props;
    const { formErrors } = this.state;
    if(this.props.user.messege==="success !"){
      this.props.close();
      return (
        <Redirect to ='/'></Redirect>
      )
    }
    return(
                <div className={classes.margin}>
                     <form onSubmit={this.handleOnSubmit}>
                    <Grid container spacing={10} alignItems="flex-end" style={{marginTop:"1rem"}}>
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField 
                            id="email"
                            name="email"
                            error={formErrors.email.length > 0 ? true : false} 
                            label="Enter Email" 
                            type="email" 
                            fullWidth
                            helperText={formErrors.email.length >0 ? formErrors.email : null} 
                            autoFocus
                            onChange={this.handleOnChange} 
                            required />
                            
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end" style={{marginTop:"1rem"}}>
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
                            helperText={formErrors.password.length >0 ? formErrors.password : null}
                            onChange={this.handleOnChange} 
                            required />
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" justify="space-between" style={{marginTop:"1rem"}}>
                        <Grid item>
                            <FormControlLabel control={
                                <Checkbox
                                    color="primary"
                                />
                            } label="Remember me" />
                        </Grid>
                        <Grid item>
                            <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
                        </Grid>
                    </Grid>
                    <Grid container justify="center" style={{ marginTop: '5rem',marginBottom:'2rem'}}>
                        <Button variant="contained" 
                        color="primary" 
                        style={{ textTransform: "none", width:"40%",backgroundColor:'#23aac7' }}
                        type="submit"
                        >Login
                        </Button>
                    </Grid>
                          
                   
                    </form>
                </div>
               
          
 
       
       
    )
   
}

}

const mapStateToProps = state => {
    return { user: state.user.user };
  };
const mapDispacthToProps = dispatch => {
    return {
      LoginUser:  user=> dispatch(LoginUser(user)),
    };
  };
export default connect(mapStateToProps,mapDispacthToProps)(withStyles(styles)(LoginForm));