import { AUTH } from "../constraint/actionTypes";
import * as api from "../api";

const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signin(formData);
    console.log(data)
    dispatch({
      type: AUTH,
      data: data,
    });
    history.push('/')
  } catch (err) {
    console.log(err.message);
  }
};


const signup = (formData, history) => async (dispatch) => {  //register
  try {
    const { data } = await api.signup(formData);
    dispatch({
      type: AUTH,
      data: data,
    });
    history.push('/')
  } catch (err) {
    console.log(err.message);
  }
};

export {
  signin,
  signup
}