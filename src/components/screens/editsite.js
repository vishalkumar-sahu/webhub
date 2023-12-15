import React, {useEffect, useState, useContext} from "react";
import '../../styles/home.css'
import { UserContext } from "../../App";

import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom";
import Navbar from "./navbar"

import M from 'materialize-css'

const EditSite = ()=>{

    const navigate = useNavigate()
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [contributor, setContributor] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");

    const [post, setPost] = useState(null)
    const {postId} = useParams();
    // console.log(postId)

    useEffect(()=>{
    // const getPost = ()=>{
        // loadDataOnlyOnce();
        fetch(`https://webhub-backend.onrender.com/editPost/${postId}`,{
            method : "get",
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            },

        })
        .then(res => res.json())
        .then(result =>{
            
            console.log(result.post)
            // setPost(result.post)
            // console.log(post);
            setContributor(result.post.contributor);
            // var dat/e1 = post.date;
            setDate(result.post.date.slice(0, 10));
            setDescription(result.post.description);
            setTitle(result.post.title);
            setLink(result.post.link);
            
            // date1 = date1.slice(0, 10);
            // setDate(date1);
            // date = date.substring(0, 10);
            // console.log(date)
        })
        .catch(err=>{
            console.log(err)
        })

    // }
    // getPost();

    }, []);


    const postDetails = (e)=>{
         fetch(`https://webhub-backend.onrender.com/edit/${postId}`,{
            method : "put",
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("jwt"),
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                title, 
                link,
                contributor,
                date,
                description
            })

        })
        .then(res => res.json())
        .then(data=>{
            if(data.error){
                return M.toast({html: data.error, classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html: "Post updated successfully !!!", classes:"#43a047 green darken-1"})
                navigate('/home')
                // data.preventDefault();
            }
        }).catch(err=>{
            console.log(err)
        })

        e.preventDefault();
    }

    return (
        <>
            <Navbar />
            <div className="adduppage">
                <div></div>
            <div className="addsite1">
                <form className="addupform" method="post" onSubmit={postDetails}>
                
                    <div>
                        <label className="label1">Title for site :</label><br></br>
                        <textarea name="title" cols="40" rows="1" className="input1" value={title} onChange={(e)=>setTitle(e.target.value)} required></textarea>
                    </div>
                    <div>
                        <label className="label1">Link to site :</label><br></br>
                        <textarea name="link" cols="40" rows="1" className="input1" value={link} onChange={(e) => setLink(e.target.value)} required></textarea>
                    </div>
                    <div>
                        <label className="label1">Release Date :</label><br></br>
                        <input type="date" className="input1" name="releasedate" value={date} onChange={(e) => setDate(e.target.value)}></input>
                    </div>
                    <div>
                        <label className="label1">Contributors :</label><br></br>
                        <textarea name="contributors" cols="40" rows="1" className="input1" value={contributor} onChange={(e) => setContributor(e.target.value)}></textarea>
                    </div>
                    {/* <div>
                        <label className="label1">Profile Link </label><span>(github,linkedin) :</span><br></br>
                        <textarea name="link" cols="40" rows="1" className="input1"></textarea>
                    </div> */}
                    <div>
                        <label className="label1">Short Description :</label><span>(within 20 to 25 words)</span><br></br>
                        <textarea name="description" cols="40" rows="3" className="input1" maxLength="400" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                    </div>
                    <br></br>
                    <div id="submit">
                            <input type="submit" value="Submit" id="submit1"></input>
                    </div>
                    
                </form>
            </div>
            <div></div>
            </div>
        
        </>
    );

};

export default EditSite;