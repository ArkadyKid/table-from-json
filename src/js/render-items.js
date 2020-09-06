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
    const appendElement = (v) => {
      const td = document.createElement('td');
      td.textContent = v;
      trBody.append(td);
    };

    if (state.id) {
      appendElement(val.id);
    }

    if (state.name) {
      appendElement(val.name);
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
