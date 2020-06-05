import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import "./finalRegisterPartner.css";
//import history from "../../history";
import { RegisterPartner } from "../../REDUX/actions"
import {Navbar,Container, Row, Col,Button} from "react-bootstrap";
class FinalRegisterPage extends React.Component{
constructor(props){
    super();
    this.state={
        dataset:{
            type:[],
            Experise:[],
            INDIVIDUAL:[],
            BUSINESS:[]
        },
            type:{category:""},
            Expertise:[],
            INDIVIDUAL_VAL:null,
            BUSINESS_VAL:null,
        
        showIndividual:false,
        showBusiness:false,
        
        typeError:"",
        ExpertiseError:""

        
    }
    this.handleIndividual=this.handleIndividual.bind(this);
    this.handleBusiness=this.handleBusiness.bind(this);
    this.handleFinishRegistration=this.handleFinishRegistration.bind(this);
    this.handleOnBusinessChange=this.handleOnBusinessChange.bind(this);
    this.handleOnIndividualChange=this.handleOnIndividualChange.bind(this);
}
componentDidMount(){
    //console.log(this.props);
    // const { handle } = this.props.match.params
    // const { data } = this.props.location.state
    //console.log(this.props.match.params);
    console.log('rendering final register',this.props.location.state);
   
   
    axios.get('./db.json').then((val)=>{
        //console.log(typeof(val));
        //console.log('the type are',val.data);
        this.setState({dataset:val.data});
    }).catch(err=>console.log(err));
    
}

handleIndividual=(event)=>{
    if(this.state.showIndividual){
        this.setState({showIndividual:false});
    }
    else
    this.setState({showIndividual:true});
    }
handleBusiness=(event)=>{
    if(this.state.showBusiness){
        this.setState({showBusiness:false});
    }
    else
        this.setState({showBusiness:true});
}
handleFinishRegistration=(event)=>{
    console.log('efvejvfejyvfejfvjeyfvejvfjevj',this.state)
    if(this.state.type.category.length<1){
        this.setState({typeError:"please choose any type"});
    }
    else if (this.state.Expertise.length===0){
        this.setState({ExpertiseError:"please choose any expertise"});
    }
    else{
        //backend api call axios.post('some api endpoint').then(if promise resolve navigate to homepage)
        //page redirection   for now lets use react router to navigate to home page
        const finalRegisterData={
            ...this.props.location.state,
            category:this.state.type.category,
            subcategory:this.state.Expertise,
            role:"P",
            // INDIVIDUAL_VAL:this.state.INDIVIDUAL_VAL,
            // BUSINESS_VAL:this.state.BUSINESS_VAL
        }
        console.log('data to be sent to action',finalRegisterData);
      this.props.RegisterPartner(finalRegisterData);
    }
}
handleOnIndividualChange=(event)=>{
    
    //this.setState({INDIVIDUAL_VAL:[...this.state.INDIVIDUAL_VAL,event.target.value]})
    //let name=event.target.name;
    let obj={name:event.target.name,value:event.target.value}
    this.setState({INDIVIDUAL_VAL:obj});
}
handleOnBusinessChange =(event)=>{
    //this.setState({BUSINESS_VAL:[...this.state.BUSINESS_VAL,event.target.value]});
    //let name=event.target.name;
    let obj={name:event.target.name,value:event.target.value}
    this.setState({BUSINESS_VAL:obj});
}
render(){
    
    //let flag=1;
    const individualData=this.state.dataset.INDIVIDUAL;
    const businessData=this.state.dataset.BUSINESS;
    const myTypedata=this.state.dataset.type;
    const myExpertiseData=this.state.dataset.Experise;
    let tempTypeData= myTypedata.map(val=>{
        return (
         <span className="myspans" id={Math.random()} key={Math.random()} onClick={(e)=>{
            if(this.state.type.category!==val){
                this.setState({type: {category:val}});
            }

              else   console.log('clicked again');
                //this.setState({type: [...this.state.type,val]});
             
           
             
         }}> 
              {val}
             
         </span>
       
        )
    });

    let temExpertiseData=myExpertiseData.map(val=>{
        return (
            <span className="myspans" id={Math.random()} key={Math.random()} onClick={(e)=>{
                if(!this.state.Expertise.find(t=>{
                    return t===val;
                })){
                   this.setState({Expertise:[...this.state.Expertise,val]});
                }
                
            }}> 
                 {val}
            </span>
    )
        });
       let individualFinalData=[]
        if(this.state.showIndividual){
            individualFinalData=individualData.map(values=>{
                return (
                    <Row style={{marginTop:"2px"}}>
                        <Col>{values} </Col>
                        
                        <Col><input type ="number" onChange={this.handleOnIndividualChange}  name={values}/></Col>
                    </Row>
                );
            })
        }
        else{
            individualFinalData=[];
        }
    let businessFinalData=[];
        if(this.state.showBusiness){
            businessFinalData=businessData.map(values=>{
                return (
                    <Row style={{marginTop:"2px"}}>
                        <Col>{values} </Col>
                        
                        <Col><input type={"number"} onChange={this.handleOnBusinessChange} name={values}/></Col>
                    </Row>
                )
            })
        }
        else{
            businessFinalData=[];
        }
    //console.log('inside render logging state ',this.state);
    return (
        //Nav Bar 
        <React.Fragment>
        <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home">{`Welcome ${this.props.location.state.name}`}</Navbar.Brand>

</Navbar>


<Container fluid>
    <Row style={{marginTop:"30px"}}>
        <h3>Choose Your Type:</h3>
    </Row>
    <Row>
        {tempTypeData}
        
    </Row>
    <Row>{this.state.typeError.length>1 ? this.state.typeError:""}</Row>
    <Row style={{marginTop:"30px"}}>
        <h3>Choose Your Expertise:</h3>
    </Row>
    <Row>
        {temExpertiseData}
     
    </Row>  
    <Row> {this.state.ExpertiseError.length>1 ? this.state.ExpertiseError:""}</Row>
    <Row style={{marginTop:"30px"}}>
        <Col style={{border:"2px solid black"}} xs={12} md={6}>
        <input type={"checkbox"} onChange={(event)=>{
            this.handleIndividual();
            //individualFinalData
        }}/> INDIVIDUAL
        
        {individualFinalData}
        
        </Col>
        <Col style={{border:"2px solid black"}}  xs={12} md={6}>
        <input type={"checkbox"} onChange={(event)=>{
            this.handleBusiness();
        }}/> BUSINESS

        {businessFinalData}

        </Col>
    </Row>
</Container>
<Container fluid>
    <Row style={{marginTop:"20px"}}>
        <Col>
            <Button onClick={this.handleFinishRegistration}>Finish Registration</Button>
        </Col>
    </Row>
</Container>
</React.Fragment>
    )


}

}
// const mapStateToProps = state => {
//     return { user: state.user.RESPONSE };
//   };
  const mapDispacthToProps = dispatch => {
    return {
        RegisterPartner: partner => dispatch(RegisterPartner(partner)),
    };
  };
export default connect(null,mapDispacthToProps)(FinalRegisterPage);