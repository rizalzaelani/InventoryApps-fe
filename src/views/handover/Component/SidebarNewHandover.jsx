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
  // return;
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

const _SidebarNewHandovers = ({
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
  const conditionOptions = [
    { label: "Baik", value: "baik" },
    { label: "Rusak Sedang", value: "rusak sedang" },
    { label: "Rusak", value: "rusak" },
  ];

  useEffect(() => {}, [listCompany, listCategory, listUser, listInventory]);

  // ** Function to handle form submit
  const onSubmit = (data) => {
    data = {
      ...data,
      handoverDate: data.handoverDate.length
        ? moment(data.handoverDate[0]).format()
        : moment(new Date()).format(),
      userIdBefore:
        data?.userIdBefore == null
          ? "default"
          : data?.userIdBefore ?? data?.userIdBefore?.value,
      userIdAfter:
        data?.userIdAfter == null
          ? "default"
          : data?.userIdAfter ?? data?.userIdAfter?.value,
    };
    // console.log(data);
    setData(data);
    // return checkIsValid(data);
    if (checkIsValid(data)) {
      let params = {
        handoverId: uuid(),
        inventoryId: data.inventoryId.value,
        userIdBefore:
          data.userIdBefore == "default" ? null : data.userIdBefore.value,
        userIdAfter:
          data.userIdAfter == "default" ? null : data.userIdAfter.value,
        condition: data.condition.value,
        status: data.status,
        handoverDate: data.handoverDate,
        additionalDescription: data.additionalDescription,
      };
      dispatch({
        type: "handover/create",
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
      if (key == "handoverId") setValue(key, "handoverId");
      else setValue(key, "");
    }
  };

  const onInputChange = (inputValue, { control }) => {
    // if (action === "input-change")
    // console.log(control);
    // console.log(inputValue);
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
      title="Form New Handover"
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
                  // console.log(input);
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
          <Label className="form-label" for="userIdBefore">
            User Before
          </Label>
          <Controller
            name="userIdBefore"
            control={control}
            render={({ field }) => (
              <Select
                menuPortalTarget={document.body}
                menuShouldScrollIntoView={false}
                classNamePrefix="select"
                options={userOptions}
                theme={selectThemeColors}
                className={classnames("react-select", {
                  "is-invalid": data !== null && data.userIdBefore === null,
                })}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="userIdAfter">
            User After <span className="text-danger">*</span>
          </Label>
          <Controller
            name="userIdAfter"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                menuPortalTarget={document.body}
                menuShouldScrollIntoView={false}
                classNamePrefix="select"
                options={userOptions}
                theme={selectThemeColors}
                className={classnames("react-select", {
                  "is-invalid": data !== null && data.userIdAfter === null,
                })}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                {...field}
              />
            )}
          />
        </div>

        <div className="d-flex justify-content-between align-items-center mb-1">
          <div className="me-1 w-100">
            <Label className="form-label" for="condition">
              Condition <span className="text-danger">*</span>
            </Label>
            <Controller
              name="condition"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  menuPortalTarget={document.body}
                  menuShouldScrollIntoView={false}
                  classNamePrefix="select"
                  options={conditionOptions}
                  theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": data !== null && data.condition === null,
                  })}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                  {...field}
                />
              )}
            />
          </div>

          <div className="w-100">
            <Label className="form-label" for="status">
              Status <span className="text-danger">*</span>
            </Label>
            <Controller
              name="status"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  type="input"
                  id="status"
                  placeholder="Used, Standby, etc."
                  {...field}
                />
              )}
            />
          </div>
        </div>
        <div className="mb-1">
          <Label className="form-label" for="date-time-picker">
            Handover Date <span className="text-danger">*</span>
          </Label>
          <Controller
            name="handoverDate"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Flatpickr
                // value={picker}
                data-enable-time
                id="date-time-picker"
                className={classnames("form-control", {
                  "is-invalid": data !== null && data.handoverDate === null,
                })}
                // onChange={(date) => setPicker(date)}
                {...field}
              />
            )}
          />
        </div>

        <div className="mb-1">
          <Label className="form-label" for="additionalDescription">
            Additional Description <span className="text-danger">*</span>
          </Label>
          <Controller
            name="additionalDescription"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                type="textarea"
                id="additionalDescription"
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

const SidebarNewHandovers = connect(mapStateToProps)(_SidebarNewHandovers);

export default SidebarNewHandovers;
