import React from 'react'
import store from '../reducers/rootReducer'
import FoodList from './FoodList'
import LikeCounter from './LikeCounter'

const App = React.createClass({
  render() {
    return(
      <div>
        <FoodList foods={store.getState().foods}/>
        <LikeCounter likeCount={store.getState().likes}/>
      </div>
    )
  }
})

export default App
