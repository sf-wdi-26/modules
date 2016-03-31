import React from 'react'
import store from '../reducers/rootReducer'

// Food list React component
const FoodList = React.createClass({
  // set initial state
  getInitialState() {
    return {
      name: null
    }
  },
  // update state when the input is changed
  handleNameChange(e) {
    this.setState({name: e.target.value})
  },
  // form submit function
  addFood(e) {
    e.preventDefault()
    store.dispatch({
      type: 'ADD_FOOD',
      name: this.state.name
    })
    // clear form
    this.setState({name: null})
  },
  // initial render function
  render() {
    return(
      <div>
        <form onSubmit={this.addFood}>
          <input placeholder="Name" value={this.state.name} onChange={this.handleNameChange} autoFocus />
          <button>Add Food</button>
        </form>
        {/* list of the foods */}
        <ul>
          {this.props.foods.map((food, index) =>
            <li key={index}>
              {food.name}
            </li>
          )}
        </ul>
      </div>
    )
  }
})

export default FoodList
