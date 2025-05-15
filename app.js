async function buscarPokemon() {
    const nombre = document.getElementById('pokemonInput').value.toLowerCase();
    const infoDiv = document.getElementById('pokemonInfo');
    infoDiv.innerHTML = 'Buscando...';

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        if (!res.ok) throw new Error('Pokemon no encontrado');

        const data = await res.json();

        const tipos = data.types.map(t => t.type.name).join(', ');

        infoDiv.innerHTML = `
      <h2>${data.name.toUpperCase()}</h2>
      <img src="${data.sprites.front_default}" alt="${data.name}" />
      <p><strong>Tipo:</strong> ${tipos}</p>
      <p><strong>Altura:</strong> ${data.height}</p>
      <p><strong>Peso:</strong> ${data.weight}</p>
    `;
    } catch (error) {
        infoDiv.innerHTML = `<p style="color:red;">No se encontró el Pokémon 😢</p>`;
    }
}