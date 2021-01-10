import axios from 'axios';

const baseUrl = 'https://askfern.app/api/login';

const userlogin = async (user) => {
  const response = await axios.post(baseUrl, user);
  return response.data;
};
export default { userlogin };
