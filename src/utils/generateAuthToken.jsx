import md5 from 'md5';

const generateAuthToken = (password) => {
  const today = new Date();
  const year = today.getUTCFullYear();
  const month = (today.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = today.getUTCDate().toString().padStart(2, '0');
  return md5(`${password}_${year}${month}${day}`);
};

export default generateAuthToken;
