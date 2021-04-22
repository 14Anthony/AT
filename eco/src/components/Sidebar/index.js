import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { AdminSideBar, UserSideBar } from "../console_data/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Button } from "react-bootstrap";
import "./style.css";
// console.log(AdminSideBar);


const Sidebar = () => {
  let { url } = useRouteMatch();

  return (
    // <!-- Sidebar -->
    <div id="sidebar-wrapper">
      
      <div className="list-group list-group-flush">
        {AdminSideBar.map(({ name, id, icon, order }) => (
          <Link
            id={order}
            key={id}
            to={`${url}/${id}`}
            className="list-group-item list-group-item-action text-light bg-dark mb-3"
          >
            <span className="mr-3">{name}</span>
            <FontAwesomeIcon className="float-right" icon={icon} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
