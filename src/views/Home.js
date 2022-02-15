import React from 'react'
import {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
import {fetchData} from "../store/actionCreator/index"

export const Home = () => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.data)
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
  useEffect(() => {
    dispatch(fetchData())
  }, [])
  

  return (
    <div style={{display:"flex", justifyContent:"center", flexDirection: "column", margin:"10px"}}>
      <div style={{fontWeight:"bold"}}>POKEDEX</div>
      <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"center"}}>
      {data?.map((pokemon) => {
        return (
            <div className="card mb-3" style={{maxWidth :  540, margin: '10px', backgroundColor: color[pokemon.types[0].type.name], borderRadius:'20px', cursor: 'pointer'}}>
              <div className="row g-0"  onClick={()=> window.open(`/${pokemon.id}`)} >
                <div className="col-md-8">
                  <div className="card-body" style={{marginTop: 30, textAlign:"-webkit-center"}}>
                    <h5 className="card-title">{pokemon.name}</h5>
                    {pokemon.types.map ((element, index) => (
                      <p className="card-text" key={index} style={{backgroundColor:"white", opacity:0.5, fontWeight:"bold", borderRadius:"15px", width:"fit-content", padding:"0.5em", justifyContent:"center",alignItems:"center"}}>{element.type.name}</p>
                    ))}
                  </div>
                </div>
                <div className="col-md-4" style={{marginBottom: 20}}> 
                  <img className="img-fluid rounded-start" src= {pokemon.imageUrl}  /> 
                </div>
              </div>
            </div>
        )
      })}
      </div>
      
    </div>
  )
}
