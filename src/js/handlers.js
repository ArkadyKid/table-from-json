import onChange from 'on-change';
import renderItems from './render-items';
import state from './state';

export default () => {
  const watchedState = onChange(state, () => {
    fetch('https://reqres.in/api/unknown?per_page=12')
      .then((response) => response.json())
      .then((result) => renderItems(result.data, state));
  });

  const resetButton = document.querySelector('button[type="reset"]');
  resetButton.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.clear();
    Object.keys(state).forEach((key) => {
      watchedState[key] = true;
    });
  });

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((input) => {
    input.addEventListener('click', (event) => {
      const data = event.target.dataset.checkbox;
      localStorage.setItem(data, 'false');
      watchedState[data] = false;
    });
  });
};
