import Notiflix from 'notiflix';
import { fetchImg } from './fetchlmg';
import { handleResponse, clearGallery } from './handleResponse';
import toggleLoadMoreButton from './load';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('#form__search');
const loadMoreButton = document.querySelector('.load__more');

let currentPage = 1;
const perPage = 9;
let searchQuery = '';
searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  const newSearchQuery = searchForm.querySelector('[name="searchQuery"]').value;
  if (newSearchQuery === '') {
    Notiflix.Notify.failure('Please write something');
    return;
  }

  if (searchQuery !== newSearchQuery) {
    searchQuery = newSearchQuery;
    currentPage = 1;
    clearGallery();
  }
  try {
    const response = await fetchImg(searchQuery, currentPage, perPage);
    handleResponse(response, perPage);
    const totalHits = response.totalHits || 0;
    if (currentPage === 1) {
      if (totalHits) {
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        const lightbox = new SimpleLightbox('.gallery a');
        lightbox.refresh();
      } else {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
    }
    searchForm.reset();
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure('Error occurred. Please try again later.');
  }
});

loadMoreButton.addEventListener('click', async () => {
  currentPage++;
  try {
    const response = await fetchImg(searchQuery, currentPage, perPage);
    handleResponse(response, perPage);
    const totalHits = response.totalHits || 0;
    if (currentPage * perPage >= totalHits) {
      toggleLoadMoreButton(false);
      if (totalHits > 0) {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    }
    const lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
    searchForm.reset();
  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure('Error occurred. Please try again later.');
  }
});
