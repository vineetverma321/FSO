import axios from 'axios';

const baseURL = 'http://localhost:3001/persons';

const get = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const create = (newPerson) => {
  const request = axios.post(baseURL, newPerson);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const customURL = `${baseURL}/${id}`;
  const request = axios.delete(customURL);
  return request.then((response) => response.data);
};

export default { get, create, deletePerson };
