import { combineReducers } from "redux";
import commentsReducer from "./commentsReducer";
import newsReducer from "./newsReducer";

export default combineReducers({
  stories: newsReducer,
  comments: commentsReducer,
});
