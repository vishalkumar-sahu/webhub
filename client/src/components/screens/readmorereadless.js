import { useState } from "react";

const ReadMoreReadLess = ({children})=>{
    const text = children;

    const[isReadMoreShown, setReadMoreShown] =
    useState(false)
    
    const toggleBtn= () =>{
        setReadMoreShown(prevState => !prevState)
    }
    return(
        <div className="read-more-read-less">
               {isReadMoreShown  ? text : text.substr(0,200)}
               <button className="button3" onClick={toggleBtn}>{isReadMoreShown ? 
               'Read Less' : '...Read More'}</button>
        </div>
    )

}

export default ReadMoreReadLess;