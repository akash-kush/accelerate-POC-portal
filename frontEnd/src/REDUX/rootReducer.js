import { combineReducers } from "redux";
import getUserReducer from "./getUserReducer";
const rootReducer = combineReducers({
  user: getUserReducer
});
export default rootReducer;
