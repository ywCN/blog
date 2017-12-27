import _ from "lodash";
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from "../actions";

export default function(state = {}, action) {
    switch (action.type) {
        case DELETE_POST:
            return _.omit(state, action.payload);
        case FETCH_POST:
            return { ...state, [action.payload.data.id]: action.payload.data };
        // This action want to transfer [post1, post2] into {1:post1, 2: post2}
        case FETCH_POSTS:
            // console.log('using FETCH_POSTS');
            // lodash.mapKeys will return a new object 
            // with key===id in original object
            return _.mapKeys(action.payload.data, "id");
        default:
            // console.log('using default');
            return state;
    }
}