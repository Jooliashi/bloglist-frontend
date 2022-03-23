import { Button, List, ListItem } from '@material-ui/core'
import { Link } from "react-router-dom"
import { useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';
import Divider from '@material-ui/core/Divider'

import { notify } from '../../reducers/notificationReducer';
import { updateLike, deleteBlog } from '../../reducers/blogReducer'
import Comments from '../Comments/Comments'

export const Blog = ({ blog }) => (
  <div>
    <ListItem button component={Link} to={`/blogs/${blog.id}`}>
      {blog.title} by {blog.author}
    </ListItem>
    <Divider />
  </div>
)

export const BlogDetail = ({ blog }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let dom = null
  if (blog) {
    const handleLike = async (blog) => {
      const newBlog = {...blog, likes: blog.likes + 1}
      try {
        dispatch(updateLike(newBlog))
        dispatch(notify(`blog ${newBlog.title} updated`))
      } catch {
        dispatch(notify('failed to update'))
      }
    }

    const handleDelete = async (blog) => {
      try {
        dispatch(deleteBlog(blog.id))
        dispatch(notify(`blog is deleted`))
        navigate('/')
      } catch {
        dispatch(notify('failed to delete'))
      }
    }

    dom = (
      <div>
        <List>
          <h2>{blog.title}</h2>
          <ListItem button>{blog.url}</ListItem>
          <Divider />
          <ListItem button>
            {blog.likes} <Button variant="contained" onClick={() => handleLike(blog)}>like</Button>
          </ListItem>
          <Divider />
          <ListItem button>added by {blog.author}</ListItem>
          <Divider />
          <Button variant="contained" onClick={() => handleDelete(blog)}>delete</Button>
          <Divider />
        </List>

        <div>
          <h2>Comments</h2>
          <Comments blog={blog} />
        </div>
      </div>
    )
  }
  return dom
}