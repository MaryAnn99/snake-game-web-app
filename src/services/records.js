import { get, post, put, destroy } from './base';

export const Records = {
    index: () =>
      get('/records'),
    getByUsername: (username) =>
      get(`/records/${username}`),
    create: (params) =>
      post('/records', params),
    change: (username, params) =>
      put(`/records/${username}`, params),
    remove: (username) =>
      destroy(`/records/${username}`),
  }