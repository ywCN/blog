import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions'; //action creator

class PostsIndex extends Component {
    render() {
        return (
            <div>
                Posts Index
            </div>
        );
    }
}

// this is a legit shortcut for wire up action creator with component
// this is identical to using mapDispatchToProps function
// we still have this.props.fetchPost in this component
export default connect(null, { fetchPosts })(PostsIndex); // { fetchPosts: fetchPosts }
