import React,{useState, useEffect, useContext} from 'react'
import '../../styles/home.css'

import { UserContext } from '../../App'
import { useNavigate } from 'react-router-dom'
import M from 'materialize-css'

import { Link } from 'react-router-dom'


const Home = ()=>{
    const {state, dispatch} = useContext(UserContext)
    const navigate = useNavigate()


    return(
        <>
            <h1>Welcome to Home</h1>
        </>
    )
}

export default Home