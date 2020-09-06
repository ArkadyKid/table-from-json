export default (data, state) => {
  const tbody = document.querySelector('tbody');
  const thead = document.querySelector('thead');
  thead.innerHTML = '';
  tbody.innerHTML = '';

  const trHead = document.createElement('tr');
  const appendHead = (val) => {
    const label = document.createElement('label');
    const input = document.createElement('input');
    const span = document.createElement('span');
    const th = document.createElement('th');
    label.for = val;
    input.type = 'checkbox';
    input.id = val;
    input.dataset.checkbox = val;
    span.textContent = val;
    th.classList.add('table__head-cell');
    label.append(input);
    label.append(span);
    th.append(label);
    trHead.append(th);
  };

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

    if (state.id) {
      appendElement(val.id);
    }

    if (state.name) {
      appendElement(val.name.charAt(0).toUpperCase() + val.name.slice(1));
    }

    if (state.year) {
      appendElement(val.year);
    }

    if (state.color) {
      appendElement(val.color);
    }

    if (state.value) {
      appendElement(val.pantone_value);
    }

    tbody.append(trBody);
  });

  if (state.id) {
    appendHead('id');
  }

  if (state.name) {
    appendHead('name');
  }

  if (state.year) {
    appendHead('year');
  }

  if (state.color) {
    appendHead('color');
  }

  if (state.value) {
    appendHead('pantone_value');
  }

  thead.append(trHead);
};
