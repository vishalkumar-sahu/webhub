import React,{useState, useEffect, useContext} from 'react'
import '../../styles/home.css'

import { UserContext } from '../../App'
import { useNavigate, Link,useMatch,useResolvedPath } from 'react-router-dom'
import M from 'materialize-css'

import {GoLocation} from "react-icons/go"
import {AiOutlineLinkedin} from "react-icons/ai"
import {CgMail} from "react-icons/cg"
import {FiHome} from "react-icons/fi";
import {CgProfile} from "react-icons/cg"
import {MdLogout} from "react-icons/md"
<link rel="stylesheet" href="https://unicons.iconscout.com/release/v2.1.6/css/unicons.css"></link>

const Home = ()=>{

    const {state, dispatch} = useContext(UserContext)
    const navigate = useNavigate()

    // const [filteredData, setFilteredData] = useState([]);
    // const [filteredData, setFilteredData] = useState(new Set());
    const [wordEntered, setWordEntered] = useState("");
    const [data, setData] = useState([]);

    const [refreshData, setRefreshData] = useState([]);

    useEffect(()=>{
            
        fetch('/allpost', {
            headers:{
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=> res.json())
        .then(result =>{
            console.log(result)
            setData(result.posts)
            setRefreshData(result.posts);
        })

    }, []);

    var searchWord  = "";
    const handleFilter = (event) => {

        searchWord = event.target.value;
        console.log(searchWord);
        setWordEntered(searchWord);

        console.log(data);

        const filtered = data.filter((value) => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase()) || value.contributor.toLowerCase().includes(searchWord.toLowerCase()) || value.link.toLowerCase().includes(searchWord.toLowerCase()) || value.description.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {

            setRefreshData(data);
            // setFilteredData([]);
        } else {
        // setFilteredData(filtered => [...titleFilter, ...contributorFilter, ...linkFilter, ...desFilter]);
        
            // setFilteredData(filtered)
            // setData(filtered)
            setRefreshData(filtered)
            console.log(filtered)
        }

    };

    const logoutUser = ()=>{
        localStorage.clear()
        dispatch({type:"CLEAR"})
        M.toast({html: "Successfully logout !!", classes:"#43a047 green darken-1"})
        navigate('/')
    }

    return(
        <>
                <div>
                <div>
                <nav className="nav">
                    <div>
                        {/* <img src="photography(1).png" alt="profile photo" className="profileimg"></img> */}
                        <Link to="/home" className="site-title">Webhub</Link>
                    </div>

                    <div className="searchbar1">
                    {/* <input type="text" placeholder="Search..." id="searchbar"/> */}
                        <div className="searchInputs">
                            <input
                            type="text"
                            placeholder="Search Here ..."
                            value={wordEntered}
                            onChange={handleFilter}
                            />
                        </div>
                    </div>
                    <div>
                    <ul>

                        <CustomLLink to="/home"><FiHome /></CustomLLink>
                        
                        <CustomLLink to="/profile" className = "icon1"><CgProfile /></CustomLLink>
                        {/* <CustomLLink to="/signup" className onClick={()=>logoutUser()}></CustomLLink> */}
                        <button onClick={()=>logoutUser()}><MdLogout /></button>
                    </ul>
                    </div>
                </nav>
                </div>
                {/* <Navbar /> */}
                <div className="homepage">
                <div></div>
                {/* <h1>Home</h1> */}
                <div className="homemain">
                    <h3>All available links</h3>
                    
                        {
                            // searchWord == null ? 
                            
                            // data.map(item =>{
                            //     // console.log(item)
                            //     return(
                            //         <>  
                            //             <div className="linkcontaint">
                            //             <a href={item.link} target="_blank" className="mainlink" rel="noreferrer noopener">{item.title}</a><br></br>
                            //             <span><a href={item.link} target="_balnk" className="link" rel="noreferrer noopener">{item.link}</a></span><br></br>
                            //             <span className="date">Release Date : {item.date}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            //             <span className="contributedby">Contributed By : {item.contributor}</span><br></br>
                            //             <span>{item.description}</span>
                            //             </div>
                                       
                            //         </>
                            //     )
                            // })

                            // :

                            refreshData.map(item =>{
                                // console.log(item)
                                return(
                                    <>  
                                        <div className="linkcontaint">
                                        <a href={item.link} target="_blank" className="mainlink" rel="noreferrer noopener">{item.title}</a>
                                        <span style={{marginLeft : '100px'}} >By - <Link to={item.postedBy ? item.postedBy._id != state._id ? "/profile/" + item.postedBy._id : "/profile" : "loading..."}>{item.postedBy ? item.postedBy.username : "loading..."}</Link></span><br></br>
                                        <span><a href={item.link} target="_balnk" className="link" rel="noreferrer noopener">{item.link}</a></span><br></br>
                                        <span className="date">Release Date : {item.date}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <span className="contributedby">Contributed By : {item.contributor}</span><br></br>
                                        <span>{item.description}</span>
                                        </div>
                                       
                                    </>
                                )
                            })

                        }    

                </div>
                <div></div>
                </div>
                <footer className="footerh">
                    
                    <div className="left">
                        
                        <h3>About</h3>
                        <p>Web development refers to the building, creating, and maintaining of websites. It includes aspects such as web design, web publishing, web programming, and database management. It is the creation of an application that works over the internet i.e. websites. The word Web Development is made up of two words, that is:</p>
                        <p>&copy;webhub</p>
                    </div>
                    <div className="right">
                        <h3>Contact Us</h3>
                        <div>
                            <span>Webhub Services</span><br></br>
                            <span>Rajlabdhi Heritage</span><br></br>
                            <span>Koba-Ambapur approach</span><br></br>
                            <span>Gandinagar</span>&nbsp;&nbsp;
                            <span><a href="https://goo.gl/maps/BnyE8YSgdGStrzUr8" target="_blank" className="footerlink" rel="noreferrer noopener"><GoLocation /></a></span>&nbsp;&nbsp;&nbsp;<br />
                            <span><a href="https://www.linkedin.com" className="footerlink" rel="noreferrer noopener" target="_blank"><AiOutlineLinkedin /></a></span>&nbsp;&nbsp;&nbsp;
                            <span><a href="https://www.linkedin.com" className="footerlink" rel="noreferrer noopener" target="_blank"><CgMail /></a></span>&nbsp;&nbsp;&nbsp;
                        </div>
                    </div>
                </footer>

            </div>
        </>
    )
}

function CustomLLink({to,children, ...props}){
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path : resolvedPath.pathname, end :true})
    return(
        <li className={isActive ? "active" :""}>
            <Link to ={to} {...props}>
                {children}
            </Link>
        </li>    
    )
}

export default Home