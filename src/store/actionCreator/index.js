import {SET_DATA, GET_DATA_BY_ID, SET_ERROR} from "../actionType"

const baseUrl = "https://pokeapi.co/api/v2/pokemon/"


export function setData (data) {
  return {type: SET_DATA, payload: data}
}

export function getDataById (data) {
  return {type: GET_DATA_BY_ID, payload: data}
}

export function setError (payload) {
  return {type: SET_ERROR, payload}
}

export function fetchData () {
  return async (dispatch) => {
    try {
      const response = await fetch (baseUrl , {
        method: "get",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.ok) {
        const data = await response.json()

        /// Promise.all
        const results = await Promise.all(data.results.map(async element => {
          const {name,url} = element
          const pokemonResponse = await fetch(url)
          const pokemonData = await pokemonResponse.json()
          return {
            id: url.split("/pokemon/")[1].replace("/", ""),
            name,
            url,
            abilities: pokemonData.abilities,
            imageUrl: pokemonData.sprites.other.home.front_default,
            types: pokemonData.types
          }
        }))
        console.log(results,">>>>>>>>>>masuk");
        dispatch(setData(results))
      } else {
        const data = await response.json()
        return data.message
      }
    } catch (err) {
      dispatch(setError(err))
    } 
  }
}

export function fetchDataById(id) {
  return async (dispatch) => {
    try {
      const response = await fetch (baseUrl + id, {
        method: "get",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.ok) {
        const data = await response.json()
          const {name, height, weight, sprites, types, abilities, stats} = data
          const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/`+id)
          const speciesData = await speciesResponse.json()
          const {genera} = speciesData
          const selectedGenera = genera.find(el => el.language.name === 'en')
          const formattedAbilities = abilities.map(el => {
            const first = el.ability.name.charAt(0).toUpperCase()
            const rest = el.ability.name.slice(1)
            return first + rest
          }).join(', ')

          const  result  = {
            name,
            id,
            types,
            imageUrl:sprites.other.home.front_default,
            height,
            weight,
            species: selectedGenera.genus.replace('Pokémon',""),
            abilities: formattedAbilities,
            stats
          }
          console.log(result,"...RESULT DI STORE");
        dispatch(getDataById(result))
      } else {
        const data = await response.json()
        return data.message
      }
    } catch (err) {
      dispatch(setError(err))
    }
  }
}

export function fetchPokemonEvolution(id) {
  return async (dispatch) => {
    try {
      const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      const speciesData = await speciesResponse.json()
      const {evolution_chain: {url}, evolves_from_species} = speciesData

      const evoChainRes = await fetch(url)
      const {chain} = await evoChainRes.json()

      const formattedEvo = {
        1: chain.species.name
      }

      const hasEvo = chain.evolves_to.length
      let isLast = false
      let order = 2
      if (hasEvo) {
        let level = chain.evolves_to[0]
        while (!isLast) {
          formattedEvo[order] = level.species.name
          if (level.evolves_to.length) {
            level = level.evolves_to[0]
            order++
          } else {
            isLast = true
          }
        }
      }

      const result = await Promise.all(Object.entries(formattedEvo).map(async([key,value]) => {
        const pokemonRes = await fetch (baseUrl + value)
        const pokemonData = await pokemonRes.json()
        const { sprites:{other:{home: {front_default}}}} =  pokemonData
        return {
          order: key,
          name: value,
          imageUrl: front_default
        }
      }))
      return result
    } catch (error) {
      console.log(error);
    }
  }
}

export function fetchPokemonMoves(id) {
  return async () => {
    try {
      const pokemonRes = await fetch(baseUrl + id)
      const pokemonData = await pokemonRes.json()
      const {moves} = pokemonData 

      const result = await Promise.all(moves.map(async el => {
        const {move: {name, url}} = el
        const moveRes = await fetch(url)
        const moveDetail = await moveRes.json()
        const {accuracy,power,pp} = moveDetail

        return {
          name: name.split('-').join(' '),
          accuracy,
          power,
          pp
        }
      }))
      return result
      
    } catch (error) {
      console.log(error);
    }
  }
}


