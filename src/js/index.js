import renderItems from './render-items';
import stateHandler from './state-handler';
import state from './state';

fetch('https://reqres.in/api/unknown?per_page=12')
  .then((response) => response.json())
  .then((result) => renderItems(result.data, state));

stateHandler();
