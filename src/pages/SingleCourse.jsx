import React, { useContext, useEffect } from 'react'
import { CorsiContext } from '../contexts/CorsiContext/CorsiContext'
import { useNavigate } from 'react-router-dom'

const SingleCourse = () => {
  const {corso} = useContext(CorsiContext) 
  const navigate = useNavigate()

  useEffect(() => {
    if(corso.title === ""){
      navigate("/courses")
    }
  })


  if(!corso){
    return(<></>)
  }

  return (
    // todo: stilizzare meglio la pagina
    <div className='container-lg'>
      <h1 className='text-center'>{corso?.title}</h1>
      <p className='text-center'>{corso?.shortDescription}</p>
      <p>{corso?.longDescription}</p>
      <p className='text-center'>Durata Corso: <b>{corso?.duration} mesi</b></p>
    </div>
  )
}

export default SingleCourse