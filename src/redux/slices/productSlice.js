import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

//action return promise
export const fetchRecipes = createAsyncThunk("recipes/fetchRecipes", async()=>{
  const result = await axios.get("https://dummyjson.com/recipes")
  // console.log(result.data.products);
  sessionStorage.setItem("allRecipes",JSON.stringify(result.data.recipes))
  return result.data.recipes
})

const productSlice = createSlice({
  name :'recipes',
    initialState:{
        allRecipes:[],
        dummyAllProduct:[],
        loading:false,
        errorMsg:""
    },
    reducers:{
        searchProduct: (state,actionByHeader)=>{
            state.allRecipes = state.dummyAllProduct.filter(item=>item.cuisine.toLowerCase().includes(actionByHeader.payload))
        }

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchRecipes.fulfilled,(state,apiResult)=>{
            state.allRecipes = apiResult.payload
            state.dummyAllProduct = apiResult.payload
            state.loading = false
            state.errorMsg = ""
        })
        builder.addCase(fetchRecipes.pending,(state)=>{
            state.allRecipes = []
            state.dummyAllProduct = []
            state.loading = true
            state.errorMsg = ""
        })
        builder.addCase(fetchRecipes.rejected,(state)=>{
            state.allRecipes = []
            state.dummyAllProduct = []
            state.loading = false
            state.errorMsg = "API Call failed"
        })
    }
})

export const {searchProduct} = productSlice.actions
export default productSlice.reducer