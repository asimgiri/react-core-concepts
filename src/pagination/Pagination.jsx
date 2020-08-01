import React, { useState, useEffect } from "react";
import PaginationComponent from "./PaginationComponent";
import Loading from "../common/Loading";

function Pagination() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    setLoading(true);
    getPost();
  }, []);

  const getPost = () => {
    fetch("https://api.github.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  };

  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) return <Loading />;

  return (
    <div className="users">
      <div className="container">
        <table className="table table-hover text-center">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Username</th>
              <th scope="col">URL</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user) => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.login}</td>
                <td>
                  <small className="text-dark">{user.url}</small>
                </td>
                <td>
                  <img src={user.avatar_url} alt="user_avatar" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <PaginationComponent
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={users.length}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default Pagination;
