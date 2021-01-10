import userService from '../services/userService';

const userInfoForAdminReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_ALL_USERS':
    return action.data;
  default:
    return state;
  }
};

export const initializeUsers = () => async (dispatch) => {
  const allUsers = await userService.getAllUsers();
  dispatch({
    type: 'INIT_ALL_USERS',
    data: allUsers,
  });
};
export default userInfoForAdminReducer;
