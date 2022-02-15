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
          const status = {}
      

          const  result  = {
            name,
            id,
            types,
            imageUrl:sprites.other.home.front_default,
            height,
            weight,
            species: selectedGenera.genus.replace('Pokémon',""),
            abilities: formattedAbilities
          }
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


