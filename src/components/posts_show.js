import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// User should be able to view and delete blog in this component
// so we need to import 2 action creators.
import { fetchPost, deletePost } from "../actions";

class PostsShow extends Component {
    // same mechamism in posts_index.js
    componentDidMount() {
        // this.props.match.params is provided by React Router
        const { id } = this.props.match.params;
        this.props.fetchPost(id);
    }

    onDeleteClick() {
        const { id } = this.props.match.params;
        // this.props.match.params is provided by React Router
        this.props.deletePost(id, () => {
            this.props.history.push("/");
        });
    }

    render() {
        const { post } = this.props;

        if (!post) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <Link to="/">Back To Index</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                >
                Delete Post
                </button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

// the first argument is always a state,
// the second argument is referred to as ownProps
// this.props === ownProps
function mapStateToProps({ posts }, ownProps) {
    return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
