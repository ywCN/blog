import { combineReducers } from "redux";
// redux-form handles any type of form you put in Redux.
// including validaing input and submitting form in a certain way.
import { reducer as formReducer } from "redux-form";
import PostsReducer from "./reducer_posts";

const rootReducer = combineReducers({
    posts: PostsReducer,
    form: formReducer
});

export default rootReducer;
