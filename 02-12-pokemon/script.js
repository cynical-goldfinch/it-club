const pokemonContainer = document.getElementById('pokemonContainer');

async function getPokemon(name) {
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

    if (!apiResponse.ok) {
        throw new Error(`Pokemon API returned status code ${response.status}`);
    }

    function getStatBaseValue(stats, statName) {
        const stat = stats.find(stat => stat.stat.name === statName);
        return stat.base_stat ?? 0;
    }

    const pokemonResponse = await apiResponse.json();
    return {
        name: pokemonResponse.name,
        image: pokemonResponse.sprites.other?.['official-artwork']?.front_default,
        hp: getStatBaseValue(pokemonResponse.stats, 'hp'),
        attack: getStatBaseValue(pokemonResponse.stats, 'attack'),
        defense: getStatBaseValue(pokemonResponse.stats, 'defense'),
        speed: getStatBaseValue(pokemonResponse.stats, 'speed'),
        types: pokemonResponse.types.map(type => type.type.name)
    };
}

function createPokemonView(pokemonData) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card')

    const imageDiv = document.createElement('div');
    imageDiv.classList.add('card-image')
    const pokemonImg = document.createElement('img');
    pokemonImg.setAttribute('src', pokemonData.image);
    imageDiv.appendChild(pokemonImg);
    cardDiv.appendChild(imageDiv);

    const nameHeader = document.createElement('h3');
    nameHeader.classList.add('card-name')
    nameHeader.appendChild(document.createTextNode(pokemonData.name));
    cardDiv.appendChild(nameHeader);

    const statHpDiv = document.createElement('div');
    statHpDiv.classList.add('card-stat-hp')
    const hpNameSpan = document.createElement('span');
    hpNameSpan.classList.add('card-stat-hp-name');
    hpNameSpan.appendChild(document.createTextNode('HP'));
    const hpValueSpan = document.createElement('span');
    hpValueSpan.classList.add('card-stat-hp-value');
    hpValueSpan.appendChild(document.createTextNode(pokemonData.hp));
    statHpDiv.appendChild(hpNameSpan);
    statHpDiv.appendChild(hpValueSpan);
    cardDiv.appendChild(statHpDiv);

    const addStat = (container, statName, statValue) => {
        const statDiv = document.createElement('div');
        statDiv.classList.add('card-stat')
        const statNameSpan = document.createElement('span');
        statNameSpan.classList.add('card-stat-name');
        statNameSpan.appendChild(document.createTextNode(statName));
        const statValueSpan = document.createElement('span');
        statValueSpan.classList.add('card-stat-value');
        statValueSpan.appendChild(document.createTextNode(statValue));
        statDiv.appendChild(statNameSpan);
        statDiv.appendChild(statValueSpan);
        container.appendChild(statDiv);
    }

    addStat(cardDiv, 'Attack', pokemonData.attack);
    addStat(cardDiv, 'Defense', pokemonData.defense);
    addStat(cardDiv, 'Speed', pokemonData.speed);

    for (const pokemonType of pokemonData.types) {
        const typeDiv = document.createElement('div');
        typeDiv.classList.add('card-type')
        typeDiv.appendChild(document.createTextNode(pokemonType));
        cardDiv.appendChild(typeDiv);
    }

    return cardDiv;
}

function displayError(error) {
    const div = document.createElement('div');
    div.innerText = error.message;
    pokemonContainer.innerHTML = '';
    pokemonContainer.appendChild(div);
}

async function main() {
    try {
        const pokemons = await Promise.all([
            getPokemon('pikachu'),
            getPokemon('ditto'),
            getPokemon('55'),
            getPokemon('113'),
            getPokemon('11'),
        ]);

        pokemonContainer.innerHTML = '';

        for(const pokemon of pokemons){
            const pokemonView = createPokemonView(pokemon);
            pokemonContainer.appendChild(pokemonView);
        }

    } catch (error) {
        displayError(error);
    }
}

main();