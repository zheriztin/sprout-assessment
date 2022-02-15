import React from 'react'
import {Link, useParams} from "react-router-dom"
import {useEffect , useState }from "react"
import {useDispatch, useSelector} from "react-redux"
import {fetchDataById, fetchPokemonEvolution, fetchPokemonMoves} from "../store/actionCreator/index"
import './detail.css'

const dictionary = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  "speed": "Speed"
}


export const Detail = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const pokemon = useSelector(state => state.dataById)
  const [pokemonEvo, setPokemonEvo] = useState([])
  const [pokemonMoves, setPokemonMoves] = useState([])
  const [selectedTab, setSelectedTab] = useState({
    'about': true,
    'baseStats': false,
    'evolution': false,
    'moves': false
  })

  useEffect(()=> {
    if (!id) return
    dispatch(fetchDataById(id))

  },[])

  const fetchEvolution =  async (pokemonId) =>  {
    const data = await dispatch(fetchPokemonEvolution(pokemonId))
    console.log(data,".. data pokemom evo");
    setPokemonEvo(data)
  }

  const fetchMoves = async (pokemonId) => {
    console.log(pokemonId," id to fetch moves");
    const data = await dispatch(fetchPokemonMoves(pokemonId))
    console.log(data," pokemon moves fetchhchchhchch");
    setPokemonMoves(data)
  }

  const changeTab = (tab) => {
    if (tab === 'evolution') {
      fetchEvolution(id)
    } else if (tab === 'moves') {
      fetchMoves(id)
    }

    const newTab = {}

    for (const key in selectedTab) {
      if (key !== tab) {
        newTab[key] = false
      } else {
        newTab[key] = true
      }
    }
    setSelectedTab(newTab)
  }

  return (
    <div>
      <Link to="/"> 
      <button style={{backgroundColor: 'red', borderRadius: '10px', color: 'white', border:'none', padding: '0.5em'}}>Home</button>
      </Link>
      {
        pokemon && (
          <div>
            <h5 className="card-title">{pokemon?.name}</h5>
            <div>
              { id.length == 1? <h5 className="card-title">00{id}</h5> :<h5 className="card-title">0{id}</h5>}
            </div>
            {
              pokemon.types?.map ((element, index) => ((
                <p className="card-text" key={index}>{element.type.name}</p>
              )))
            }
            <img className="img-fluid rounded-start" src= {pokemon?.imageUrl} /> 
            <div style={{display: 'flex', justifyContent:'center'}}>
              <div style={{margin:'2em', borderBottom: selectedTab['about'] && '5px solid red', padding:'0.25em', cursor:'pointer'}} onClick={()=> changeTab('about')}>About</div>
              <div style={{margin:'2em', borderBottom: selectedTab['baseStats'] && '5px solid red', padding:'0.25em', cursor:'pointer'}} onClick={()=> changeTab('baseStats')}>Base Stats</div>
              <div style={{margin:'2em', borderBottom: selectedTab['evolution'] && '5px solid red', padding:'0.25em', cursor:'pointer'}} onClick={()=> changeTab('evolution')}>Evolution</div>
              <div style={{margin:'2em', borderBottom: selectedTab['moves'] && '5px solid red', padding:'0.25em', cursor:'pointer'}} onClick={()=> changeTab('moves')}>Moves</div>
            </div>

            {
              selectedTab['about'] && (
                <div className="tab-content clearfix" name="About">
                  <div className="tab-pane active" id="1b">
                    <h3>Species: {pokemon?.species} </h3>
                    <h3>Height: {pokemon.height}</h3>
                    <h3>Weight: {pokemon.weight}</h3>
                    <h3>Abilities: {pokemon.abilities}</h3>
                  </div>
                </div>
              )
            }
            {
              selectedTab['baseStats'] && (
                <div style={{ justifyContent:'center', alignItems:'center', display:'flex', flexDirection: 'column'}}>
                  {pokemon.stats.map ((el, index) => ((
                      <div style={{display: 'flex', flexDirection: 'row'}} key={index}>
                        <h3>{dictionary[el.stat.name]}</h3>
                        <h3>{el.base_stat}</h3>
                        <progress value={`${el.base_stat}`} max="100" style={{backgroundColor: el.base_stat < 50 ? "red": "green"}}></progress>
                      </div>
                  )))}
                </div>
              )
            }

            {
              selectedTab['evolution'] && (
                <div style={{display: 'flex', flexWrap: 'wrap', margin:'auto auto', maxWidth:'700px'}}>
                  {
                    pokemonEvo?.map(el => (
                      <div key={el.order} style={{border: '1px solid black', margin:'1em', padding: '0.5em'}}>
                        <div style={{display:'flex', justifyContent: 'space-evenly'}}>
                          <h3>{el.order}</h3>
                          <h3>{el.name}</h3>
                        </div>
                        <img src={el.imageUrl} alt={el.name}  height="300px" width="300px"/>
                      </div>
                    ))
                  }
                  </div>
              )
            }

            {
              selectedTab['moves'] && (
                <div style={{display:'flex', justifyContent:'center'}}>
                  <table style={{width: '600px'}}> 
                    <thead>
                      <tr style={{borderBottom: '2px solid black'}}> 
                        <th colSpan="3">Move</th>
                        <th>Att</th>
                        <th>Acc</th>
                        <th>PP</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      pokemonMoves.map(el => (
                        <tr key={el.name} style={{borderBottom: '1px dotted grey'}}>
                          <td colSpan="3" style={{textTransform: 'capitalize'}}> {el.name}</td>
                          <td>{el.power}</td>
                          <td>{el.accuracy}</td>
                          <td>{el.pp}</td>
                        </tr>
                      ))
                    }
                    </tbody>
                  </table>
                </div>
              )
            }

          </div>
        )
      }
      </div>
  )
}
