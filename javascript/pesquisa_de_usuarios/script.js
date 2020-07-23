let query = document.querySelector('input'),
  btn = document.querySelector('button'),
  peopleSection = document.getElementById('People'),
  resultSection = document.getElementById('Results');

query.addEventListener('keyup', event => {
  if (query.value.trim() !== '') {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
  if (event.key === 'Enter')
    // go to btn event handler
    btn.click();
});
function render(filtered) {
  let qtdArray = filtered.length,
    sumMale,
    sumFemale,
    sumAge,
    mediaAge;
  if (qtdArray) {
    peopleSection.innerHTML = `
    <h2>
      ${qtdArray} usuário(s) encontrado(s)
    </h2>
    <ul>`;

    resultSection.innerHTML = `
    <h2>
      Estatísticas
    </h2>
    <ul>`;

    filtered.forEach(element => {
      peopleSection.innerHTML += `
      <li>
        <img src="${element.picture.thumbnail}" alt="thumbnail"> ${element.name.first} ${element.name.last}, ${element.dob.age} anos
      </li>`;
    });

    sumMale = filtered.reduce((acc, el) => {
      return (acc += 1 ? el.gender === 'male' : 0);
    }, 0);

    sumFemale = filtered.reduce((acc, el) => {
      return (acc += 1 ? el.gender === 'female' : 0);
    }, 0);

    sumAge = filtered.reduce((acc, el) => {
      return (acc += el.dob.age);
    }, 0);

    mediaAge = sumAge / qtdArray;

    resultSection.innerHTML += `
    <li> Sexo masculino: <b>${sumMale}</b></li>
    <li> Sexo feminino: <b>${sumFemale}</b></li>
    <li> Soma das idades: <b>${sumAge}</b></li>
    <li> Média das idades: <b>${mediaAge}</b></li>
    `;

    peopleSection.innerHTML += '</ul>';
    resultSection.innerHTML += '</ul>';
  } else {
    peopleSection.innerHTML = '<h2>Nenhum usuário filtrado</h2>';
    resultSection.innerHTML = '<h2>Nada a ser exibido</h2>';
  }
}
async function handler() {
  const request = await fetch(
      'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
    ),
    json = await request.json();
  people = json.results;
  btn.addEventListener('click', () => {
    let search = query.value;
    let filtered = people.filter(obj => {
      return (
        obj.name.first.toLowerCase().includes(search.toLowerCase()) ||
        obj.name.last.toLowerCase().includes(search.toLowerCase()) ||
        `${obj.name.fist} ${obj.name.last}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });
    render(filtered);
  });
}
handler();
