
export const shouldLevelUp = (userPoints, userLevel, pointsToAdd) => {
let total = userPoints + pointsToAdd;
let levelNow = userLevel;

if(levelNow === 1 && total >= 10){
  return true;
}else if(levelNow === 2 && total >= 20){
  return true;
}else if(levelNow === 3 && total >= 30){
  return true;
}else if(levelNow === 4 && total >= 40){
  return true;
}else{
  return false;
}
}

export const getLevelTitle = (userLevel) => {
  if(userLevel === 1) {
    return 'มือใหม่'
  }else if(userLevel === 2) {
    return 'รุ่นเล็ก'
  }else if(userLevel === 3) {
    return 'รุ่นกลาง'
  }else if (userLevel === 4) {
    return 'รุ่นโปร'
  }else if (userLevel === 5) {
    return 'วีไอพี'
  }
}