import { Link } from "react-router-dom";
import { Toolbar, AppBar, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { setUser, logout } from "./reducers/userReducer";

const Menu = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    logout();
    dispatch(setUser(null));
  };

  const logoutLink = () => {
    if (user) {
      return (
        <Button color="inherit" onClick={handleLogout}>
          logout
        </Button>
      );
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        {logoutLink()}
      </Toolbar>
    </AppBar>
  );
};

export default Menu;
