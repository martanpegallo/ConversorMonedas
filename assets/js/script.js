let button = document.querySelector("#botonConvertir");

// Function to fetch data from the API
const getData = async () => {
  try {
    const apiUrl = `https://mindicador.cl/api/${
      document.querySelector("#monedaConvertir").value
    }`;
    const response = await fetch(apiUrl);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    alert("Error al obtener los datos");
  }
};

// Function to render the chart
const ctx = document.getElementById("myChart");
const renderGrafic = (data) => {
  let fecha = data.map((item) =>
    new Date(item.fecha).toISOString().slice(0, 10)).slice(0, 10);
  let valores = data.map((item) => item.valor).slice(0, 10);

  new Chart(ctx, {
    type: "line",
    data: {
      labels: fecha,
      datasets: [
        {
          label: "Mindicador",
          data: valores,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    },
  });
};

// Event listener for the button click
button.addEventListener("click", async () => {
  let inputValue = document.querySelector("#monto").value;
  let result = await getData();
  console.log(result);
  let resultado = inputValue / result.serie[0].valor;
  console.log(resultado);
  document.querySelector("#resultado").innerHTML =
    "El monto en la moneda seleccionada es $" +
    resultado.toFixed(2) +
    " " +
    result.codigo;
  document.getElementById("valorActual").innerHTML =
    "Valor actual calculado: $" + result.serie[0].valor + " " + result.codigo;
    renderGrafic(result.serie);
});

