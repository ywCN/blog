import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

class Hello extends React.Component {
    render() { return <div>Hello!</div> }
}

class Bye extends React.Component {
    render() { return <div>Bye!</div> }
}

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        {/* <App /> */}
        <BrowserRouter>
            {/* wrap because BrowserRouter only accepts 1 element */}
            <div>
                {/* path and component are required for Route */}
                {/* http://localhost:8080/hello will display Hello! */}
                <Route path="/hello" component={Hello} />
                {/* http://localhost:8080/hello will display Bye! */}
                <Route path="/bye" component={Bye} />
                {/* http://localhost:8080/others will display nothing */}
            </div>
        </BrowserRouter>
    </Provider>
    , document.querySelector('.container')
);
