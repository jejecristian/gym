document.getElementById("insertar").addEventListener("submit", function (e) {
  e.preventDefault();
  const payload = prepararData(e);
  axios.post("http://localhost:3000/ejercicios", payload).then((res) => {
    getData(e);
  }).catch((error) => {
    if (error.response) console.log(error.response.data);
    else if (error.request) console.log(error.request.data);
    else console.log(error.message);
  });
});

document.getElementById("editar").addEventListener("submit", function (e) {
  e.preventDefault();
  const payload = prepararData(e);
  axios.put("http://localhost:3000/ejercicios", payload)
    .then((res) => {
      getData(e);
    })
    .catch((error) => {
      if (error.response) console.log(error.response.data);
      else if (error.request) console.log(error.request.data);
      else console.log(error.message);
    });
});

document.getElementById("eliminar").addEventListener("submit", function (e) {
  e.preventDefault();
  const nombre = e.target[1].value;
  axios
    // .delete("http://localhost:3000/ejercicios?nombre=" + nombre) // CON QUERY STRING
    .delete("http://localhost:3000/ejercicios/" + nombre) // CON PARAMETRO EN URL
    .then((res) => {
      getData(e);
    }).catch((error) => {
      if (error.response) console.log(error.response.data);
      else if (error.request) console.log(error.request.data);
      else console.log(error.message);
    });
});

function prepararData(e) {
  const nombre = e.target[1].value;
  const series = e.target[2].value;
  const repeticiones = e.target[3].value;
  const descanso = e.target[4].value;
  return { nombre, series, repeticiones, descanso };
}

function cleanInputs(e) {
  if (e.target[3]) {
    e.target[1].value = "";
    e.target[2].value = "";
    e.target[3].value = "";
    e.target[4].value = "";
  }
}
async function getData(e) {
  if (e) cleanInputs(e);
  const { data } = await axios.get("http://localhost:3000/ejercicios");
  let tbody = document.getElementsByTagName("tbody")[0];
  const ejercicios = data.rows;

  // Carga de la tabla
  tbody.innerHTML = "";
  ejercicios.forEach((e) => {
    tbody.innerHTML += `
          <tr>
              <td>${e.nombre}</td>
              <td>${e.series}</td>
              <td>${e.repeticiones}</td>
              <td>${e.descanso} segundos</td>
          </tr>
      `;
  });

  // Carga de los selectores

  let selectores = document.getElementsByTagName("select");

  selectores[0].innerHTML =
    "<option selected disabled>Seleccione un ejercicio</option>";
  selectores[1].innerHTML =
    "<option selected disabled>Seleccione un ejercicio</option>";

  ejercicios.forEach((e, i) => {
    selectores[0].innerHTML += `
        <option value="${e.nombre}">${e.nombre}</option>
      `;
  });
  ejercicios.forEach((e, i) => {
    selectores[1].innerHTML += `
        <option value="${e.nombre}">${e.nombre}</option>
      `;
  });
}

getData();