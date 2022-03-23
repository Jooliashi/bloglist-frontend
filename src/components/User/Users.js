import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { User } from "./User";

const Users = () => {
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.user);

  let dom = null;

  if (user) {
    dom = (
      <div>
        <h2>Users</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>username</TableCell>
              <TableCell>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <User key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return dom;
};

export default Users;
