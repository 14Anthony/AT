import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { AdminSideBar, UserSideBar } from "../console_data/data";
import "./style.css";



function Resource({ match }) {
  
  const topic = AdminSideBar.find(({ id }) => id === match.params.topicId);
  return (
    <div>
      {topic &&(
      <topic.main />
      )}
    </div>
  );
}

const Console = () => {
  let { path } = useRouteMatch();
  // const [consoleObject, setconsoleObject] = useState({option: ""});
  return (
    // <div id="page-content-wrapper">
    <Container>
      <Route path={`${path}/:topicId`} component={Resource} />
    </Container>
    // </div>
  );
};

export default Console;
