import axios from 'axios'

// const apiClient = () => {
//   const access_token = localStorage.getItem('access_token');
//   const instance = axios.create({
//     baseURL: 'https://fakestoreapi.com/',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${access_token}`,
//     },
//     responseType: 'json',
//   });
//   return instance;
// };

// export const { get, post  } = apiClient()

const apiClient = () => {
  let headers = {
    'Content-Type': 'application/json',
  }

  if (typeof localStorage !== 'undefined') {
    const access_token = localStorage.getItem('access_token')
  }

  const instance = axios.create({
    baseURL: 'https://fakestoreapi.com/',
    headers,
    responseType: 'json',
  })

  return instance
}

export const { get, post } = apiClient()

