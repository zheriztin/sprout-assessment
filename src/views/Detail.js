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

const color = {
  normal: '#A8A77A',
  fire:  '#EE8130',
  water:  '#6390F0',
  electric:  '#F7D02C',
  grass:  '#7AC74C',
  fighting:  '#C22E28',
  poison:  '#A33EA1',
  flying:  '#A98FF3',
  psychic:  '#F95587',
  bug:  '#A6B91A',
  rock:  '#B6A136',
  ghost:  '#735797',
  dragon:  '#6F35FC',
  dark:  '#705746',
  steel:  '#B7B7CE',
  fairy:  '#D685AD'
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
    setPokemonEvo(data)
  }

  const fetchMoves = async (pokemonId) => {
    const data = await dispatch(fetchPokemonMoves(pokemonId))
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

  const convertNumberFormat = (id) => {
    if(id.length < 3) {
      return '#'+ '0'.repeat(3-id.length)+id
    }
    
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center'}}>
      <Link to="/"> 
      <button style={{backgroundColor: 'red', borderRadius: '10px', color: 'white', border:'none', padding: '0.5em', marginTop:'5px', marginLeft:'15px', float: 'left'}}>Home</button>
      </Link>
      {
        pokemon && (
          <div style={{marginTop: '20px', border:'2px solid #D8D2CB', margin:'2em', padding:'2em', width:'fit-content', borderRadius:'15px'}}> 
            <div style={{ backgroundColor: color[pokemon.types[0].type.name], padding: '20px 0px', borderRadius: '15px'}}>
              <div style={{display:'flex', justifyContent: 'space-around', alignItems:'center'}}>
                <div style={{display:'flex', flexDirection:'column'}}>
                  <h5 style={{textTransform: 'capitalize'}}>{pokemon?.name}</h5>
                {
                  pokemon.types?.map ((element, index) => ((
                    <p style={{backgroundColor:'white', opacity: 0.5, borderRadius:'15px', fontWeight:'bold'}} key={index}>{element.type.name}</p>
                  )))
                }
                </div>
                <h5>{convertNumberFormat(id)}</h5>
              </div>
              <img src= {pokemon?.imageUrl} /> 
            </div>
            <div style={{display: 'flex', justifyContent:'center'}}>
              <div style={{margin:'2em', borderBottom: selectedTab['about'] && '5px solid red', padding:'0.25em', cursor:'pointer', fontWeight: 'bold'}} onClick={()=> changeTab('about')}>About</div>
              <div style={{margin:'2em', borderBottom: selectedTab['baseStats'] && '5px solid red', padding:'0.25em', cursor:'pointer',fontWeight: 'bold'}} onClick={()=> changeTab('baseStats')}>Base Stats</div>
              <div style={{margin:'2em', borderBottom: selectedTab['evolution'] && '5px solid red', padding:'0.25em', cursor:'pointer' ,fontWeight: 'bold'}} onClick={()=> changeTab('evolution')}>Evolution</div>
              <div style={{margin:'2em', borderBottom: selectedTab['moves'] && '5px solid red', padding:'0.25em', cursor:'pointer' ,fontWeight: 'bold'}} onClick={()=> changeTab('moves')}>Moves</div>
            </div>

            {
              selectedTab['about'] && (
                <div name="About" style={{display:'flex', alignItems:'center', justifyContent: 'center'}}>
                  <table>
                    <tr style={{padding: '1px 20px'}}>
                      <th>Species</th>
                      <td style={{paddingLeft:'20px'}}>{pokemon.species}</td>
                    </tr>
                    <tr style={{padding: '1px 20px'}}>
                      <th>Height</th>
                      <td style={{paddingLeft:'20px'}}>{pokemon.height}</td>
                    </tr>
                    <tr style={{padding: '1px 20px'}}>
                      <th>Weight</th>
                      <td style={{paddingLeft:'20px'}}>{pokemon.weight}</td>
                    </tr>
                    <tr style={{padding: '1px 20px'}}>
                      <th>Abilitites</th>
                      <td style={{paddingLeft:'20px'}}>{pokemon.abilities}</td>
                    </tr>
                  </table>
                
                </div>
              )
            }
            {
              selectedTab['baseStats'] && (
                <div style={{ justifyContent:'center', alignItems:'center', display:'flex', flexDirection: 'column'}}>
                  <table>
                    {pokemon.stats.map ((el, index) => ((
                      <tr key={index}>
                        <th style={{textAlign:'left', padding:'0 1em'}}>{dictionary[el.stat.name]}</th>
                        <td style={{textAlign:'center', padding:'0 1em', color: el.base_stat < 50 ? 'red': 'green', fontWeight: 'bold'}}>{el.base_stat}</td>
                        <td style={{textAlign:'center', padding:'0 1em'}}><progress value={`${el.base_stat}`} max="100" style={{color: Number(el.base_stat) < 50 ? "red": "blue"}}></progress></td>
                      </tr>
                    
                    )))}
                  </table>
                
                </div>
              )
            }

            {
              selectedTab['evolution'] && (
                <div style={{display: 'flex', flexWrap: 'wrap', margin:'auto auto', maxWidth:'720px'}}>
                  {
                    pokemonEvo?.map(el => (
                      <div key={el.order} style={{border: '2px dotted #D8D2CB', borderRadius: '15px', margin:'1em', padding: '0.5em'}}>
                        <div style={{display:'flex', justifyContent: 'space-evenly'}}>
                          <h3>{el.order}</h3>
                          <h3>{el.name}</h3>
                        </div>
                        <img src={el.imageUrl} alt={el.name}  height="250px" width="300px"/>
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
