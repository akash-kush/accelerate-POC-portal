import axios from "axios";
import log from '../components/logger.service'

const LoginUser = user => {
    return dispatch => {
      console.log("fetching.....",user);
      axios
        .post("http://localhost:8080/login",{email:user.email,password:user.password})
        .then(res => {
          //console.log("the response data is line 1 ",res);
          if(res.data.status ===500){
            log('user entered invalid Credentials')
            dispatch({type:"LOGIN",payload:{id:'',messege:'Invalid Credentials',role:''}});
          }
          //console.log("the response data is ",res.data.data[0]._id);
          else{
            log('user logged in')
            dispatch({ type: "LOGIN", payload: {id:res.data.data[0]._id,messege:res.data.message,role:res.data.data[0].role}});
          }
        })
        .catch(err => {
          log('error while logging')
          console.log(err);
        });
    //  
     }
};

const RegisterUser=User=>{
  return dispatch=>{
    console.log('inside action for registering user',User);
    const formdata=new FormData();
    formdata.append('name',User.name);
    formdata.append('password',User.password);
    formdata.append('email',User.email);
    formdata.append('phone_number',User.phone_number);
    formdata.append('files',User.files);
    formdata.append('role',User.role);
    formdata.append('category',User.category);
    formdata.append('subcategory',User.subcategory);
    axios.post('http://localhost:8080/users',formdata).then(res=>console.log(res)).catch(err=>console.log(err));
  }
}

const RegisterPartner= partner=>{
  return dispatch =>{
    console.log('inside action for partner ',partner);
    console.log('inside register partner...action handler...');
   const formdata=new FormData();
   formdata.append('name',partner.firstName + partner.lastName);
   formdata.append('password',partner.Password);
   formdata.append('email',partner.email);
   formdata.append('phone_number',partner.PhoneNumber);
   formdata.append('files',partner.image);
   formdata.append('role',partner.role);
   formdata.append('category',partner.category);
    formdata.append('subcategory',partner.subcategory);
    axios.post('http://localhost:8080/users',formdata).then(res=>console.log(res)).catch(err=>console.log(err));
  }
}

const getAllCards = ()=>{
  console.log('inside getAllCards....');
  return  dispatch =>{
    axios.get("http://localhost:8080/users").then(res=>{
      console.log(res)
      dispatch({ type: "GET_ALL_CARDS",payload:res.data.response});
    }).catch(err=>console.log(err));
  }
}

const getAllCardsOnRoleBasis=(pref_value)=>{
    return dispatch =>{
      console.log('pref_value is ',pref_value);
      dispatch({type:"GET_ROLE_BASED_CARDS",payload:pref_value});
    }
}
export {LoginUser,RegisterPartner,RegisterUser,getAllCards,getAllCardsOnRoleBasis}