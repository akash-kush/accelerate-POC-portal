import React from 'react';
import {Row,Col} from "react-bootstrap";
import {Container} from "react-bootstrap";
import { MDBCol } from "mdbreact";
import Button from "@material-ui/core/Button"

import {connect} from "react-redux";
import ImgMediaCard from "./cards/cards.js";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Category from "./Moadals/category";
import Role from "./Moadals/Role";
import {getAllCards} from "../../REDUX/actions";
import "./homepage.css";

class Homepage extends React.Component{
constructor(props){
  super()
  this.state={
    cards:[],
    search:''
  }
}
  componentDidMount(){
    this.props.getAllCards();
    //console.log('this.props.AllCARDS..',this.props.AllCARDS);
    
  }
  HandleOnChange=(event)=>{
    console.log('search value is...',event.target.value);
      this.setState({search:event.target.value.substr(0,10)});
  }
  
  renderCards=(values)=>{
      return values.map(elements=>{
         return (
         <Col md={4} xs={12} style={{marginTop:'1rem'}}>
         <ImgMediaCard key={Math.random()}
         id={elements.id} 
         name={elements.name} 
         photo={elements.photo}
         category={elements.category}
         subcategory={elements.subcategory}
         verified={elements.verified}
         role={elements.role}
         />
         </Col>
         )
      })
  }
  handleSearchStyle=()=>{
    makeStyles((theme) => ({
      root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
        },
      },
    }));
  }
  handleSpinner=()=>{
    makeStyles((theme) => ({
      root: {
        display: 'flex',
        '& > * + *': {
          marginLeft: theme.spacing(2),
        },
      },
    }));
  }
  render() {
    
    console.log(this.props.AllCARDS);
    let AllCards=this.props.AllCARDS.filter(value=>{
      return value.name.toLowerCase().indexOf(this.state.search.toLowerCase())!== -1
    });
    let temp=[];
    let t;
    
  const myarr=AllCards.map((value,index)=>{
    
    if(index%3===0 && index!==0){
     t= this.renderCards(temp);
     temp=[];
     temp.push(value);
     if(index===AllCards.length-1 && temp){
      t= this.renderCards(temp);
      return (
        <Row style={{marginTop:'2rem'}} key={Math.random()}>
          {t}
        </Row>
      )
    }
     return (
        <Row style={{marginTop:'2rem'}}>
          {t}
        </Row>
  )
    }
    else {
      temp.push(value);
      if(index===AllCards.length-1){
        t= this.renderCards(temp);
        return (
          <Row style={{marginTop:'2rem'}}>
            {t}
          </Row>
        )
      }
    }
    
  })
if(this.props.AllCARDS.length<1){
  return (
    <div className={this.handleSpinner.root}>
      <CircularProgress color="secondary"  size="40" thickness="4"/>
    </div>
  )
}
else{
  return (
    
    <React.Fragment>
       <div className={this.handleSpinner.root}>
      <CircularProgress color="secondary"  size="40" thickness="4"/>
    </div>

    {/* <h1>this is the landing page</h1> */}
    
    <Container fluid>
      <Row>
        <Col md={6}>
          <h2>Filters</h2>
            <Category/>
            <Role/>
            </Col>
          <Col md={6}>
            {/* <input type="text"
            value={this.state.search}
            onChange={this.HandleOnChange.bind(this)}
            /> */}

            {/* <MDBCol md="6">
      <input className="form-control" type="text" placeholder="Search" aria-label="Search" />
    </MDBCol> */}

            <form className={this.handleSearchStyle.root} noValidate autoComplete="off">
            <TextField 
            
            id="outlined-basic" 
            label="Name" 
            variant="outlined" 
            onChange={this.HandleOnChange.bind(this)}
            />
            </form>
          </Col>

        
      </Row>
          
     </Container>
     <Container fluid>
     {myarr}
     </Container> 
     
     </React.Fragment>
   
   
  );
}
    
  };
};
const mapStateToProps = state => {
  return { AllCARDS: state.user.AllCARDS };
};
const mapDispacthToProps = dispatch => {
  return {
    getAllCards:()=> dispatch(getAllCards()),
  };
};
export default connect(mapStateToProps,mapDispacthToProps)(Homepage)