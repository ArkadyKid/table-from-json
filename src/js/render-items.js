import state from './state';

const hideHead = (val, state) => {
  const thead = document.querySelector('thead');
  const input = thead.querySelector(`[data-checkbox=${val}]`);
  const th = input.closest('th');
  input.checked = null;
  if (state) {
    th.classList.remove('table__head-cell--hide');
  } else {
    th.classList.add('table__head-cell--hide');
  }
};

const renderResetButton = () => {
  const resetButton = document.querySelector('button[type="reset"]');
  if (Object.values(state).includes(false)) {
    resetButton.classList.add('table__reset--active');
  } else {
    resetButton.classList.remove('table__reset--active');
  }
};

export default (data, state) => {
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';

  data.forEach((val) => {
    const trBody = document.createElement('tr');
    trBody.classList.add('table__row');
    const appendElement = (text) => {
      const td = document.createElement('td');
      const span = document.createElement('span');
      if (!isNaN(text)) {
        td.style.textAlign = 'right';
      }
      if (text === val.color) {
        const colorBlock = document.createElement('span');
        colorBlock.classList.add('table__color');
        colorBlock.style.backgroundColor = val.color;
        td.append(colorBlock);
      }
      td.classList.add('table__cell');
      span.textContent = text;
      td.append(span);
      trBody.append(td);
    };

    Object.entries(state).forEach(([key, value]) => {
      if (value) {
        switch (key) {
          case 'name':
            appendElement(val[key].charAt(0).toUpperCase() + val.name.slice(1));
            break;
          case 'value':
            appendElement(val.pantone_value);
            break;
          default:
            appendElement(val[key]);
        }
      }
      hideHead(key, value);
    });

    tbody.append(trBody);
  });
  renderResetButton();
};
