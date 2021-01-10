import axios from 'axios';

const baseUrl = 'https://fern-counseling.herokuapp.com/api/contact';

const sendContact = async (message) => {
  const response = await axios.post(baseUrl, message);
  return response.data;
};
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};
const hideContact = async (contactToHide) => {
  const id = contactToHide._id;
  const response = await axios.put(`${baseUrl}/${id}`, contactToHide);
  return response.data;
};
export default { sendContact, getAll, hideContact };
