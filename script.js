const searchBtn = document.querySelector("#search-button")
const searchInput = document.querySelector("#search-input")
const statsTable = document.querySelectorAll("td")
const affinities = document.querySelector("#types")

async function getPokemon(nameOrId) {
    try {
        const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrId}`)
        const data = await response.json()
        return data
    } catch (error){
        console.log(error)
        alert("Pokémon not found")
        return false
    }
}

async function processPokemonInfo(nameOrId) {
    const data = await getPokemon(nameOrId)

    if(data){
        const {name, id, height, weight, stats, sprites, types} = data
        document.querySelector("#pokemon-name").textContent = `${name.toUpperCase()}`
        document.querySelector("#pokemon-id").textContent = "#" + id
        document.querySelector("#height").textContent = height
        document.querySelector("#weight").textContent = weight
        document.querySelector(".poke-img").src = sprites.front_default
        document.querySelector(".poke-img").id = "sprite"
    
        affinities.innerHTML = types
        .map(obj => `<span class="type ${obj.type.name}">${obj.type.name}</span>`)
        .join('');

        statsTable.forEach((td) => {
            switch (td.id) {
                case "attack":
                    td.textContent = stats[1]["base_stat"];
                    break;
                case "defense":
                    td.textContent = stats[2]["base_stat"];
                    break;
                case "special-attack":
                    td.textContent = stats[3]["base_stat"];
                    break;
                case "special-defense":
                    td.textContent = stats[4]["base_stat"];
                    break;
                case "hp":
                    td.textContent = stats[0]["base_stat"];
                    break;
                case "speed":
                    td.textContent = stats[5]["base_stat"]
                    break
                default:
                    break
            }
        })
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