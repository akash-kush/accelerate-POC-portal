import React,{Component} from 'react';
import './App.css';
import Routes from "./Route";
import {Provider} from "react-redux";
import store from "./REDUX/store";
import log from "./components/logger.service"
// import NavBar from './components/headerComponents/nav';
// import registerPartner from './components/register-partner/register-partner';
// import {
//   BrowserRouter,
//   Switch,
//   Route
// } from "react-router-dom";
// import partnerProfile from './components/partner-profile/profile';
// import history from "./history";
class App extends Component{
  componentWillMount(){
    fetch('https://api.ipify.org?format=jsonp?callback=?',{
      method:'GET',
      headers:{},
    })
    .then(res=>{
      return res.text()
    }).then(ip=>{
      var str="Request from IP: "+ip;
      log(str)
    })
  }
render(){
  return (
    // <BrowserRouter history={history}>
    <Provider store={store}>
     <div className="App">
     {/* <Route exact path="/" component={NavBar} />
     <Switch>
     <Route exact path="/registerPartner" component={registerPartner} />
     <Route exact path="/:partnerProfile" component={partnerProfile} />
     </Switch>
       </div>
    </BrowserRouter> */}
    <Routes/>  
    </div>
    </Provider>
  );
}
}
export default App 
