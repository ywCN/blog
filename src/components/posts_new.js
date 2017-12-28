import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// action creator for posting blog, 
// will be injected into this compoent by using connect
import { createPost } from "../actions";

class PostsNew extends Component {
    renderField(field) { // field is a single piece of state
        // the meta.error property is automatically added 
        // to the Field object from the validate function 
        const { meta: { touched, error } } = field; // ES6 destructuring to access property, nested
        // turn red if touched AND error
        const className = `form-group ${touched && error ? "has-danger" : ""}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control" type="text" {...field.input} />
                <div className="text-help">
                    {/* if touched, display error
                    if not touched, display empty string */}
                    {touched ? error : ""}
                </div>
            </div>
        );
    }

    // call an action creator
    onSubmit(values) {
        // createPost action creator is injected by connect
        // This structure makes sure users will see the post
        // they just create after they hit the submit button.
        // Technically they wait a very short moment for 
        // the completion of the API request.
        this.props.createPost(values, () => {
            //TODO: find out where this.props.history is from
            this.props.history.push("/");
        });
    }

    render() {
        // handleSubmit is from the connection between
        // reduxForm and PostsNew, reduxForm adds a lot of 
        // properties including handleSubmit to PostsNew component
        const { handleSubmit } = this.props; // pull out a function

        return (
            // This annoying stuff is because of reduxForm.
            // Can just memorize this code.
            // handleSubmit takes care of the reduxForm things
            // like validation, if everything is okay, it will call
            // the onSubmit function we created.
            // bind because onSubmit will use 'this'.
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                {/* props in Field will be passed into this.renderField function
                as an object in arugument. The function can access them by 
                argument.propName */}
                <Field
                    label="Title For Post"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

// only check if empty input, can also check other by adding if
// The names of error are made the same as in Field in order to
// connect names in Fields
function validate(values) {
    // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
    const errors = {};

    // Validate the inputs from 'values'
    if (!values.title) {
        errors.title = "Enter a title";
    }
    if (!values.categories) {
        errors.categories = "Enter some categories";
    }
    if (!values.content) {
        errors.content = "Enter some content please";
    }

    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid
    return errors;
}

// reduxFrom is very similar to the connect function.
// reduxFrom is also a connect helper.
// reduxFrom helper function allows redux form to 
// communicate directly from the component to the
// reducers we already set up.
// the format is the same: reduxForm()()
// We make the form name, like "PostsNewForm", unique
// because we want to isolate states of different forms.
export default reduxForm({
    validate,
    form: "PostsNewForm"
// does not need state, only need to dispatch
// { createPost } is the mapDispatchToProps shortcut
})( 
    // This is how we stack up mutiple connect helpers.
    // helpe1(helper2(mapStateToProps,mapDispatchToProps)(componentName));
    // Since the following line returns a React component (connected 
    // version of the component), so it is a valid input for reduxForm helper.
    connect(null, { createPost })(PostsNew)
);
