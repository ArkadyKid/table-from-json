import state from './state';
import renderItems from './render';
import handlers from './handlers';

fetch('https://reqres.in/api/unknown?per_page=12')
  .then((response) => response.json())
  .then((result) => renderItems(result.data, state));

handlers();
