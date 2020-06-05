const initialState={
    Name:{},
    AllCARDS:[],
    UsersCards:[],
    ProvidersCards:[],
    user:{id:"",messege:"",role:""}
}
const getUserReducer=(state=initialState,action)=>{
    switch(action.type){
      case "LOGIN":
         console.log('inside reducer.....',action.payload)
         const d={...state,user:action.payload}
         console.log('state is setting to ',d);
        return { ...state, user:action.payload};


    case "GET_ALL_CARDS":
        return {...state,AllCARDS:action.payload,UsersCards:action.payload,ProvidersCards:action.payload}

    case "GET_ROLE_BASED_CARDS":
            if(state.AllCARDS.length>0){
                console.log('greater thn 0',state.AllCARDS);
                switch (action.payload){
                    case "U":
                        let newUsersCards=state.UsersCards.filter(function(item){
                            return item.role==='U'
                        })
                        
                    return {...state,AllCARDS:newUsersCards}
                
                    case "P":
                        let newPartnersCards
                        newPartnersCards=state.ProvidersCards.filter(function(item){
                            return item.role==='P'
                        })
                        
                    return {...state,AllCARDS:newPartnersCards}
                }
            }
    default:
        return state  
    }
}
export default getUserReducer;