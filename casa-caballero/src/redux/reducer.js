const initialState = {
  roomsAvailable: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ROOMS_AVAILABLE":
      return { ...state, roomsAvailable: action.payload };
      break;
    default:
      return state;
  }
};
export default reducer;
