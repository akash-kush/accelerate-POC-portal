import React from 'react';
import {Tabs,Tab, Paper} from "@material-ui/core";
import {Container, Col,Row} from "react-bootstrap";
import "./mdb-login.css";
import LoginForm from "./login-form";
import RegisterUserForm from "./register-form";
//import {withStyles } from '@material-ui/core';

class LoginTab extends React.Component {
    constructor(props){
        super();
        this.state={
              value:0 
        }
    }
 
    handleTabsChange=(event,newValue)=>{
      this.setState({value:newValue});
    }
    render() 
    
    {
      return (
            <Container fluid>
              <Row>
                <Col className="img-col" md={5} >
               {/* <img src={'/images/Login.jpeg'} alt="images"></img> */}
                </Col>

                <Col className="forms-col" md={7} xs={12} style={{width:'550px'}} >
                {/* <Paper square elevation={0} style={{marginTop:'2px'}}> */}
                    <Tabs
                    value={this.state.value}
                    indicatorColor="primary"
                    variant="fullWidth"
                    textColor="primary"
                  onChange={this.handleTabsChange.bind(this)}
                  aria-label="disabled tabs example"
                  >
                <Tab label="login" style={{fontFamily:'Roboto'}}/>
                <Tab label="Register" style={{fontFamily:'Roboto'}} />
                </Tabs>
                {/* </Paper> */}
                {this.state.value === 0 ? 
                <Paper square elevation={0} style={{marginTop:'0rem'}}><LoginForm close={this.props.close}/></Paper> : 
              <Paper square elevation ={0}  style={{marginTop:'0rem'}}><RegisterUserForm close={this.props.close}/></Paper>
                }
               
                </Col>
                
              </Row>
 
            </Container>
        );
    }
}
export default LoginTab;