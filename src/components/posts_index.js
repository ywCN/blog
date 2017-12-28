import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPosts } from "../actions"; //action creator

class PostsIndex extends Component {
    // This function will be call by React immediately
    // after this component has shown up in the DOM.
    
    // It does not matter whether using WillMount or DidMount
    // because we are doing async stuff inside the lifecyle method.
    // And the nature of React is React will re-render
    // as soon as it can render something, which means when the
    // async stuff is resolved, React will re-render this component.
    componentDidMount() {
        this.props.fetchPosts(); // fetchPosts() injected by connect
    }

    renderPosts() {
        return _.map(this.props.posts, post => {
            return (
                <li className="list-group-item" key={post.id}>
                    {/* Link is like the <a> in HTML */}
                    <Link to={`/posts/${post.id}`}>
                        {post.title}
                    </Link>
                </li>
            );
        });
    }

    render() {
        return (
            <div>
                <div className="text-xs-right">
                    {/* 'to="/.../..."' will make navigation happen */}
                    <Link className="btn btn-primary" to="/posts/new">
                        Add a Post
                    </Link>
                </div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { posts: state.posts };
}

// this is a legit shortcut for wire up action creator with component
// this is identical to using mapDispatchToProps function
// we still have this.props.fetchPost in this component
export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
