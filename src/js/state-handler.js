import onChange from 'on-change';
import renderItems from './render-items';
import state from './state';

export default () => {
  const checkboxes = document.querySelectorAll('[type="checkbox"]');
  const watchedState = onChange(state, () => {
    fetch('https://reqres.in/api/unknown?per_page=12')
      .then((response) => response.json())
      .then((result) => renderItems(result.data, state));
  });
  checkboxes.forEach((input) => {
    input.addEventListener('click', () => {
      watchedState.id = !watchedState.id;
    });
  });
};
