// ** React Imports
import { useState, Fragment, useEffect } from "react";

// ** Helper
import renderInitial from "../../../helpers/renderInitial";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Button,
  Badge,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader,
} from "reactstrap";

// ** Third Party Components
import Swal from "sweetalert2";
import Select from "react-select";
import { Check, Briefcase, X, User, GitPullRequest } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import SidebarNewUsers from "../Component/SidebarNewUsers";

const roleColors = {
  editor: "light-info",
  admin: "light-danger",
  author: "light-warning",
  maintainer: "light-success",
  subscriber: "light-primary",
};

const MySwal = withReactContent(Swal);
const upperFirstLetter = (sentence) => {
  const words = sentence.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return words.join(" ");
};

const UserInfoCard = ({ selectedUser, loadData, dispatch }) => {
  // ** State
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});
  const [isEdit, setIsEdit] = useState(true);

  useEffect(() => {
    setDefaultValues({
      userId: selectedUser?.userId,
      fullname: selectedUser?.fullname,
      email: selectedUser?.email,
      phoneNumber: selectedUser?.phoneNumber,
      companyId: {
        label: selectedUser?.companyName,
        value: selectedUser?.companyId,
      },
      role: {
        label: upperFirstLetter(selectedUser?.role),
        value: selectedUser?.role,
      },
    });
  }, [selectedUser]);

  // toggle
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // ** render user img
  const renderUserImg = () => {
    return (
      <Avatar
        // initials
        color={selectedUser?.avatarColor || "light-primary"}
        className="rounded mt-3 mb-2"
        content={renderInitial(selectedUser?.fullname)}
        contentStyles={{
          borderRadius: 0,
          fontSize: "calc(48px)",
          width: "100%",
          height: "100%",
        }}
        style={{
          height: "110px",
          width: "110px",
        }}
      />
    );
  };

  const doDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        confirmButton: "me-1",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: "user/delete",
          payload: { id: selectedUser.userId },
          callback: (res) => {
            return MySwal.fire({
              icon: "success",
              title: "Success",
            }).then(() => {
              setShow(false);
              navigate("/user");
            });
          },
        });
      }
    });
  };

  useEffect(() => {
    function handleBeforeUnload() {
      console.log("hehe");
      dispatch({
        type: "user/set_state",
        payload: {
          userDetail: {},
        },
      });
    }

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderUserImg()}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>
                    {selectedUser !== null
                      ? selectedUser.fullname
                      : "Eleanor Aguilar"}
                  </h4>
                  {selectedUser !== null ? (
                    <Badge
                      color={roleColors[selectedUser.role]}
                      className="text-capitalize"
                    >
                      {selectedUser.role}
                    </Badge>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <GitPullRequest className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{selectedUser.totalInventory}</h4>
                <small>Inventory's</small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">Details</h4>
          <div className="info-container">
            {selectedUser !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">Fullname:</span>
                  <span>{selectedUser.fullname}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Username:</span>
                  <span>{selectedUser.username}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Email:</span>
                  <span>{selectedUser.email}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Phone Number:</span>
                  <span>{selectedUser?.phoneNumber ?? "-"}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Role:</span>
                  <span>{selectedUser?.role ?? "-"}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Created At:</span>
                  <span>
                    {moment(selectedUser?.createdAt).format("lll") ?? "-"}
                  </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Last Updated:</span>
                  <span>
                    {moment(selectedUser?.updatedAt).format("lll") ?? "-"}
                  </span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={toggleSidebar}>
              Modify
            </Button>
            <Button className="ms-1" color="danger" outline onClick={doDelete}>
              Delete
            </Button>
          </div>
        </CardBody>
      </Card>
      <SidebarNewUsers
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        loadData={loadData}
        resetFormWhenClose={false}
        defaultValues={defaultValues}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
    </Fragment>
  );
};

export default UserInfoCard;
