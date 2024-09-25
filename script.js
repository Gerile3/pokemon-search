const searchBtn = document.querySelector("#search-button")
const searchInput = document.querySelector("#search-input")
const statsTable = document.querySelectorAll("td")
const affinities = document.querySelector("#types")

let lastSearch = "";

function isValidPokemonId(input) {
    const num = Number(input);
    return num >= 1 && num <= 1025;
}

async function getPokemon(nameOrId) {
    try {
        searchBtn.disabled = true;
        const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrId}`)
        const data = await response.json()
        searchBtn.disabled = false; 
        return data
    } catch (error){
        console.log(error)
        alert("Pokémon not found")
        searchBtn.disabled = false; 
        return false
    }
}

async function processPokemonInfo(nameOrId) {

    if (nameOrId === lastSearch) {
        console.log("You've already searched for this Pokémon.")
        return
    }

    if (!isNaN(nameOrId)) {
        if (!isValidPokemonId(nameOrId)) {
            document.querySelector("#pokemon-name").textContent = "Please enter a valid Pokémon ID between 1 and 1025."
            return
        }
    }

    affinities.innerHTML = '';
    const data = await getPokemon(nameOrId)
    const pokemonCard = document.querySelector("#pokemon-info-card")

    if(data){
        const {name, id, height, weight, stats, sprites, types} = data
        const primaryType = types[0].type.name;
        document.querySelector("#pokemon-name").textContent = `${name.toUpperCase()}`
        document.querySelector("#pokemon-id").textContent = "#" + id
        document.querySelector("#height").textContent = "Height: " + height / 10 + " m"
        document.querySelector("#weight").textContent = "Weight: " + weight / 10 + " kg"
        document.querySelector(".poke-img").src = sprites.front_default
        document.querySelector(".poke-img").id = "sprite"
        
        affinities.innerHTML = types
        .map(obj => `<span class="type ${obj.type.name}">${obj.type.name}</span>`)
        .join('');

        pokemonCard.className = ""
        pokemonCard.classList.add(primaryType)
        
        const statsMap = {
            "hp": stats[0]["base_stat"],
            "attack": stats[1]["base_stat"],
            "defense": stats[2]["base_stat"],
            "special-attack": stats[3]["base_stat"],
            "special-defense": stats[4]["base_stat"],
            "speed": stats[5]["base_stat"],
        };
        
        statsTable.forEach((td) => {
            if (statsMap[td.id]) {
                td.textContent = statsMap[td.id];
            }
        });

        lastSearch = nameOrId;
    }
}

searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const searchValue = searchInput.value.trim();
    if (searchValue) {
        affinities.innerHTML = '';
        processPokemonInfo(searchValue.toLowerCase());
    } else {
        document.querySelector("#pokemon-name").textContent = "Please enter a Pokémon name or ID";
        return
    }
});

searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        processPokemonInfo(searchInput.value.toLowerCase());
    }
});

window.addEventListener("load", () => {
    searchInput.value = ""
})