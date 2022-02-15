import React from 'react'
import {useParams} from "react-router-dom"
import {useEffect}from "react"
import {useDispatch, useSelector} from "react-redux"
import {fetchDataById} from "../store/actionCreator/index"
import './detail.css'

export const Detail = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const pokemon = useSelector(state => state.dataById)

  useEffect(()=> {
    if (!id) return
    dispatch(fetchDataById(id))

  },[])

  return (
    <div>
      <h5 className="card-title">{pokemon.name}</h5>
      <div>
        { id.length == 1? <h5 className="card-title">00{id}</h5> :<h5 className="card-title">0{id}</h5>}
      </div>
      <img className="img-fluid rounded-start" src= {pokemon.imageUrl} /> 
      {
        pokemon.length && pokemon.types?.map ((element, index) => ((
          <p className="card-text" key={index}>{element.type.name}</p>
        )))
      }
        <div id="exTab3" className="container"> 
          <ul  className="nav nav-pills">
          <li className="active">
            <a  href="#1b" data-toggle="tab">About</a>
          </li>
          <li><a href="#2b" data-toggle="tab">Base Stats</a>
          </li>
          <li><a href="#3b" data-toggle="tab">Evolution</a>
          </li>
          <li><a href="#4a" data-toggle="tab">Moves</a>
          </li>
        </ul>

        <div className="tab-content clearfix">
          <div className="tab-pane active" id="1b">
            <h3>Species: {pokemon.species} </h3>
            <h3>Height: {pokemon.height}</h3>
            <h3>Weight: {pokemon.weight}</h3>
            <h3>Abilities: {pokemon.abilities}</h3>
          </div>
          <div className="tab-pane" id="2b">
            <h3>Hp: {pokemon.species} </h3>
            <h3>Attack: {pokemon.height}</h3>
            <h3>Defense: {pokemon.weight}</h3>
            <h3>sp. Atk: {pokemon.abilities}</h3>
            <h3>sp. Def: {pokemon.abilities}</h3>
          </div>
        </div>
      </div>
    </div>

  )
}
