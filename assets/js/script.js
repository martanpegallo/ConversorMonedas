let button = document.querySelector("#botonConvertir");

// Function to fetch data from the API
const getData = async ()=> {
    try {
        const apiUrl = `https://mindicador.cl/api/${document.querySelector("#monedaConvertir").value}`;
        const response = await fetch (apiUrl);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        alert("Error al obtener los datos");
    }
}

// Event listener for the button click
button.addEventListener("click", async () => {
    let inputValue = document.querySelector("#monto").value;
    let result = await getData();
    console.log(result);
    let resultado = inputValue / result.serie[0].valor;
    console.log(resultado);
    document.querySelector("#resultado").innerHTML = "El monto en la moneda seleccionada es $" + resultado.toFixed(2) + " " + result.codigo;
    document.getElementById("valorActual").innerHTML = "Valor actual calculado: $" + result.serie[0].valor + " " + result.codigo;
    // //document.querySelector("#resultado").innerHTML = 
    // `El monto en la divisa seleccionada es $${inputValue / result.serie[0].valor} ${result.codigo}`;
    renderGrafic(result.serie);
})

// Function to render the chart
const renderGrafic = (data) => {
    let fechaArray = data.map((item) =>
      new Date(item.fecha).toISOString().slice(0, 10)
    );
    let fecha = fechaArray.slice(0, 10);
    let valorArray = data.map((item) => item.valor);
    let valores = valorArray.slice(0, 10);
  
    const ctx = document.getElementById("myChart");
  
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
