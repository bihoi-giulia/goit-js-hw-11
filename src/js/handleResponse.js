import toggleLoadMoreButton from './load';

const getGalleryElement = () => document.querySelector('.gallery');

const clearGallery = () => {
  const galleryElement = getGalleryElement();
  if (galleryElement) {
    galleryElement.innerHTML = '';
  }
};

const handleResponse = (data, perPage) => {
  const { hits, totalHits } = data;

  const galleryElement = getGalleryElement();
  if (!galleryElement) {
    return;
  }

  const markup = hits.map((hit, index) => markupGallery(hit, index)).join('');

  galleryElement.insertAdjacentHTML('beforeend', markup);

  const galleryItems = galleryElement.querySelectorAll('.gallery__items');
  const currentPage = Math.ceil(galleryItems.length / perPage);

  if (currentPage * perPage >= totalHits) {
    toggleLoadMoreButton(false);
  } else {
    toggleLoadMoreButton(true);
  }
};

const markupGallery = (hit, index) => {
  return ` 
      <div class="gallery__items">
        <div class="gallery__items__img">
          <a href="${hit.largeImageURL}" data-lightbox="group-${index}">
              <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
            </a>  
        </div>
        <div class="gallery__items__details">
            <p class="gallery__items__details--info">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4.398C14.898-.735 24-.663 24 9.545c0 6.107-4.589 8.846-11.384 14.475a1 1 0 0 1-1.232 0C4.589 18.39 0 15.65 0 9.545 0-1.128 9.102-.833 12 4.398z"/>
            </svg>
            <b>Likes: </b> ${hit.likes}
            </p>
            <p class="gallery__items__details--info">
            <svg enable-background="new 0 0 32 32" height="32px" id="svg2" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg"><g id="background"><rect fill="none" height="32" width="32"/></g><g id="view"><circle cx="16" cy="16" r="6"/><path d="M16,6C6,6,0,15.938,0,15.938S6,26,16,26s16-10,16-10S26,6,16,6z M16,24c-8.75,0-13.5-8-13.5-8S7.25,8,16,8s13.5,8,13.5,8   S24.75,24,16,24z"/></g>
            </svg>
              <b>Views: </b> ${hit.views}
            </p>
            <p class="gallery__items__details--info">
            <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="8-Email" id="_8-Email"><path d="M45,7H3a3,3,0,0,0-3,3V38a3,3,0,0,0,3,3H45a3,3,0,0,0,3-3V10A3,3,0,0,0,45,7Zm-.64,2L24,24.74,3.64,9ZM2,37.59V10.26L17.41,22.17ZM3.41,39,19,23.41l4.38,3.39a1,1,0,0,0,1.22,0L29,23.41,44.59,39ZM46,37.59,30.59,22.17,46,10.26Z"/></g>
            </svg>
              <b>Comments: </b> ${hit.comments}
            </p>
            <p class="gallery__items__details--info">
            <?xml version="1.0" ?>
            <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><title/><g id="Cloud"><path d="M50.9883,27.3359a19,19,0,0,0-37.9766,0A13.9927,13.9927,0,0,0,16,55H48a13.9927,13.9927,0,0,0,2.9883-27.6641ZM38,42h3.7158L32,52.5259,22.2842,42H26a1,1,0,0,0,1-1V27H37V41A1,1,0,0,0,38,42ZM48,53H34.2835L44.7344,41.6782A1,1,0,0,0,44,40H39V26a1,1,0,0,0-1-1H26a1,1,0,0,0-1,1V40H20a1,1,0,0,0-.7344,1.6782L29.7165,53H16a11.9922,11.9922,0,0,1-1.8389-23.8437,1,1,0,0,0,.8477-1.0054L15,28a16.999,16.999,0,1,1,33.998.0146c-.0009.0191-.0068.1167-.0068.1363a1,1,0,0,0,.8477,1.0054A11.9922,11.9922,0,0,1,48,53Z"/></g>
            </svg>
              <b>Downloads:</b> ${hit.downloads}
            </p>
        </div>
      </div>
  `;
};

export { handleResponse, clearGallery };
