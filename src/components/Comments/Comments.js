import { ListItem, List} from '@material-ui/core'
import { Divider } from '@material-ui/core'
import CommentForm from './CommentForm'
import Togglable from '../Togglable'

const Comment = ({ comment }) => (
  <div>
    <ListItem button>
      {comment}
    </ListItem>
    <Divider />
  </div>
)

const Comments = ({ blog }) => (
  <div>
    <div>
      <Togglable buttonLabel='add comment'>
        <CommentForm blog= {blog} />
      </Togglable>
    </div>
    <div>
      <h3>Comments List</h3>
      <List aria-label="secondary mailbox folders">
        {
          blog.comments.map((comment, index) =>
            <Comment key={index} comment={comment} />
          )
        }
      </List>
    </div>
  </div>
)

export default Comments