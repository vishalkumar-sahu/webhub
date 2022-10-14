import React from 'react'

const Pagination = ({ postsPerPage, totalposts, paginate, currentPage }) => {
    const pageNumbers = [];
    // console.log(totalposts);
    // console.log(postsPerPage);
    for(let i = 1; i <= Math.ceil(totalposts / postsPerPage); i++){
        pageNumbers.push(i);
    }

    // console.log(pageNumbers);

  return (
      
    <>
        <div className='pagenumber'  style={{textAlign:'center'}}>
            <span><a className='pageno' onClick={() =>paginate(currentPage - 1)}>&nbsp;&nbsp;Previous&nbsp;&nbsp;</a></span>
            {pageNumbers.map(number =>(
                <span>
                
                <span key={number}>
                    <a className='pageno' onClick={() =>paginate(number)}>&nbsp;&nbsp;{number}&nbsp;&nbsp;</a>
                </span>
                
                </span>
            ))}
            <span><a className='pageno'  onClick={() =>paginate(currentPage + 1)}>&nbsp;&nbsp;Next&nbsp;&nbsp;</a></span>

        </div>
    
    </>
  )
}

export default Pagination