import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWhishlist } from '../redux/slices/wishListSlice';

// Function to display stars based on rating
const StarRating = ({ rating }) => {
  const maxStars = 5;
  const filledStars = Math.round(rating);

  return (
    <div className="flex space-x-1">
      {Array.from({ length: maxStars }, (_, index) => (
        <span key={index} className="text-yellow-500 text-2xl">
          {index < filledStars ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
};

// Recipe Instructions Component
const RecipeInstructions = ({ instructions }) => (
  <div>
    <h1 className="text-3xl font-bold text-red-600 text-center mb-5">
      INSTRUCTIONS
    </h1>
    <div className="space-y-4">
      {instructions.map((step, index) => (
        <div
          key={index}
          className="relative bg-gradient-to-r from-yellow-100 to-yellow-300 p-5 rounded-lg shadow-md"
        >
          <div className="absolute top-2 left-2 bg-yellow-500 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold text-lg">
            {index + 1}
          </div>
          <div className="pl-12">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Step {index + 1}
            </h3>
            <p className="text-gray-700">{step}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const RecipeImages = ({ images }) => (
  <div className="grid grid-cols-2 gap-4">
    {images.map((img, idx) => (
      <img
        key={idx}
        className="w-full h-48 object-cover rounded-lg"
        src={img}
        alt={`Recipe Image ${idx + 1}`}
      />
    ))}
  </div>
);

const View = () => {
  const dispatch = useDispatch();
  const userWishlist = useSelector((state) => state.wishlistReducer);
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const allRecipes = JSON.parse(sessionStorage.getItem('allRecipes') || '[]');
    setRecipe(allRecipes.find((item) => item.id == id));
  }, [id]);

  const handleWishlist = () => {
    const existingProduct = userWishlist?.find((item) => item?.id == id);
    if (existingProduct) {
      alert('Recipe already in your Favourites!!!');
    } else {
      alert('Recipe Added to your Favourites');
      dispatch(addToWhishlist(recipe));
    }
  };

  const handleImageClick = (recipeName) => {
    const query = encodeURIComponent(recipeName + ' recipe');
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
  };

  const formattedInstructions = Array.isArray(recipe?.instructions)
    ? recipe.instructions
    : [];

  return (
    <>
      <Header />
      <div className="flex flex-col mx-5">
        <div className="flex flex-col justify-center items-center">
          <img
            className="mt-20 cursor-pointer"
            width={'300px'}
            height={'200px'}
            src={recipe?.image}
            onClick={() => handleImageClick(recipe.name)}
            alt={recipe.name}
          />
          <h1 className="text-4xl font-bold text-red-600 mb-5">{recipe?.name}</h1>

          {/* Star Rating Component */}
          <StarRating rating={recipe?.rating || 0} />

          <h3 className="text-red-600 text-2xl font-bold mt-2">
            Rating: {recipe?.rating}
          </h3>
          <p className="text-md">Cuisine: {recipe?.cuisine}</p>
          <p className="text-md">Category: {recipe?.mealType}</p>
        </div>

        <div className="flex justify-around mt-5">
          <button
            onClick={handleWishlist}
            className="bg-yellow-600 text-white text-lg rounded p-2"
          >
            ADD TO FAVOURITES
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center bg-gray-100 p-5 rounded-lg shadow-md mt-5">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold text-gray-700">Prep Time</h3>
            <p className="text-gray-600">{recipe?.prepTimeMinutes} mins</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold text-gray-700">Cook Time</h3>
            <p className="text-gray-600">{recipe?.cookTimeMinutes} mins</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold text-gray-700">Servings</h3>
            <p className="text-gray-600">{recipe?.servings}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold text-gray-700">Difficulty</h3>
            <p
              className={`text-gray-600 font-semibold ${
                recipe?.difficulty === 'Easy'
                  ? 'text-green-500'
                  : recipe?.difficulty === 'Medium'
                  ? 'text-yellow-500'
                  : 'text-red-500'
              }`}
            >
              {recipe?.difficulty}
            </p>
          </div>
        </div>

        {/* Centering Recipe Instructions */}
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <RecipeInstructions instructions={formattedInstructions} />
        </div>

        <div className="mt-5">
          <RecipeImages images={recipe?.images || []} />
        </div>
      </div>
    </>
  );
};

export default View;
