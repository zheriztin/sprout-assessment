import React from 'react'
import {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
import {fetchData} from "../store/actionCreator/index"

export const Home = () => {
  const dispatch = useDispatch()
  const data = useSelector(state => state.data)
  console.log(data, ">>>>>>>>>>.ini data di home");
  useEffect(() => {
    dispatch(fetchData())
  }, [])
  

  return (
    <div>
      <div>POKEDEX</div>
      {data?.map((pokemon) => {
        return (
          <Link to={`/${pokemon.id}`} key={pokemon.url}>
            <div className="card mb-3" style={{maxWidth :  540}} >
              <div className="row g-0">
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{pokemon.name}</h5>
                    {pokemon.types.map ((element, index) => (
                      <p className="card-text" key={index}>{element.type.name}</p>
                    ))}
                  </div>
                </div>
                <div className="col-md-4"> 
                  <img className="img-fluid rounded-start" src= {pokemon.imageUrl} /> 
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
