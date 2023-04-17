// ** React Imports
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Swal from "sweetalert2";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Label,
  Input,
  Table,
  Modal,
  Button,
  CardBody,
  ModalBody,
  ModalHeader,
  FormFeedback,
  UncontrolledTooltip,
} from "reactstrap";

// ** Third Party Components
import { Copy, Eye, Info, Trash2 } from "react-feather";
import { useForm, Controller } from "react-hook-form";

// ** Custom Components
import AvatarGroup from "@components/avatar-group";

// ** FAQ Illustrations
import illustration from "@src/assets/images/illustration/faq-illustrations.svg";
import { connect, useDispatch } from "react-redux";
import Textarea from "../../forms/form-elements/textarea";
import withReactContent from "sweetalert2-react-content";
import moment from "moment";

// ** Vars
const companysArr = [
  "User Management",
  "Content Management",
  "Disputes Management",
  "Database Management",
  "Financial Management",
  "Reporting",
  "API Control",
  "Repository Management",
  "Payroll",
];

const _Cards = ({ dispatch, listData, rawData }) => {
  // ** States
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState("Add New");
  const MySwal = withReactContent(Swal);

  useEffect(() => {}, [listData]);
  useEffect(() => {
    setFormValue();
  }, [rawData]);

  // ** Hooks
  const {
    reset,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyId: "",
      companyName: "",
      description: "",
    },
  });

  const customMoment = (date, format) => {
    return moment(date).format(format);
  };

  const loadCompany = () => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: "company/get",
        payload: {},
      });
      resolve();
    });
  };

  const onSubmit = (data) => {
    if (data.companyName.length) {
      let isEdit = false;
      if (!data.companyId) {
        data.companyId = uuid();
      } else {
        isEdit = true;
      }
      if (!data.description) data.description = null;

      dispatch({
        type: !isEdit ? "company/create" : "company/update",
        payload: { data },
        callback: (res) => {
          return MySwal.fire({
            icon: "success",
            title: "Success",
          }).then(() => {
            loadCompany();
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

  const setFormValue = () => {
    setValue("companyId", rawData?.companyId ?? "");
    setValue("companyName", rawData?.companyName ?? "");
    setValue("description", rawData?.description ?? "");
  };

  const getDetail = (id) => {
    dispatch({
      type: "company/get_by_id",
      payload: id,
    });
  };

  const doDelete = (id) => {
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
          payload: { id: id },
          callback: (res) => {
            return MySwal.fire({
              icon: "success",
              title: "Success",
            }).then(() => {
              loadCompany();
              setShow(false);
            });
          },
        });
      }
    });
  };

  const onReset = () => {
    setShow(false);
    reset({
      companyId: "",
      companyName: "",
      description: "",
    });
  };

  const handleModalClosed = () => {
    setModalType("Add New");
    reset({
      companyId: "",
      companyName: "",
      description: "",
    });
  };

  return (
    <Fragment>
      <Row>
        {listData.map((item, index) => {
          return (
            <Col key={index} xl={4} md={6}>
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-between">
                    {/* <span>{`Total ${item.totalInv} inventory`}</span> */}
                  </div>
                  <div className="d-flex justify-content-between align-items-end mt-50 pt-25">
                    <div className="company-heading">
                      <h4 className="fw-bolder">{item.companyName}</h4>
                      <p>
                        <small className="fw-bolder text-muted">
                          ({customMoment(item.createdAt, "lll")})
                        </small>
                      </p>
                      <Link
                        to="/"
                        className="company-edit-modal"
                        onClick={(e) => {
                          getDetail(item.companyId);
                          e.preventDefault();
                          setModalType("Modify");
                          setShow(true);
                        }}
                      >
                        <small className="fw-bolder">Modify Company</small>
                      </Link>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to={item.companyId} className="text-body">
                        <Eye className="font-medium-5 me-50" />
                      </Link>
                      <Link
                        to=""
                        className="text-body"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Trash2
                          className="font-medium-5"
                          onClick={() => doDelete(item.companyId)}
                        />
                      </Link>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          );
        })}
        <Col xl={4} md={6}>
          <Card>
            <Row>
              <Col sm={4}>
                <div className="d-flex align-items-end justify-content-center h-100">
                  <img
                    className="img-fluid mt-2"
                    src={illustration}
                    alt="Image"
                    width={85}
                  />
                </div>
              </Col>
              <Col sm={8}>
                <CardBody className="text-sm-end text-center ps-sm-0">
                  <Button
                    color="primary"
                    className="text-nowrap mb-1"
                    onClick={() => {
                      setModalType("Add New");
                      onReset();
                      setShow(true);
                    }}
                  >
                    Add New
                  </Button>
                  <p className="mb-0">
                    Add a new company, if it does not exist
                  </p>
                </CardBody>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Modal
        isOpen={show}
        onClosed={handleModalClosed}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-5 pb-5">
          <div className="text-center mb-4">
            <h1>{modalType} Company Information</h1>
            <p>Updating company details will receive a privacy audit.</p>
          </div>
          <Row tag="form" onSubmit={handleSubmit(onSubmit)}>
            <Col xs={12} className="mb-1">
              <Label className="form-label" for="companyName">
                Company Name
              </Label>
              <Controller
                name="companyName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="companyName"
                    placeholder="Enter company name"
                    invalid={errors.companyName && true}
                  />
                )}
              />
              {errors.companyName && (
                <FormFeedback>Please enter a valid company name</FormFeedback>
              )}
            </Col>
            <Col xs={12} className="mb-1">
              <Label className="form-label" for="description">
                Description
              </Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Input
                    type="textarea"
                    {...field}
                    id="description"
                    placeholder="Enter description"
                    invalid={errors.description && true}
                  />
                )}
              />
            </Col>
            <Col className="text-center mt-2" xs={12}>
              <Button type="submit" color="primary" className="me-1">
                Submit
              </Button>
              <Button type="reset" outline onClick={onReset}>
                Discard
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

const mapStateToProps = ({ reducerCompany }) => {
  return { ...reducerCompany };
};

const Cards = connect(mapStateToProps)(_Cards);

export default Cards;
