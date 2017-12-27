import _ from 'lodash';
import { FETCH_POSTS } from '../actions';

export default function(state = null, action) {
    switch (action.type) {
        // This action want to transfer [post1, post2]
        // into {1:post1, 2: post2}
        case FETCH_POSTS:
            // console.log('using FETCH_POSTS');
            // lodash.mapKeys will return a new object 
            // with key===id in original object
            return _.mapKeys(action.payload.date, 'id');
        default:
            // console.log('using default');
            return state;
    }
}
