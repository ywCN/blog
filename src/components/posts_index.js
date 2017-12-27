import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions'; //action creator

class PostsIndex extends Component {
    // This function will be call by React immediately
    // after this component has shown up in the DOM.
    
    // It does not matter whether using WillMount or DidMount
    // because we are doing async stuff inside the lifecyle method.
    // And the nature of React is React will re-render
    // as soon as it can render something, which means when the
    // async stuff is resolved, React will re-render this component.
    componentDidMount() {
        this.props.fetchPosts(); // fetchPosts injected by connect
    }

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
