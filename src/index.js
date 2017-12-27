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
            <div>
                {/* path and component are required for Route */}
                <Route path="/hello" component={Hello} />
                <Route path="/bye" component={Bye} />
            </div>
        </BrowserRouter>
    </Provider>
    , document.querySelector('.container')
);
