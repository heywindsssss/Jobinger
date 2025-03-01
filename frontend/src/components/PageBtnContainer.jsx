import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAllJobsContext } from '../pages/AllJobs';

const PageBtnContainer = () => {
    const {data:{numOfPages,currentPage}}=useAllJobsContext();
    console.log(numOfPages,currentPage);
    const pages=Array.from({length:numOfPages},(_, index)=> index+1)

    const {search,pathname}=useLocation()
    const navigate=useNavigate()
    console.log(search,pathname);
    
    const handlePageChange=(pageNumber)=>{
        const searchParams=new URLSearchParams(search)
        searchParams.set('page',pageNumber)
        navigate(`${pathname}?${searchParams.toString()}`)
        // console.log(pageNumber);
    }
    const addPageButton=({pageNumber,activeClass})=>{
        return <button className={`btn page-btn ${activeClass && 'active'}`} key={pageNumber} onClick={()=>handlePageChange(pageNumber)}>{pageNumber}</button>
    }
    const renderPageButton=()=>{
        const pageButtons=[]
        pageButtons.push(addPageButton({pageNumber:1,activeClass:currentPage===1}))
        if(currentPage!==1 && currentPage!==numOfPages){
            pageButtons.push(addPageButton({pageNumber:currentPage,activeClass:true}))
        }
        pageButtons.push(addPageButton({pageNumber:numOfPages,activeClass:currentPage===numOfPages}))
        return pageButtons
    }
  return (
    <Wrapper>
        <button className="btn prev-btn" onClick={()=>{
            let prevPage=currentPage-1;
            if(prevPage<1)prevPage=numOfPages
            handlePageChange(prevPage)
        }}>
            <HiChevronDoubleLeft/>
            prev
        </button>
        <div className="btn-container">
            {renderPageButton()}
        </div>
        
        <button className="btn next-btn" onClick={()=>{
            let nextPage=currentPage+1;
            if(nextPage>numOfPages) nextPage=1
            handlePageChange(nextPage)
        }}>
            <HiChevronDoubleRight/>
            next
        </button>
        
    </Wrapper>
  )
}

export default PageBtnContainer