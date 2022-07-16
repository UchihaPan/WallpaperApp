import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'
const clientID = `?client_id=zcNDURmpu0GeliDfYxcHshCkKeC7M1IO8AEM5awDyIw`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

const apikeyd ='https://api.unsplash.com/photos/?client_id=zcNDURmpu0GeliDfYxcHshCkKeC7M1IO8AEM5awDyIw'

const apikey='zcNDURmpu0GeliDfYxcHshCkKeC7M1IO8AEM5awDyIw'


function App() {
  const [loading,setloading]=useState(false)
  const [photos,setphotos]=useState([])

  const fetchimages= async ()=>{
    setloading(true)
    let url
    url=`${mainUrl}${clientID}`
    try {

      const response=await fetch(url)
      const data=await response.json()
      console.log(data)

      
    } catch (error) {
      setloading(false)
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchimages()
  },[])
  return <h2>stock photos starter</h2>
}

export default App
