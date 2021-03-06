import React, { useEffect, useState } from "react";
import "./Users.scss";
import { getUsersActive } from "../../../API/user";
import { getAccessToken } from "../../../API/auth";
import ListUsers from "../../../components/Admin/Users/ListUsers";

export default function Users() {
  const [usersActive, setUsersActive] = useState([]);
  const [usersInactive, setUsersInactive] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(false);
  const accessToken = getAccessToken();

  useEffect(() => {
    getUsersActive(accessToken, true).then((response) => {
      setUsersActive(response.users);
    });
    getUsersActive(accessToken, false).then((response) => {
      setUsersInactive(response.users);
    });
    setReloadUsers(false);
  }, [accessToken, reloadUsers]);

  return (
    <div>
      <ListUsers
        usersActive={usersActive}
        usersInactive={usersInactive}
        setReloadUsers={setReloadUsers}
      />
    </div>
  );
}
