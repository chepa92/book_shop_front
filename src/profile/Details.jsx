import React from "react";
import { Link } from "react-router-dom";

import { accountService } from "../_services";

function Details({ match }) {
  const { path } = match;
  const user = accountService.userValue;

  return (
    <div>
      <h1>My Profile</h1>
      <p>
        <strong>Admin: </strong> {user.admin ? "true" : "false"}
        <br />
        <strong>Email: </strong> {user.email}
      </p>
      <p>
        <Link to={`${path}/update`}>Update Profile</Link>
      </p>
    </div>
  );
}

export { Details };
