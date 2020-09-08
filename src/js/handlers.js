import onChange from 'on-change';
import renderItems from './render';
import state from './state';

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const resetButton = document.querySelector('button[type="reset"]');
const watchedState = onChange(state, () => {
  fetch('https://reqres.in/api/unknown?per_page=12')
    .then((response) => response.json())
    .then((result) => renderItems(result.data, state));
});

export default () => {
  resetButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (Object.values(state).includes(false)) {
      localStorage.clear();
      Object.keys(state).forEach((key) => {
        watchedState[key] = true;
      });
    }
  });

  checkboxes.forEach((input) => {
    input.addEventListener('click', (event) => {
      const data = event.target.dataset.checkbox;
      localStorage.setItem(data, 'false');
      watchedState[data] = false;
    });
  });
};
