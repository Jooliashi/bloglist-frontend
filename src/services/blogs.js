import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

export const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };

  const request = await axios.get(baseUrl, config);
  return request.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token, "Content-Type": "application/json" },
  };
  const request = await axios.post(baseUrl, newObject, config);
  return request.data;
};

const update = async (newObject) => {
  const config = {
    headers: { Authorization: token, "Content-Type": "application/json" },
  };
  const request = await axios.put(
    `${baseUrl}/${newObject.id}`,
    newObject,
    config
  );
  return request.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token, "Content-Type": "application/json" },
  };
  const request = await axios.delete(`${baseUrl}/${id}`, config);
  return request.data;
};

const addComment = async (id, comment) => {
  const config = {
    headers: { Authorization: token, "Content-Type": "application/json" },
  };

  const request = await axios.post(
    `${baseUrl}/${id}/comments`,
    comment,
    config
  );
  return request.data;
};

export default { getAll, setToken, create, update, remove, addComment };
