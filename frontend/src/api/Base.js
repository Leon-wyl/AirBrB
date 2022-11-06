import axios from 'axios';

export const getAxios = (url, data = {}, headers = {}) =>
  new Promise((resolve, reject) => {
    axios
      .get(
        url,
        { ...data },
        {
          headers: headers,
        }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const postAxios = (url, data = {}, headers = {}) =>
  new Promise((resolve, reject) => {
    axios
      .post(
        url,
        { ...data },
        {
          headers: headers,
        }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const putAxios = (url, data = {}, headers = {}) =>
  new Promise((resolve, reject) => {
    axios
      .put(
        url,
        { ...data },
        {
          headers: headers,
        }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const deleteAxios = (url, data = {}, headers = {}) =>
  new Promise((resolve, reject) => {
    axios
      .delete(
        url,
        {
          headers: headers,
          data: data,
        }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
