import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from '../../http/axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts',async ()=> {
    const {data} = await axios.get('/posts')
    return data
})

export const fetchDeletePost = createAsyncThunk('posts/fetchDeletePost',async (id)=> {
    const {data} = await axios.delete(`/posts/${id}`)
    return data
})
const initialState = {
    posts: {
        items:[],
        status:'loading'
    },
    tags: {
        items:[],
        status:'loading'
    }
    
}
const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{},
    extraReducers:{
        // get posts
        [fetchPosts.pending]:(state)=>{
            state.posts.items = []
            state.posts.status='loading'
        },
        [fetchPosts.fulfilled]:(state,action)=>{
            state.posts.items = action.payload
            state.posts.status='loaded'
        },
        [fetchPosts.rejected]:(state)=>{
            state.posts.items = []
            state.posts.status='error'
        },
        // delete posts
        [fetchDeletePost.pending]:(state, action)=>{
            state.posts.items = state.posts.items.filter(object=>object._id!== action.meta.arg)
            
        },
        

        
    }
});

export const postsReducer= postsSlice.reducer;