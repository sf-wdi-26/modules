"use strict"

import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import store from './reducers/rootReducer'

// Render the App component to the page
const renderView = () => {
  ReactDOM.render(
    <App/>,
    document.getElementById("app")
  )
}

store.subscribe(renderView);

renderView()
