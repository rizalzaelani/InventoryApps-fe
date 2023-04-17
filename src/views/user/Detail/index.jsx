import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Alert, Col, Row } from "reactstrap";
import UserInfoCard from "./UserInfoCard";
import UserTabs from "./UserTabs";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";

const _UserDetail = ({ dispatch, userDetail }) => {
  const { id } = useParams();

  useEffect(() => {
    return () => {
      // dispatch({
      //   type: "user/set_state",
      //   payload: { rawData: {} },
      // });
    };
  }, []);
  const loadData = () => {
    dispatch({
      type: "user/get_by_id",
      payload: id,
    });
  };
  useEffect(() => {
    setTimeout(() => {
      loadData();
    }, 100);
  }, [id]);

  const [active, setActive] = useState("1");

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return userDetail !== null && userDetail !== undefined ? (
    <React.Fragment>
      <Breadcrumbs
        title="User Details"
        data={[
          { title: "Master Data" },
          { title: "User's List", link: "/user" },
          { title: "Details" },
        ]}
      />
      <p className="mb-2">
        This page contains specific information about the user such as user
        details, currently held inventory, transaction history, and handover
        history.
      </p>
      <div className="app-user-view">
        <Row>
          <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
            <UserInfoCard
              selectedUser={userDetail}
              loadData={loadData}
              dispatch={dispatch}
            />
          </Col>
          <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
            <UserTabs active={active} toggleTab={toggleTab} userId={id} />
          </Col>
        </Row>
      </div>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Breadcrumbs
        title="User Details"
        data={[
          { title: "Master Data" },
          { title: "User's List", link: "/user" },
          { title: "Details" },
        ]}
      />
      <Alert color="danger">
        <h4 className="alert-heading">User not found</h4>
        <div className="alert-body">
          User with id: {id} doesn't exist. Check list of all User's:{" "}
          <Link to="user">User's List</Link>
        </div>
      </Alert>
    </React.Fragment>
  );
};

const mapStateToProps = ({ reducerUser }) => {
  return { userDetail: reducerUser.rawData };
};

const UserDetail = connect(mapStateToProps)(_UserDetail);

export default UserDetail;
