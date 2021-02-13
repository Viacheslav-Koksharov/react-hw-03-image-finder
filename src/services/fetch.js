import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '19246531-fc0b1c1353c7051ee5ebaba0f';

function fetchImg(searchQuery, page) {
  const url = `${BASE_URL}?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  return axios.get(url).then(({ data }) => data.hits);
}

export default fetchImg;
