import axios from "axios";

export const FETCH_POSTS = "fetch_posts";
export const FETCH_POST = "fetch_post";
export const CREATE_POST = "create_post";
export const DELETE_POST = "delete_post";

const ROOT_URL = "http://reduxblog.herokuapp.com/api";
const API_KEY = "?key=PAPERCLIP1234";

export function fetchPosts() {
    // console.log('using fetchPosts action creator');
    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

    return {
        type: FETCH_POSTS,
        payload: request
    };
}

// will be called in posts_new.js
// value is the object we want to send via the api
export function createPost(values, callback) {
    const request = axios
        // make the API request
        .post(`${ROOT_URL}/posts${API_KEY}`, values)
        // after the request has been resolved,
        // exectute callback(), and callback() will
        // call the callback function we pass in
        .then(() => callback());

    return {
        type: CREATE_POST,
        payload: request
    };
}

// will be called in post_show.js
// id will be use to create url for request
export function fetchPost(id) {
    const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

    return {
        type: FETCH_POST,
        payload: request
    };
}

export function deletePost(id, callback) {
    const request = axios
        .delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
        .then(() => callback()); // navigation callback when successfully resolved

    return {
        type: DELETE_POST,
        payload: id
    };
}
