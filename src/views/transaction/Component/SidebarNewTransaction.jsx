// ** React Import
import { useEffect, useState } from "react";

// ** Custom Components
import Sidebar from "@components/sidebar";

// ** Utils
import { selectThemeColors } from "@utils";
import { v4 as uuid } from "uuid";

// ** Third Party Components
import Flatpickr from "react-flatpickr";
import Select, { InputActionMeta } from "react-select";
import classnames from "classnames";
import { useForm, Controller, useFieldArray } from "react-hook-form";

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input, Table } from "reactstrap";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { ChevronDown, PlusCircle, X, XCircle } from "react-feather";
import moment from "moment";

const checkIsValid = (data) => {
  // Object.values(data).every((field) => {
  //   if (typeof field == "object") {
  //     console.log(field);
  //     console.log(field !== null);
  //     return field !== null;
  //   } else {
  //     console.log(field);
  //     console.log(field.length > 0);
  //     return field.length > 0;
  //   }
  // });
  return Object.values(data).every((field) =>
    typeof field === "object"
      ? field !== null
      : typeof field == "number"
      ? field
        ? true
        : false
      : field.length > 0
  );
};

const _SidebarNewTransactions = ({
  dispatch,
  open,
  toggleSidebar,
  listCompany,
  listCategory,
  listUser,
  listInventory,
  loadDatatable,
  defaultValues,
}) => {
  // ** States
  const [data, setData] = useState(null);
  const [picker, setPicker] = useState(new Date());

  // ** Vars
  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const userOptions = [
    { label: "Select User", value: "" },
    ...listUser.map((val, key) => {
      return {
        label: val.fullname,
        value: val.userId,
      };
    }),
  ];
  const inventoryOptions = [
    { label: "Select Inventory", value: "" },
    ...listInventory.map((val, key) => {
      return {
        label: "[" + val.inventoryCode + "] - " + val.inventoryName,
        value: val.inventoryId,
      };
    }),
  ];
  const typeOptions = [
    { label: "Select Type", value: "" },
    { label: "REPAIR", value: "REPAIR" },
    { label: "UPGRADE", value: "UPGRADE" },
    { label: "NON SCHEDULE AUDIT", value: "NON SCHEDULE AUDIT" },
    { label: "OTHER", value: "OTHER" },
  ];

  useEffect(() => {}, [listCompany, listCategory, listUser, listInventory]);

  // ** Function to handle form submit
  const onSubmit = (data) => {
    data = {
      ...data,
      transactionDate: data.transactionDate.length
        ? moment(data.transactionDate[0]).format()
        : moment(new Date()).format(),
      userId:
        data?.userId == null ? "default" : data?.userId ?? data?.userId?.value,
    };
    setData(data);
    if (checkIsValid(data)) {
      let params = {
        transactionId: uuid(),
        inventoryId: data.inventoryId.value,
        userId: data.userId == "default" ? null : data.userId.value,
        type: data.type.value,
        transactionDate: data.transactionDate,
        item: data.item,
        description: data.description,
      };
      dispatch({
        type: "transaction/create",
        payload: { params },
        callback: (res) => {
          return Swal.fire({
            icon: "success",
            title: "Success",
          }).then(() => {
            loadDatatable();
            toggleSidebar();
          });
        },
      });
    } else {
      for (const key in data) {
        if (data[key] === null) {
          setError("userId", {
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

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      if (key == "transactionId") setValue(key, "transactionId");
      else setValue(key, "");
    }
  };

  const onInputChange = (inputValue, { control }) => {
    // if (action === "input-change")
    console.log(control);
    console.log(inputValue);
    // if (action === "menu-close") {
    //   if (prevInputValue) setMenuIsOpen(true);
    //   else setMenuIsOpen(undefined);
    // }
    // return prevInputValue;
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="Form New Transaction"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
      style={{ width: 50 + "%" }}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-100 mb-1">
          <Label className="form-label" for="inventoryId">
            Inventory <span className="text-danger">*</span>
          </Label>
          <Controller
            name="inventoryId"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                menuPortalTarget={document.body}
                menuShouldScrollIntoView={false}
                classNamePrefix="select"
                isClearable={false}
                options={inventoryOptions}
                theme={selectThemeColors}
                onInputChange={(input) => {
                  console.log(input);
                  // onInputChange();
                }}
                className={classnames("react-select", {
                  "is-invalid": data !== null && data.inventoryId === null,
                })}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                {...field}
              />
            )}
          />
        </div>

        <div className="mb-1">
          <Label className="form-label" for="userId">
            User
          </Label>
          <Controller
            name="userId"
            control={control}
            render={({ field }) => (
              <Select
                menuPortalTarget={document.body}
                menuShouldScrollIntoView={false}
                classNamePrefix="select"
                options={userOptions}
                theme={selectThemeColors}
                className={classnames("react-select", {
                  "is-invalid": data !== null && data.userId === null,
                })}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                {...field}
              />
            )}
          />
        </div>

        <div className="mb-1">
          <Label className="form-label" for="type">
            Type <span className="text-danger">*</span>
          </Label>
          <Controller
            name="type"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                menuPortalTarget={document.body}
                menuShouldScrollIntoView={false}
                classNamePrefix="select"
                options={typeOptions}
                theme={selectThemeColors}
                className={classnames("react-select", {
                  "is-invalid": data !== null && data.type === null,
                })}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                {...field}
              />
            )}
          />
        </div>

        <div className="mb-1">
          <Label className="form-label" for="date-time-picker">
            Transaction Date <span className="text-danger">*</span>
          </Label>
          <Controller
            name="transactionDate"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Flatpickr
                // value={picker}
                data-enable-time
                id="date-time-picker"
                className={classnames("form-control", {
                  "is-invalid": data !== null && data.transactionDate === null,
                })}
                // onChange={(date) => setPicker(date)}
                {...field}
              />
            )}
          />
        </div>

        <div className="mb-1">
          <Label className="form-label" for="item">
            Item <span className="text-danger">*</span>
          </Label>
          <Controller
            name="item"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                type="textarea"
                id="item"
                placeholder="Keyboard, trackpad, etc."
                {...field}
              />
            )}
          />
        </div>

        <div className="mb-1">
          <Label className="form-label" for="description">
            Description <span className="text-danger">*</span>
          </Label>
          <Controller
            name="description"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                type="textarea"
                id="description"
                placeholder="Need to repair, etc."
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
      </Form>
    </Sidebar>
  );
};

const mapStateToProps = ({ reducerInventory }) => {
  return {
    listData: reducerInventory.listData,
  };
};

const SidebarNewTransactions = connect(mapStateToProps)(
  _SidebarNewTransactions
);

export default SidebarNewTransactions;
