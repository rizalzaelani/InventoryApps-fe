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

const roleColors = {
  editor: "light-info",
  admin: "light-danger",
  author: "light-warning",
  maintainer: "light-success",
  subscriber: "light-primary",
};

const MySwal = withReactContent(Swal);

const CompanyInfoCard = ({ selectedCompany, loadData, dispatch }) => {
  // ** State
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyId: selectedCompany.companyId,
      companyName: selectedCompany.companyName,
      description: selectedCompany.description ?? "",
    },
  });

  // ** render user img
  const renderUserImg = () => {
    return (
      <Avatar
        // initials
        color={selectedCompany?.avatarColor || "light-primary"}
        className="rounded mt-3 mb-2"
        content={renderInitial(selectedCompany?.companyName)}
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

  const onSubmit = (data) => {
    if (data.companyName.length) {
      if (!data.description) data.description = null;
      dispatch({
        type: "company/update",
        payload: { data },
        callback: (res) => {
          return MySwal.fire({
            icon: "success",
            title: "Success",
          }).then(() => {
            loadData();
            setShow(false);
          });
        },
      });
    } else {
      if (!data.companyName.length)
        setError("companyName", {
          type: "manual",
        });
    }
  };

  const handleReset = () => {
    reset({
      companyId: selectedCompany.companyId,
      companyName: selectedCompany.companyName,
      description: selectedCompany.description ?? "",
    });
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
          type: "company/delete",
          payload: { id: selectedCompany.companyId },
          callback: (res) => {
            return MySwal.fire({
              icon: "success",
              title: "Success",
            }).then(() => {
              setShow(false);
              navigate("/company");
            });
          },
        });
      }
    });
  };

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
                    {selectedCompany !== null
                      ? selectedCompany.companyName
                      : "Eleanor Aguilar"}
                  </h4>
                  {selectedCompany !== null ? (
                    <Badge
                      color={roleColors[selectedCompany.role]}
                      className="text-capitalize"
                    >
                      {selectedCompany.role}
                    </Badge>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <User className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{selectedCompany.totalUser}</h4>
                <small>User's</small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <GitPullRequest className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{selectedCompany.totalInventory}</h4>
                <small>Inventory's</small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">Details</h4>
          <div className="info-container">
            {selectedCompany !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">Company Name:</span>
                  <span>{selectedCompany.companyName}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Description:</span>
                  <span>{selectedCompany?.description ?? "-"}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Created At:</span>
                  <span>
                    {moment(selectedCompany?.createdAt).format("lll") ?? "-"}
                  </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">Last Updated:</span>
                  <span>
                    {moment(selectedCompany?.updatedAt).format("lll") ?? "-"}
                  </span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => setShow(true)}>
              Modify
            </Button>
            <Button className="ms-1" color="danger" outline onClick={doDelete}>
              Delete
            </Button>
          </div>
        </CardBody>
      </Card>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">Modify Company Information</h1>
            <p>Updating company details will receive a privacy audit.</p>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-1 pt-75">
              <Col xs={12}>
                <Label className="form-label" for="companyName">
                  Username
                </Label>
                <Controller
                  defaultValue={selectedCompany.companyName}
                  control={control}
                  id="companyName"
                  name="companyName"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="companyName"
                      placeholder="PT Jaya Abadi Selalu"
                      invalid={errors.companyName && true}
                    />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className="form-label" for="description">
                  Description
                </Label>
                <Controller
                  defaultValue={selectedCompany.description}
                  control={control}
                  id="description"
                  name="description"
                  render={({ field }) => (
                    <Input
                      type="textarea"
                      placeholder="Description"
                      {...field}
                    />
                  )}
                />
              </Col>
              <Col xs={12} className="text-center mt-2 pt-50">
                <Button type="submit" className="me-1" color="primary">
                  Submit
                </Button>
                <Button
                  type="reset"
                  color="secondary"
                  outline
                  onClick={() => {
                    handleReset();
                    setShow(false);
                  }}
                >
                  Discard
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default CompanyInfoCard;
