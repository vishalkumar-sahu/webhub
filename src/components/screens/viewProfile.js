import React, {useEffect, useState, useContext} from "react";
import '../../styles/home.css'
import { UserContext } from "../../App";

import { useNavigate, Link } from 'react-router-dom'
import { useParams } from "react-router-dom";
import Navbar from "./navbar"

const ViewProfile = ()=>{

    const navigate = useNavigate()
    const path = window.location.pathname

    const {state, dispatch} = useContext(UserContext)

    const [userProfile, setProfile] = useState(null)
    
    const {userid} = useParams()


    useEffect(()=>{

        fetch(`http://localhost:5000/user/${userid}`,{
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            },

        })
        .then(res => res.json())
        .then(result =>{
            console.log(result)
            setProfile(result)
        })

    }, []);

    return (
        <>
            <div>
                <Navbar />
            <div className="profilepage">
                <div></div>
            
        {userProfile ? 
            <>
            <div className="profile">
                <div className="temp">
                    <h3>{userProfile.user.username}</h3>
                </div>
                <div className="temp">
                    {
                        <div className="profile-image">

                            <img className="profileimg" src={userProfile.user.pic} id="profile_pic" alt="" />

                        </div>
                    }
                    <br></br>
                </div>
                
                <div className="temp">
                    <p>{userProfile.user.name}</p>
                    <p>{userProfile.user.email}</p>
                    {/* <p>1234567890</p> */}

                </div>
                
                <div className="contributions">
                    <span id="contribution">Contribution</span><span>({userProfile.posts.length})</span>
                    <ul>
                        {
                            userProfile.posts.map(item =>{
                                return(
                                    <>
                                        <li><a href={item.link} target="_blank" className="mainlink1">{item.title}</a><span className="date">-{item.date}</span><br></br>
                                        <span>Contributors : {state ? state.name : "loading..." } & {item.contributor}</span></li>
                                    </>
                                )
                            })
                        }
                        
                    </ul>
                </div>
                
            
                </div>
            <div></div>
            </>
            
            : "loading..."
            
        }
            </div>
            </div>
        
        </>
    );

};

export default ViewProfile;