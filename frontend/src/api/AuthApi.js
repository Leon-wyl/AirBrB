import { postAxios } from './Base';
import { baseUrl } from '../constants/Constants';

export const postLogin = async (email, password) => {
  try {
    const url = baseUrl + '/user/auth/login';
    const data = {
      email: email,
      password: password,
    };
    const res = await postAxios(url, data);
    console.log(res);
    return res;
  } catch (err) {
    return err;
  }
};

export const postRegister = async (email, name, password) => {
  try {
    const url = baseUrl + '/user/auth/register';
    const data = {
      email: email,
      name: name,
      password: password,
    };
    const res = await postAxios(url, data);
    return res;
  } catch (err) {
    return err;
  }
};

export const postLogout = async () => {
  try {
    const token = localStorage.getItem('token');
    const url = baseUrl + '/user/auth/logout';
    const headers = { Authorization: 'Bearer ' + token };
    const res = await postAxios(url, {}, headers);
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    return err;
  }
};
