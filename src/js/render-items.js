export default (data, state) => {
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';
  data.forEach((item) => {
    const tr = document.createElement('tr');
    const appendElement = (val) => {
      const td = document.createElement('td');
      td.textContent = item[val];
      tr.append(td);
    };

    if (state.id) {
      appendElement('id');
    }

    if (state.name) {
      appendElement('name');
    }

    if (state.year) {
      appendElement('year');
    }

    if (state.color) {
      appendElement('color');
    }

    if (state.value) {
      appendElement('pantone_value');
    }

    tbody.append(tr);
  });
};
