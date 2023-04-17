// ** React Import
import { useEffect, useState } from "react";

// ** Custom Components
import Sidebar from "@components/sidebar";

// ** Utils
import { selectThemeColors } from "@utils";
import { v4 as uuid } from "uuid";

// ** Third Party Components
import Select from "react-select";
import classnames from "classnames";
import { useForm, Controller } from "react-hook-form";

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input } from "reactstrap";
import { connect } from "react-redux";
import Swal from "sweetalert2";

// const defaultValues = {
//   userId: "userId",
//   companyId: null,
//   role: null,
//   email: "",
//   phoneNumber: "",
//   fullname: "",
// };

const roleOptions = [
  { label: "User", value: "user" },
  { label: "Admin", value: "admin" },
];

const checkIsValid = (data) => {
  return Object.values(data).every((field) =>
    typeof field === "object" ? field !== null : field.length > 0
  );
};

const _SidebarNewUsers = ({
  dispatch,
  open,
  toggleSidebar,
  listCompany,
  loadData,
  defaultValues,
  isEdit,
  setIsEdit,
  resetFormWhenClose,
}) => {
  // ** States
  const [data, setData] = useState(null);
  const [role, setRole] = useState("user");

  // ** Vars
  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    for (const key in defaultValues) {
      setValue(key, defaultValues[key]);
    }
  }, [defaultValues]);

  const companyOptions = [
    { label: "Select Company", value: "" },
    ...listCompany.map((val, key) => {
      return {
        label: val.companyName,
        value: val.companyId,
      };
    }),
  ];

  useEffect(() => {}, [listCompany]);
  useEffect(() => {
    if (isEdit) {
      for (const key in defaultValues) {
        setValue(key, defaultValues[key]);
      }
    } else {
      for (const key in defaultValues) {
        if (key == "userId") setValue(key, "userId");
        else setValue(key, "");
      }
    }
  }, [isEdit]);

  // ** Function to handle form submit
  const onSubmit = (data) => {
    let isModify = false;
    if (data.userId != "userId") isModify = true;
    setData(data);
    if (checkIsValid(data)) {
      let params = {
        userId: isModify ? data.userId : uuid(),
        fullname: data.fullname,
        email: data.email,
        phoneNumber: data.phoneNumber,
        companyId: data.companyId.value,
        role: data.role.value,
        password: "password123",
      };
      dispatch({
        type: !isModify ? "user/create" : "user/update",
        payload: { params },
        callback: (res) => {
          return Swal.fire({
            icon: "success",
            title: "Success",
          }).then(() => {
            loadData();
            toggleSidebar();
          });
        },
      });
    } else {
      for (const key in data) {
        if (data[key] === null) {
          setError("company", {
            type: "manual",
          });
          setError("role", {
            type: "manual",
          });
        }
        if (data[key] !== null && data[key].length === 0) {
          setError(key, {
            type: "manual",
          });
        }
      }
    }
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
          payload: { id: defaultValues?.userId ?? "" },
          callback: (res) => {
            return Swal.fire({
              icon: "success",
              title: "Success",
            }).then(() => {
              loadData();
              toggleSidebar();
            });
          },
        });
      }
    });
  };

  const handleSidebarClosed = () => {
    if (resetFormWhenClose) {
      for (const key in defaultValues) {
        if (key == "userId") setValue(key, "userId");
        else setValue(key, "");
      }
      setRole("user");
      setIsEdit(false);
    }
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title={isEdit ? "Form Modify User" : "Form New User"}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-1">
          <Label className="form-label" for="fullname">
            Full Name <span className="text-danger">*</span>
          </Label>
          <Controller
            name="fullname"
            control={control}
            render={({ field }) => (
              <Input
                id="fullname"
                placeholder="John Doe"
                invalid={errors.fullname && true}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="userEmail">
            Email <span className="text-danger">*</span>
          </Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                type="email"
                id="userEmail"
                placeholder="john.doe@example.com"
                invalid={errors.email && true}
                {...field}
              />
            )}
          />
        </div>

        <div className="mb-1">
          <Label className="form-label" for="phoneNumber">
            Phone Number <span className="text-danger">*</span>
          </Label>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <Input
                id="phoneNumber"
                placeholder="(62) 857945xxxxxx"
                invalid={errors.phoneNumber && true}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="company">
            Company <span className="text-danger">*</span>
          </Label>
          <Controller
            name="companyId"
            control={control}
            render={({ field }) => (
              <Select
                isClearable={false}
                classNamePrefix="select"
                options={companyOptions}
                theme={selectThemeColors}
                className={classnames("react-select", {
                  "is-invalid": data !== null && data.companyId === null,
                })}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="role">
            User Role <span className="text-danger">*</span>
          </Label>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                isClearable={false}
                classNamePrefix="select"
                options={roleOptions}
                theme={selectThemeColors}
                className={classnames("react-select", {
                  "is-invalid": data !== null && data.role === null,
                })}
                {...field}
              />
            )}
          />
        </div>
        <div className="d-flex justify-content-center align-items-center mb-1">
          <Button type="submit" className="me-1 w-100" color="primary">
            Submit
          </Button>
          <Button
            className="w-100"
            type="reset"
            color="secondary"
            outline
            onClick={toggleSidebar}
          >
            Cancel
          </Button>
        </div>
        {isEdit ? (
          <Button
            className="w-100 btn btn-outline-danger"
            color="white"
            onClick={doDelete}
          >
            Delete
          </Button>
        ) : (
          ""
        )}
      </Form>
    </Sidebar>
  );
};

const mapStateToProps = ({ reducerCompany, reducerUser }) => {
  return {
    listCompany: reducerCompany.listData,
    listData: reducerUser.listData,
  };
};

const SidebarNewUsers = connect(mapStateToProps)(_SidebarNewUsers);

export default SidebarNewUsers;
