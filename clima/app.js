async function buscarClima() {
  const ciudad = document.getElementById('ciudadInput').value.trim();
  const div = document.getElementById('climaInfo');

  // Validación: no permitir campo vacío
  if (!ciudad) {
    div.innerHTML = `<p style="color:red;">Por favor ingresa una ciudad 🌎</p>`;
    return;
  }

  div.innerHTML = 'Buscando...';

  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=a88d37265de248c53930fc1a488161fb&lang=es&units=metric`);
    if (!res.ok) throw new Error('Ciudad no encontrada');

    const data = await res.json();

    const temp = data.main.temp;
    const desc = data.weather[0].description;
    const icon = data.weather[0].icon;

    div.innerHTML = `
      <h2>${data.name}</h2>
      <p>🌡 Temperatura: ${temp} °C</p>
      <p>📖 Descripción: ${desc}</p>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
    `;
  } catch (error) {
    div.innerHTML = `<p style="color:red;">No se pudo obtener el clima 😢</p>`;
    console.error(error); // 👈 Para que lo veas en consola si hay error real
  }
}

// Permitir búsqueda con tecla Enter
document.getElementById('ciudadInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    buscarClima();
  }
});