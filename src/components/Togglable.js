import { Button, Fab } from '@material-ui/core'
import PropTypes from 'prop-types'

import { useVisible } from '../hooks'
const Togglable = (props) => {
  const visible = useVisible()

  return (
    <div>
      <div style={visible.hideWhenVisible}>
        <Fab aria-label="edit" variant="contained" onClick={visible.toggleVisibility}>
          {props.buttonLabel}
        </Fab>
      </div>
      <div style={visible.showWhenVisible}>
        {props.children}<Button variant='contained' color="primary" onClick={visible.toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  'buttonLabel': PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable