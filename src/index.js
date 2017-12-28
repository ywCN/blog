import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";

import reducers from "./reducers";
import PostsIndex from "./components/posts_index";
import PostsNew from "./components/posts_new";
import PostsShow from "./components/posts_show";

// Do not need App component when using Router because 
// we do not need a central single component.

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <Switch>
                {/* Switch takes a collection of Routes, 
                and it will only render the FIRST Route
                that matches the url
                So, most specific Url/Router should be on */}
                top of all Routes
                    <Route path="/posts/new" component={PostsNew} />
                    <Route path="/posts/:id" component={PostsShow} />
                    <Route path="/" component={PostsIndex} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,
    document.querySelector(".container")
);




// Following is an example of how Router works
// wrap with div because BrowserRouter only accepts 1 element
// path and component are REQUIRED for Route

// http://localhost:8080/hi will display Hello!
// http://localhost:8080/later will display Bye!
// http://localhost:8080/ooxx will display nothing

/*
class Hello extends React.Component {
    render() { return <div>Hello!</div> }
}

class Bye extends React.Component {
    render() { return <div>Bye!</div> }
}

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <Route path="/hi" component={Hello} />
                <Route path="/later" component={Bye} />
            </div>
        </BrowserRouter>
    </Provider>
    , document.querySelector('.container')
);
*/