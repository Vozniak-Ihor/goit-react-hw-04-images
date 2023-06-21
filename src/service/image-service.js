const KEY = '&key=35658836-97de9db84549fa8436aad35d5';
const URL =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal&per_page=12';
const fetchImages = function (name, page) {
  return fetch(URL + KEY + `&q=${name}&page=${page}`);
};

const api = {
  fetchImages,
};
export default api;
