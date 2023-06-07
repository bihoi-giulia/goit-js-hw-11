import axios from 'axios';
import Notiflix from 'notiflix';

const URL = 'https://pixabay.com/api';
const API_KEY = '36881198-9b3418838f94793c6af8c8124';

const fetchImg = async (searchQuery, page, perPage) => {
  try {
    const response = await axios.get(
      `${URL}/?key=${API_KEY}&q=${searchQuery}&u=image_type=photo&orientation=horizontal&saferesearch=true&page=${page}&per_page=${perPage}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure('Error occurred. Please try again later.');
    throw error;
  }
};
export { fetchImg };
