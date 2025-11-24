document.addEventListener('DOMContentLoaded', () => {
    const apiURL = "https://pokeapi.co/api/v2/pokemon/ditto";
    const cardContainer = document.querySelector('.card-container');

    cardContainer.innerHTML = '<p class="loading">Cargando datos de Ditto...</p>';

    fetch(apiURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json(); 
        })
        .then(data => {
            renderPokemonData(data);
        })
        .catch(error => {
            console.error("Hubo un problema con la operación de fetch:", error);
            cardContainer.innerHTML = `<p class="loading" style="color: #c00;">Error al cargar: ${error.message}</p>`;
        });

    function renderPokemonData(pokemon) {
        const abilitiesHTML = pokemon.abilities.map(ab => {
            const isHidden = ab.is_hidden ? '<span class="ability-hidden">OCULTA</span>' : '';
            return `
                <li class="ability-item">
                    <span>${ab.ability.name}</span>
                    ${isHidden}
                </li>
            `;
        }).join('');

        const pokemonHTML = `
            <h1 class="pokemon-name">${pokemon.name}</h1>
            <p class="pokemon-id">#${pokemon.id}</p>
            <img src="${pokemon.sprites.front_default}" alt="Sprite de ${pokemon.name}" class="pokemon-image">
            
            <h2 class="abilities-title">Habilidades</h2>
            <ul class="abilities-list">
                ${abilitiesHTML}
            </ul>
        `;
        
        cardContainer.innerHTML = pokemonHTML;
    }
});