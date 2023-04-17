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
  Table,
} from "reactstrap";

// ** Third Party Components
import Swal from "sweetalert2";
import Select from "react-select";
import {
  Check,
  Briefcase,
  X,
  Inventory,
  GitPullRequest,
  User,
  Edit,
  Trash2,
  Zap,
  PlusSquare,
  Share2,
  BookOpen,
  Server,
} from "react-feather";
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
import SidebarNewInventorys from "../Component/SidebarNewInventory";

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

const InventoryInfoCard = ({ selectedInventory, loadData, dispatch }) => {
  // ** State
  const [show, setShow] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [defaultValues, setDefaultValues] = useState({});

  useEffect(() => {
    setDefaultValues({
      inventoryId: selectedInventory?.inventoryId,
      userId:
        selectedInventory?.userId == null
          ? { value: "", label: "Select user" }
          : {
              label: selectedInventory?.fullname,
              value: selectedInventory?.userId,
            },
      companyId: {
        label: selectedInventory?.companyName,
        value: selectedInventory?.companyId,
      },
      categoryId: {
        label: selectedInventory?.categoryName,
        value: selectedInventory?.categoryId,
      },
      inventoryName: selectedInventory?.inventoryName,
      inventoryCode: selectedInventory?.inventoryCode,
      qty: selectedInventory?.qty ?? "1",
      uom: selectedInventory?.uom ?? "",
      description:
        selectedInventory?.description == null
          ? [
              {
                key: "key",
                value: "value",
              },
            ]
          : JSON.parse(selectedInventory?.description),
      condition: {
        label: upperFirstLetter(selectedInventory?.condition),
        value: selectedInventory?.condition,
      },
      status: selectedInventory?.status,
      additionalDescription: selectedInventory?.additionalDescription ?? "",
    });
  }, [selectedInventory]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
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
      inventoryId: selectedInventory.inventoryId,
      fullname: selectedInventory.fullname,
      inventoryCode: selectedInventory.inventoryCode,
      description: selectedInventory.description ?? "",
    },
  });

  // ** render inventory img
  const renderInventoryImg = () => {
    return (
      <Avatar
        // initials
        color={selectedInventory?.avatarColor || "light-primary"}
        className="rounded mt-3 mb-2"
        content={renderInitial(selectedInventory?.inventoryName)}
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
          type: "inventory/delete",
          payload: { id: selectedInventory.inventoryId },
          callback: (res) => {
            return MySwal.fire({
              icon: "success",
              title: "Success",
            }).then(() => {
              setShow(false);
              navigate("/inventory");
            });
          },
        });
      }
    });
  };

  const checkIsObject = (str) => {
    try {
      return typeof JSON.parse(str) == "object";
    } catch {
      return false;
    }
  };

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="inventory-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderInventoryImg()}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="inventory-info">
                  <h4>
                    {selectedInventory !== null
                      ? selectedInventory.inventoryName
                      : "Eleanor Aguilar"}
                  </h4>
                  {selectedInventory !== null ? (
                    <Badge
                      color={roleColors[selectedInventory.inventoryCode]}
                      className="text-capitalize"
                    >
                      {selectedInventory.inventoryCode}
                    </Badge>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <Server className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{selectedInventory.totalInventory}</h4>
                <small>Transaction's</small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <BookOpen className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{selectedInventory.totalInventory}</h4>
                <small>Handover's</small>
              </div>
            </div>
          </div>
          {/* <div className="d-flex justify-content-between align-items-center pt-2 w-100 mb-50">
            <Button
              className="w-100 me-50 d-flex justify-content-center align-items-center"
              color="warning"
              onClick={() => setShow(true)}
            >
              <PlusSquare className="font-medium-3 me-50" />
              Transaction
            </Button>
            <Button
              className="w-100 d-flex justify-content-center align-items-center"
              color="secondary"
              onClick={() => setShow(true)}
            >
              <BookOpen className="font-medium-3 me-50" />
              Handover
            </Button>
          </div> */}
          <div className="w-100">
            <Button
              className="w-100 mb-50 d-flex justify-content-center align-items-center"
              color="primary"
              onClick={toggleSidebar}
            >
              <Edit className="font-medium-3 me-50" />
              Modify
            </Button>
            <Button
              className="w-100 d-flex justify-content-center align-items-center"
              color="danger"
              outline
              onClick={doDelete}
            >
              <Trash2 className="font-medium-3 me-50" />
              Delete
            </Button>
          </div>
        </CardBody>
      </Card>
      <SidebarNewInventorys
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        loadData={loadData}
        defaultValues={defaultValues}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        resetFormWhenClose={false}
      />
    </Fragment>
  );
};

export default InventoryInfoCard;
