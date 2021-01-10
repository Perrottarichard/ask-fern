import { ToastAndroid } from 'react-native';
import userService from '../services/userService'

const activeUserReducer = (state = {user: null, redirecting: false, userPoints: null, userLevel: null}, action) => {
  switch (action.type) {
  case 'SET_USER':
    return {...state, user: action.data};
  case 'REDIRECTING':
    return {...state, redirecting: action.data}
  case 'USER_LOGOUT':
    return {...state, user: action.data};
  case 'UPDATE_AVATAR':
    return {...state, user: {...state.user, avatarProps: action.data.avatarProps, avatarName: action.data.avatarName}}
  case 'INIT_STATS':
    return {...state, userPoints: action.data.points, userLevel: action.data.level}
  case 'ADD_POINTS':
    return {...state, userPoints: state.userPoints + action.data}
  case 'LEVEL_UP':
      return {...state, userLevel: state.userLevel + 1}
  case 'ADD_MOOD':
    return {...state, user: action.data}
  case 'UPDATE_USER':
    return {...state, user: action.data};
  default:
    return state;
  }
};
export const setUser = (data) => ({
  type: 'SET_USER',
  data,
});
export const clearUser = () => ({
  type: 'USER_LOGOUT',
  data: null,
});
export const redirecting = (bool) => ({
  type: 'REDIRECTING',
  data: bool
})
export const initStats = (id) => async (dispatch) => {
  try {
    const stats = await userService.getUserPointsAndLevel(id);
    dispatch({
      type: 'INIT_STATS',
      data: stats
    })
    console.log('user stats initiated')
  } catch (error) {
    console.log(error)
  }
}
export const addPoints = (id, pointsToAdd) => async (dispatch) => {
  try {
    await userService.addUserPoints(id, pointsToAdd);
    dispatch({
      type: 'ADD_POINTS',
      data: pointsToAdd
    })
    console.log('points added')
  } catch (error) {
    console.log(error)
  }
}
export const levelUp = (id) => async (dispatch) => {
  try {
    await userService.levelUpUser(id);
    dispatch({
      type: 'LEVEL_UP',
      data: null
    })
    console.log('user level up')
  } catch (error) {
    console.log(error)
  }
}
export const updateUserAvatar = (id, avatarProps, avatarName) => async (dispatch) => {
  try {
    const updated = await userService.createAvatar(id, avatarProps, avatarName);
    dispatch({
      type: 'UPDATE_AVATAR',
      data: {id, avatarProps, avatarName}
    })
    dispatch({
      type: 'UPDATE_USER',
      data: updated
    })
    ToastAndroid.show('บันทึกสำเร็จ', ToastAndroid.SHORT)
  } catch (error) {
    console.log(error)
    ToastAndroid.show('มีบางอย่างผิดพลาดกรุณาตรวจสอบ', ToastAndroid.SHORT)
  }

};

export const addMood = (moodNum) => async (dispatch) => {
  try {
    const updated = await userService.recordMood(moodNum);
    dispatch({
      type: 'ADD_MOOD',
      data: updated
    })
    ToastAndroid.show('บันทึกสำเร็จ', ToastAndroid.SHORT)
  } catch (error) {
    console.log(error)
    ToastAndroid.show('มีบางอย่างผิดพลาดกรุณาตรวจสอบ', ToastAndroid.SHORT)
  }
}

export default activeUserReducer;
