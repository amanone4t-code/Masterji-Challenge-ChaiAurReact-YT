import React from 'react'
import { useParams } from 'react-router'
function User() {
    const {id} = useParams()
  return (
    <div className='bg-gray-600 text-3xl text-white flex justify-center'>User: {id}</div>
  )
}

export default User