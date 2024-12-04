//rafce 
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRecipes } from '../redux/slices/productSlice'

const Home = () => {
  const dispatch = useDispatch()
  const {allRecipes,loading,errorMsg} = useSelector(state=>state.productReducer)
  const [currentPage,setCurrentPage] = useState(1)
  const productsPerPage = 8
  const totalPages = Math.ceil(allRecipes?.length/productsPerPage)
  const currentPageProductLastIndex = currentPage * productsPerPage
  const currentPageProductFirstIndex = currentPageProductLastIndex - productsPerPage
  const visibleAllProducts = allRecipes?.slice(currentPageProductFirstIndex,currentPageProductLastIndex)

  useEffect(()=>{
    dispatch(fetchRecipes())
  },[])

  const navigateToNextPage =()=>{
    if(currentPage!=totalPages){
      setCurrentPage(currentPage+1)
    }
  } 
  
  const navigateToPreviousPage =()=>{
    if(currentPage!=1){
      setCurrentPage(currentPage-1)
    }
  }

  const handleImageClick = (recipes) => {
    const query = encodeURIComponent(recipes + " recipes"); 
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
  };

  return (
    <>
    <Header insideHome={true}/>
    <div style={{paddingTop:'100px'}} className='container px-4 mx-auto '>
    {
      loading?
      <div className='flex justify-center items-center my-5 text-lg'>
         <img width={"70px"} height={"70px"} src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="" />
      </div>
      :
      <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">{

        allRecipes?.length>0 ?
        visibleAllProducts?.map(recipes=>(

        <div key={recipes?.id} className="rounded border p-2 shadow">
          <img width={"100%"} height={"200px"} src={recipes?.image} onClick={() => handleImageClick(recipes.name)} alt={recipes.name} />
          <div className="text-center">
            <h3 className="text-xl font-bold">{recipes?.name}</h3>
            <Link to={`/${recipes?.id}/view`} className='bg-yellow-600 rounded p-1 mt-3 text-white inline-block'>View More</Link>
          </div>
        </div>
        ))
        :
        <div className='flext jusify-center items-center font-bold text-red-600 my-5 text-lg'>
        Recipes not found
      </div>
      }
      </div>
      </>
}
    </div>
    <div className="text-2xl text-center font-bold mt-20">
        <span onClick={navigateToPreviousPage} className="cursor-pointer"><i className="fa-solid fa-backward me-5"></i></span>
        <span> {currentPage} of {totalPages} </span>
        <span onClick={navigateToNextPage} className="cursor-pointer"><i className="fa-solid fa-forward ms-5"></i></span>
    </div>
    </>
  )
}

export default Home