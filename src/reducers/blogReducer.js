import service from '../services/blogs'
import { createSlice } from '@reduxjs/toolkit'

const compareLikes = (a, b) => {
  return a.likes - b.likes;
};

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
      return state.sort(compareLikes)
    },
    updateBlog(state, action) {
      return state.map(blog => 
        blog.id !== action.payload.id ? blog: action.payload
      ).sort(compareLikes)
    },
    removeBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload).sort(compareLikes)
    },
    setBlogs(state, action) {
      return action.payload.sort(compareLikes)
    }
  }
})
export const { appendBlog, updateBlog, removeBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const data = await service.getAll()
    dispatch(setBlogs(data))
  }
}
export const createBlog = content => {
  return async dispatch => {
    const newBlog = await service.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const updateLike = newObj => {
  return async dispatch => {
    const newBlog = await service.update(newObj)
    dispatch(updateBlog(newObj))
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await service.remove(id)
    dispatch(removeBlog(id))
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    const data = await service.addComment(id, comment)
    dispatch(updateBlog(data))
  }
}
export default blogSlice.reducer