const changeUserType = 'CHANGE_USER';
//const receiveWarrantyClaimsType = 'RECEIVE_WEATHER_FORECASTS';
const initialState = {
  currentUser: {
    id: 0,
    username: "Unauthenticated",
    roles: []
  },
  users: [
    {
      id: 0,
      username: "Unauthenticated",
      roles: []
    },
    {
      id: 1,
      username: "SubmitterUser",
      roles: ["submitter"]
    },
    {
      id: 2,
      username: "ApproverUser",
      roles: ["approver", "submitter"]
    }
  ]
};

export const actionCreators = {
  changeUser: (event) => async (dispatch, getState) => {
    //Get the current state
    var currentState = getState();

    //Get the selected value from the event
    var selectedUserId = event.target.value;

    //Check if the user is actually changing
    if (currentState.auth.currentUser.id !== selectedUserId) {

      //Lookup the user in our fake user listing (this would likely be an API call, or a call to local storage for real auth)
      var user = currentState.auth.users.filter((user) => { return user.id.toString() === selectedUserId })[0] || {};

      //Dispatch the changeUser redux action
      dispatch({ type: changeUserType, user });
    }
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === changeUserType) {
    return {
      ...state,
      currentUser: action.user
    };
  }

  return state;
};
