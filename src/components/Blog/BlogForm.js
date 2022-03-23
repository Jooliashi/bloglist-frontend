import { TextField, Button } from '@material-ui/core'
import { createBlog } from '../../reducers/blogReducer'
import { initializeUsers } from '../../reducers/usersReducer'
import { useDispatch } from 'react-redux'
import { notify } from '../../reducers/notificationReducer'
import { useField } from '../../hooks'

const BlogForm = () => {
  const dispatch = useDispatch()
  const title = useField('text', 'title')
  const author = useField('text', 'author')
  const url = useField('text', 'url')
  const form = document.getElementById('login-form')
  const addBlog = (event, title, author, url) => {
    event.preventDefault()
    dispatch(createBlog({ title: title.value, author: author.value, url: url.value }))
    dispatch(notify(`a new blog ${title.value} by ${author.value}`))
    title.zero()
    author.zero()
    url.zero()
    dispatch(initializeUsers())
  }

  return (
    <div>
      <h3>create new</h3>
      <form id='login-form' onSubmit={event => addBlog(event, title, author, url)} >
        <div><TextField {...title} /></div>
        <div><TextField {...author} /></div>  
        <div><TextField {...url} /></div>
        <Button variant="contained" color="primary" type="submit">create</Button>
      </form>
    </div>
  )
}

export default BlogForm