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
        document.querySelector("#pokemon-name").textContent = `${name.toUpperCase()} #${id}`
        document.querySelector("#height").textContent = height
        document.querySelector("#weight").textContent = weight
        document.querySelector(".poke-img").src = sprites.front_default
    
        for (let index = 0; index < types.length; index++) {
            const type = document.createElement("span");
            type.id = "type"
            type.className = `affinities ${types[index].type.name}`
            type.textContent = types[index].type.name
            affinities.appendChild(type)
        }
    
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
    if (searchInput.value) {
        if(document.getElementById("type")){
            elements = document.querySelectorAll("#type")
            elements.forEach((element)=>{
                element.remove()
            })
        }
        processPokemonInfo(searchInput.value)
    }
    return
})

window.addEventListener("load", () => {
    searchInput.value = ""
})