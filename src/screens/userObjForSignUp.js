export const user = {
  name: null,
  email: null,
  password: null,
  orientation: null,
  sex: null,
  autobio: null,
  relationship: null,
  ageCategory: null
};

export function setUserProp(key, val){
  user[key] = val;
}

export let userImages = [];

export function setUserImgs(imgs){
  userImages = imgs;
}