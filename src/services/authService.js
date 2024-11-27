import api from './api';

export const loginUser = (email, password) => {
  return api.get(`/users?email=${email}&password=${password}`).then((response) => {
    if (response.data.length > 0) {

      if(response.data[0].status === "INACTIVE"){
        throw new Error('The user account is inactive. Please contact support.');
      }else{
        return response.data[0];
      }
      
    } else {
      throw new Error('Invalid credentials');
    }
  });
};


export const signUpUser = (userData) => {
  return api.post('/users', userData).then((response) => {
    return response.data;
  });
};
