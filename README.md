# This is a blog website developed by using React, Redux, and some other node packages.
- User can view, post, and delete blogs.

# [Useful Videos](https://www.udemy.com/react-redux/learn/v4/t/lecture/5691826?start=0)
- [its repo](https://github.com/StephenGrider/RallyCodingWeekly)
- About Firebase, Thunk, Form, Reselect, Animation, Modals
- [Deploy](https://www.udemy.com/react-redux/learn/v4/t/lecture/5691864?start=0)

### most styles are from bootstrap
### Most notes are inherited from previous [notes](https://github.com/ywCN/weather-site/blob/master/README.md).

## Common Mistakes
1. forget exporting
    - This will make imported things `undefined`
    - this mistake produces warning in console.
2. forget {} when importing
    - This will make imported things `undefined`
    - normally happen when importing name of action type in reducer
      - reducers do nothing about actions
    - can use console.log(TYPE) to find out
    - This will NOT produce warning.
3. Uncaught (in promis)
    - check Promise object
4. 


## ES6 Trick
- use destructuring instead of props
  - Before: `const VideoList = (props) => {`
  - After: `const VideoList = ({video}) => {`
- merge key and value when they are the same, (syntax sugar for compression)
  - Before: `this.setState({ videos: videos});`
  - After: `this.setState({ videos });`
- Whenever need to reference a javascript variable in JSX, {} is required.
  - for example: `<VideoList videos={this.state.videos}/>`
- key interpolation
  - example: `return { ...state, [post.id]: post };`
    - [post.id] is not an Array
    - `[post.id]: post` means whatever the `post.id` is, make it a new key on the object and set its value to `post`
    - the ES5 version of this is:
      ```
      const newState = { ...state };
      newState[post.id] = post;
      return newState;
      ```

## React Event Handler
- onChange, onCLick, onOOXX
  - these handlers all have an `event` object from JavaScript

## Components
- functional component: is a function produce JSX
- class component: can aware itself when it is renderred
  - In class component, state is init in constructor function.
    - And only in this situation can state be manipulated by using `state={...}`
- Passing Props
  - props is passed to child component as object
    - the object will be accessible by child component
    - passing object is like creating new entries in the props object of child component which is passed to
    - as a result, we can use destructuring to retrive the informaion in the object
  - callback functions can also be passed as props
    - they will be called by child component or be passed to deeper child component
    - finally a child component will call this callback function
    - normally this passing will not exceed 2 levels
    
## State
- Each class based component has its own state object.
- Whenever a component's state changes, the component immediately re-renders.
  - And also forces all its children to re-render as well.
- Before we use the state of a component, we need to initialize the state object.
- Each instance of class component has its own copy of state.
  - To init state: 
    - `super(props);`
    - `this.state = {...};`
- if we do not need a state, we do the plain functional component.
  - if you don't need to really mess with state or the component lifecycle, and your component is more display-related. It's nicer and more concise to read when you can just export a functional component, rather than writing out a full class component.
- Without Redux, `this.setState` can only change the state in `this` component.
  - this.state is called component level state
  - In non-Redux context, state are referred as component level
  - In Redux context, state are referred as application level

## In React, when user types, the state changes FIRST, THEN the view will change according to current state. 
- During this process, no instance of class (objects) are created, so the conctructor will be executed upon creation of object.

## In React, when a callback is passed into JSX and the callback uses `this`. The context needs to be bound.
1. use arrow function will work
    - `{event => this.onOOXX(event)}`
2. bind in constructor
    - `this.onOOXX = this.onOOXX.bind(this);`

## Downward Dataflow of React: Only the most parent component is responsible for fetching data. Like the LCA.

## Reducer
- Reducer is a function that returns a piece of the `application state`.
- Since an application can have different piece of states in the `application state`, we can have different reducers.
  - `application state` is a plain JavaScript Object.
  - normally a reducer can **produce** part of an objects
    - for example, `{book: {title: a}, activeBook: {title: a}}`
    - `Book Reducer` can **produce** `book key`'s value
      - The value of reducer is assigned to the key.
    - `ActiveBook Reducer` can **produce** the `activeBook key`'s value.
      - The value of reducer is assigned to the key.
- To Create A Reducer In An Application
  1. Create the reducer
  2. Wire the reducer into the application
- All reducers have **2** arguments.
  1. The current state
  2. The action
- Reducer does not mutate state. It creates new state.
  - no method like push() or state.oxx= ooxx will be used in reducer

## `combineReducers` function
- `import { combineReducers } from 'redux';`
- `const rootReducer = combineReducers({books: BooksReducer});`
  - accepts an object
  - This reducer is going to add a key to our global application state called books where the key is `books`, and the value is whatever gets returned from `BooksReducer`.
- A mapping(object) of state and reducer.
  - key is the name of piece of the state
  - value is the reducer itself
- When we pass the object to combineReducers, we are essentially telling Redux how to create `application state`.

## `mapStateToProps` function
- `mapStateToProps(state)`
- **The glue between React and Redux.**
- The purpose of this function is to take our application state as an argument and whatever gets returned from here will show up as props inside the `container`.
- returns an object and whatever object is returned will be available to this component as props. 

## `connect` function
- **`connect` is used to add additional properties to the connected component**
- `connect` takes a function and make a component become a connected version which is a `container`
  - `connect(mapStateToProps)(BookList)`
    - firstly, `connect` take `mapStateToProps` as argument and returns a function
    - then, the `returned function` will take `BookList` as argument and returns a `container`
- 3 common uses of `connect` 
  - some `components`/`containers` need both `action creator` and `state`
    - connect(`mapStateToProps`, `mapDispatchToProps`)(`ComponentName`)
  - some `components`/`containers` need `action creator` but do not need `state`
    - connect(`null`, `mapDispatchToProps`)(`ComponentName`)
  - some `components`/`containers` need `state` but do not need `action creator`
    - connect(`mapStateToProps`)(`ComponentName`)
- if `mapStateToProps` or `mapDispatchToProps` is very simple, the connect function can directly accept an object instead of these functions
  - this is identical to creating `mapStateToProps` or `mapDispatchToProps` and pass to `connect`
  - export default connect(null, { fetchPosts })(PostsIndex); // { fetchPosts: fetchPosts }
  - in this shortcut, `connect` is still do `mapStateToProps` or `mapDispatchToProps` for us behind the scene

## Container
- Whenever we forge a connection between a component and redux, this connection turns that component into a container. aka `smart component`.
- a `container` is a React component that has a direct connection to the state managed by Redux.
- a `container` is aware of the state that is contained by redux.
- a `container` can inject state of `component` into application state with the help of `React-Redux` library
  - `React-Redux` is a bridge between `React` and `Redux`
- a `component` can be defined as a `container` instead of a `component`
  - a `component` can also be called as `view`
  - this `component` is promoted as a `container`
- Only the most parent component that uses a particular piece of state needs to be connected to redux. like LCA.
- **Whenever state changes, the container/component will automatically re-rendered.**
- **Whenever state changes, the new state will be automatically assigned to props of the container/component.**
- container **will** export a connected version of component

## `Action`
- Actions usually have 2 values.
  - `type`: describes the purpose of the action
  - `payload`: describe or clarifies the conditions of the action that is being triggered.

## `Action Creator`
- action creator creates action
- Whenever we want to save data or make API requests of any type inside of a Redux application. We always want to think about action creators.

## Flows of Stuffs in Redux Application
  1. user triggers an event, for example, click a button
  2. event listener will call an `action creator`
  3. `action creator` is a function that returns an object called `action`
      - the object has a type that describes the type of `action` that was just triggered
      - the object can also have some data that can further describes the `action`
      - `action creator` function must wire up to redux to make sure it will send `action` to `reducers`
  4. this object is sent to all `reducers` automatically
      - **before reaching reducers, actions normally will be processed by middlewares**
  5. `reducers` will choose the corresponding `reducer` depends on the type in the object and return corresponding `state`
      - switch statement will determine the type of action
      - `reducders` do not have to respond an action, which is done by using the `default` in switch statement and returns the original `state`
  6. this `state` will be assigned to the corresponding piece of the **newly assembled application state**
  7. since the state is changed, the corresponding components/views will be re-rendered automatically
  8. finished re-rendering, the application will wait for user to trigger another event
  9. another event is triggerred, go back to step1
- Summary: 
  - An action creator is just a function that returns an action.
  - An action is just an object that flows through all of our different reducers.
  - Reducers can then use that action to produce a different value(state) for tis particular piece of state.
- ![alt text](https://github.com/ywCN/blog/blob/master/pics_readme/flow.png "Flow Diagram")

## `Middleware` in `Redux`
- `Middlewares` are functions that take an action.
- Depending on the action type, the action's payload or any number of factors, the `middleware` can choose to let the action pass through, can manipulate the action, can stop the action, ect... **before** actions reach reducers.
- Like gatekeepers of reducers
- `Middleware` allows use to do many things by intercepting actions.
- We want to make all the actions we create flow through `middleware` steps and the `middleware` can modify actions.
- We can have many different steps of `middlewares` in our application, so we can have 0 to many `middlewares`.
  - These `middlewares` are just functions where actions pass through them before hitting reducers.
- Summary:
  - `Middleware` has the ability to block, modify, or let pass through actions **after** actions are created **before** hit reducers.

## [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value.
- **A `Promise` is a proxy for a value not necessarily known when the `promise` is created.** 
  - It allows you to associate handlers with an asynchronous action's eventual success value or failure reason. 
  - This lets asynchronous methods return values like synchronous methods: instead of immediately returning the final value, the asynchronous method returns a `promise` to supply the value at some point in the future.
- A Promise is in one of these states:
    1. pending: initial state, neither fulfilled nor rejected.
    2. fulfilled: meaning that the operation completed successfully.
    3. rejected: meaning that the operation failed.
  - A pending promise can either be fulfilled with a value, or rejected with a reason (error). 
    - When either of these options happens, the associated handlers queued up by a promise's then method are called. (If the promise has already been fulfilled or rejected when a corresponding handler is attached, the handler will be called, so there is no race condition between an asynchronous operation completing and its handlers being attached.)
  - As the `Promise.prototype.then()` and `Promise.prototype.catch()` methods return promises, they can be chained.

## `Redux Promise Middleware`
- `Redux Promise` is a middleware. Middleware has the ability to stop or manipulate actions.
- Redux will check the payload property. 
  - If it is a promise, it will stop the action.
  - And then once the request finishes, it dispatches a new action of the same type but with a payload of the **resolved** request.
- `Redux Promise Middleware` helps us to pre-process async action, so we do not need to work with Promise. Instead, we just work with data returned by async request.

## Container Setup Process
1. In a **finished** component.
2. At top, import 3 more things
    - `import { connect } from 'react-redux';`
    - `import { bindActionCreators } from 'redux';`
    - `import { actionCreator } from '../actions/index';`
      - `actionCreator` is the exported function name in index.js
3. create `mapDispatchToProps` and/or `mapStateToProps` function
    ```
    - function mapDispatchToProps(dispatch) {
    -     return bindActionCreators({ actionCreator }, dispatch);
    - }
    ```
      - `actionCreator` is imported at top of this container/component file. **Step 2.**
4. At bottom of this file
    - `export default connect(null, mapDispatchToProps)(containerName);`
      - `containerName` is the class name
      - null is to make `mapDispatchToProps` the **second** argument 
        - because whenever we are passing in a function that is supposed to map or dispatch the props of our container, it always goes in the **second** argument.
        - by passing `null` as the first argument, we tells Redux that we do not need Redux to maintain the state of this container, we do not need any state in this container
      - if we also need state, we need to also create `mapStateToProps` function, and pass it as the first argument in connect()
5. Remove `export default` before the class
- Note: This setup is always repeated and almost always identicial to this process.
- Note: Delete original `export default` before the component/container class.

## import
- sometimes need to use {}, sometimes not
  - TODO: find out when should use {}, when should not

## Axios has a sole purpose which is making AJAX request.

## redux promise vs redux thunk
- As a general guide, you'll want to use Redux Thunk whenever you expect to have to make multiple requests, or have some logic to make a request and then do some computation on the response that comes back


## [The Built-in React.Component](https://reactjs.org/docs/react-component.html)
- Remeber, the methods we use inside our own component which are not created by us are inherited from Component. Just think about the `extends` keyword.

## [The Component Lifecycle](https://reactjs.org/docs/react-component.html#the-component-lifecycle)
- Each component has several “lifecycle methods” that you can override to run code at particular times in the process. 
  - Methods prefixed with **will** are called right **before** something happens.
  - Methods prefixed with **did** are called right **after** something happens.
- Mounting
  - These methods are called when an instance of a component is being created and inserted into the DOM:
  - `constructor()`
  - `componentWillMount()`
  - `render()`
  - `componentDidMount()`
- Updating
  - An update can be caused by changes to props or state. These methods are called when a component is being re-rendered:
  - `componentWillReceiveProps()`
  - `shouldComponentUpdate()`
  - `componentWillUpdate()`
  - `render()`
  - `componentDidUpdate()`
- Unmounting
  - This method is called when a component is being removed from the DOM:
  - `componentWillUnmount()`
- Error Handling
  - This method is called when there is an error during rendering, in a lifecycle method, or in the constructor of any child component.
  - `componentDidCatch()`

## reduxForm
- reduxForm is **ONLY** responsible for handle state and validation of forms.
- We need to take care of submission ourself.


## this.props.history
- This is an Array used to save visiting history in browser.

## `Redux` and `Redux-Thunk`
- Vanilla Redux expect use to return an action, which is a plain JavaScript object.
- `Redux-Thunk` enables `Redux` to return one more type which is a plain JavaScript funcion.
  ```
  const request = axios.get('https://....'); // async
  return (dispatch) => {
    request.then(({data}) => {
      dispatch({ type: 'FETCH_INFO', payload: data });
    })
  };
  ```
- ![alt text](https://github.com/ywCN/blog/blob/master/pics_readme/pic-redux.png "Dispatch")
- ![alt text](https://github.com/ywCN/blog/blob/master/pics_readme/dispatch-pic.png "Dispatch2")

