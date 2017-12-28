import { combineReducers } from "redux";
// redux-form handles any type of form you put in Redux.
// including validaing input and submitting form in a certain way.
// https://redux-form.com/7.2.0/examples/
// The 'reducer' is already made by the library.
// But we need to assign it an alias to make it specific.
import { reducer as formReducer } from "redux-form";
import PostsReducer from "./reducer_posts";

const rootReducer = combineReducers({
    posts: PostsReducer,
    form: formReducer
});

export default rootReducer;
