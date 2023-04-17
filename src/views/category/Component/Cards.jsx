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

// ** Vars
const categorysArr = [
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
      categoryId: "",
      categoryName: "",
      categoryCode: "",
      description: "",
    },
  });

  const loadCategory = () => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: "category/get",
        payload: {},
      });
      resolve();
    });
  };

  const onSubmit = (data) => {
    if (data.categoryName.length && data.categoryCode.length) {
      let isEdit = false;
      if (!data.categoryId) {
        data.categoryId = uuid();
      } else {
        isEdit = true;
      }
      if (!data.description) data.description = null;

      dispatch({
        type: !isEdit ? "category/create" : "category/update",
        payload: { data },
        callback: (res) => {
          return MySwal.fire({
            icon: "success",
            title: "Success",
          }).then(() => {
            loadCategory();
            setShow(false);
          });
        },
      });
    } else {
      if (!data.categoryName.length)
        setError("categoryName", {
          type: "manual",
        });
      if (!data.categoryCode.length)
        setError("categoryCode", {
          type: "manual",
        });
    }
  };

  const setFormValue = () => {
    setValue("categoryId", rawData?.categoryId ?? "");
    setValue("categoryName", rawData?.categoryName ?? "");
    setValue("categoryCode", rawData?.categoryCode ?? "");
    setValue("description", rawData?.description ?? "");
  };

  const getDetail = (id) => {
    dispatch({
      type: "category/get_by_id",
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
          type: "category/delete",
          payload: { id: id },
          callback: (res) => {
            return MySwal.fire({
              icon: "success",
              title: "Success",
            }).then(() => {
              loadCategory();
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
      categoryId: "",
      categoryName: "",
      categoryCode: "",
      description: "",
    });
  };

  const handleModalClosed = () => {
    setModalType("Add New");
    reset({
      categoryId: "",
      categoryName: "",
      categoryCode: "",
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
                    <span>{`Total ${item.totalInv} inventory`}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-end mt-50 pt-25">
                    <div className="category-heading">
                      <h4 className="fw-bolder mb-0">{item.categoryName}</h4>
                      <small className="fw-bolder text-muted">
                        ({item.categoryCode})
                      </small>
                      <br />
                      <Link
                        to="/"
                        className="category-edit-modal"
                        onClick={(e) => {
                          e.preventDefault();
                          getDetail(item.categoryId);
                          setModalType("Modify");
                          setShow(true);
                        }}
                      >
                        <small className="fw-bolder">Modify Category</small>
                      </Link>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <Link to={item.categoryId} className="text-body me-50">
                        <Eye className="font-medium-5" />
                      </Link>
                      <Link
                        to=""
                        className="text-body"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Trash2
                          className="font-medium-5"
                          onClick={() => doDelete(item.categoryId)}
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
                      setShow(true);
                    }}
                  >
                    Add New
                  </Button>
                  <p className="mb-0">
                    Add a new category, if it does not exist
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
            <h1>{modalType} Category</h1>
            <p>Set category detail</p>
          </div>
          <Row tag="form" onSubmit={handleSubmit(onSubmit)}>
            <Col xs={12} className="mb-1">
              <Label className="form-label" for="categoryName">
                Category Name
              </Label>
              <Controller
                name="categoryName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="categoryName"
                    placeholder="Enter category name"
                    invalid={errors.categoryName && true}
                  />
                )}
              />
              {errors.categoryName && (
                <FormFeedback>Please enter a valid category name</FormFeedback>
              )}
            </Col>
            <Col xs={12} className="mb-1">
              <Label className="form-label" for="categoryCode">
                Category Code
              </Label>
              <Controller
                name="categoryCode"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="categoryCode"
                    placeholder="Enter category code"
                    invalid={errors.categoryCode && true}
                  />
                )}
              />
              {errors.categoryCode && (
                <FormFeedback>Please enter a valid category code</FormFeedback>
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

const mapStateToProps = ({ reducerCategory }) => {
  return { ...reducerCategory };
};

const Cards = connect(mapStateToProps)(_Cards);

export default Cards;
