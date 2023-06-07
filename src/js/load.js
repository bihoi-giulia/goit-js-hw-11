const toggleLoadMoreButton = shouldDisplay => {
  const loadMoreButton = document.querySelector('.load__more');
  if (shouldDisplay) {
    loadMoreButton.style.display = 'block';
  } else {
    loadMoreButton.style.display = 'none';
  }
};

export default toggleLoadMoreButton;
