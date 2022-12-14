import axios from 'axios';
import { APIBase } from './api';

const token = localStorage.getItem('token') ?? sessionStorage.getItem('token');

const config = {
  headers: {
    authorization: token,
  },
};
export default async function loadData(thunkAPI, path, token) {
  const authConfig = {
    headers: {
      authorization: token,
    },
  };

  return axios
    .get(`${APIBase}${path}`, authConfig ? authConfig : config, thunkAPI)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function loadDataWithId(thunkAPI, path, id) {
  const configId = {
    headers: {
      authorization: token,
    },
    params: {
      catId: id,
    },
  };
  return axios
    .get(`${APIBase}${path}`, configId, thunkAPI)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
export async function loadDataWithParams(thunkAPI, path, params, data, token) {
  const config = {
    headers: {
      authorization: token,
    },
    params,
  };
  return axios
    .post(`${APIBase}${path}`, data, config, thunkAPI)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
}
