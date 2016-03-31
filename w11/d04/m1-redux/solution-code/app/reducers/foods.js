const foods = (state = [], action) => {
  switch (action.type) {
    case 'ADD_FOOD':
      // return an entirely new list of foods using spread operator
      return [
        ...state,
        {
          name: action.name
        }
      ]
    default:
      return state
  }
}

export default foods
