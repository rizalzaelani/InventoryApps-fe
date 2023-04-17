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
import { useForm, Controller, useFieldArray } from "react-hook-form";

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input, Table } from "reactstrap";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import { ChevronDown, PlusCircle, X, XCircle } from "react-feather";

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

const _SidebarNewInventorys = ({
  dispatch,
  open,
  toggleSidebar,
  listCompany,
  listCategory,
  listUser,
  loadData,
  defaultValues,
  isEdit,
  setIsEdit,
  resetFormWhenClose,
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

  useEffect(() => {
    for (const key in defaultValues) {
      setValue(key, defaultValues[key]);
    }
  }, [defaultValues]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "description",
  });

  const companyOptions = [
    { label: "Select Company", value: "" },
    ...listCompany.map((val, key) => {
      return {
        label: val.companyName,
        value: val.companyId,
      };
    }),
  ];

  const categoryOptions = [
    { label: "Select Category", value: "" },
    ...listCategory.map((val, key) => {
      return {
        label: val.categoryName,
        value: val.categoryId,
      };
    }),
  ];
  const userOptions = [
    { label: "Select User", value: "" },
    ...listUser.map((val, key) => {
      return {
        label: val.fullname,
        value: val.userId,
      };
    }),
  ];

  const conditionOptions = [
    { label: "Baik", value: "baik" },
    { label: "Rusak Sedang", value: "rusak sedang" },
    { label: "Rusak", value: "rusak" },
  ];

  useEffect(() => {}, [listCompany, listCategory, listUser]);
  useEffect(() => {
    if (isEdit) {
      for (const key in defaultValues) {
        setValue(key, defaultValues[key]);
      }
    } else {
      for (const key in defaultValues) {
        if (key == "inventoryId") setValue(key, "inventoryId");
        else if (key == "description")
          setValue(key, [{ key: "key", value: "value" }]);
        else setValue(key, "");
      }
    }
  }, [isEdit]);

  // ** Function to handle form submit
  const onSubmit = (data) => {
    data = {
      ...data,
      additionalDescription:
        data?.additionalDescription == ""
          ? "default"
          : data?.additionalDescription,
      qty: data?.qty == "" ? "1" : data?.qty,
      userId:
        data?.userId == "" ? "default" : data?.userId ?? data?.userId?.value,
    };
    let isModify = false;
    if (data.inventoryId != "inventoryId") isModify = true;
    setData(data);
    if (checkIsValid(data)) {
      if (data.description.length) {
        data.description.forEach((val, key) => {
          if (
            (val.key == "key" && val.value == "value") ||
            (val.key == "" && val.value == "")
          )
            data.description.splice(key, 1);
        });
      }
      let params = {
        inventoryId: isModify ? data.inventoryId : uuid(),
        companyId: data.companyId.value,
        categoryId: data.categoryId.value,
        userId: data.userId == "default" ? null : data.userId.value,
        inventoryName: data.inventoryName,
        inventoryCode: data.inventoryCode,
        uom: data.uom,
        condition: data.condition.value,
        status: data.status,
        description: data.description.length
          ? JSON.stringify(data.description)
          : null,
        additionalDescription:
          data.additionalDescription == "default"
            ? null
            : data.additionalDescription,
      };
      dispatch({
        type: !isModify ? "inventory/create" : "inventory/update",
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
        if (key == "inventoryId") setValue(key, "inventoryId");
        else if (key == "description")
          setValue(key, [{ key: "key", value: "value" }]);
        else setValue(key, "");
      }
      setIsEdit(false);
    }
  };

  const FormSpecification = () => {
    return (
      <div>
        <label className="form-label" htmlFor="formSpecification">
          Specific Description
        </label>
        <Table id="formSpecification">
          <thead>
            <tr>
              <th className="px-0 text-center">key</th>
              <th className="px-0 text-center">value</th>
              <th className="px-0 text-center">#</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => {
              return (
                <tr key={field.id}>
                  <td className="px-0 pe-50">
                    <Controller
                      render={({ field }) => <Input {...field} />}
                      name={`description.${index}.key`}
                      control={control}
                    />
                  </td>
                  <td className="px-0 ps-50">
                    <Controller
                      render={({ field }) => <Input {...field} />}
                      name={`description.${index}.value`}
                      control={control}
                    />
                  </td>
                  {fields.length == index + 1 ? (
                    <td className="text-center">
                      <button
                        className="btn btn-icon"
                        color="primary"
                        onClick={(e) => {
                          e.preventDefault();
                          append({ key: "", value: "" });
                        }}
                      >
                        <PlusCircle className="text-primary" />
                      </button>
                    </td>
                  ) : (
                    <td className="text-center">
                      <button
                        className="btn btn-icon"
                        color="primary"
                        onClick={(e) => {
                          e.preventDefault();
                          remove(index);
                        }}
                      >
                        <XCircle className="text-danger" />
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title={isEdit ? "Form Modify Inventory" : "Form New Inventory"}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
      style={{ width: 50 + "%" }}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-1 d-flex justify-content-between align-items-center">
          <div className="w-100 me-1">
            <Label className="form-label" for="company">
              Company <span className="text-danger">*</span>
            </Label>
            <Controller
              name="companyId"
              control={control}
              rules={{ required: true }}
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

          <div className="w-100">
            <Label className="form-label" for="category">
              Category <span className="text-danger">*</span>
            </Label>
            <Controller
              name="categoryId"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  isClearable={false}
                  classNamePrefix="select"
                  options={categoryOptions}
                  theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": data !== null && data.categoryId === null,
                  })}
                  {...field}
                />
              )}
            />
          </div>
        </div>

        <div className="mb-1">
          <Label className="form-label" for="user">
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
          <Label className="form-label" for="inventoryName">
            Inventory Name <span className="text-danger">*</span>
          </Label>
          <Controller
            name="inventoryName"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                id="inventoryName"
                placeholder="Macbook Pro 2012"
                invalid={errors.inventoryName && true}
                {...field}
              />
            )}
          />
        </div>

        <div className="mb-1 d-flex justify-content-between align-items-center">
          <div className="w-100 me-1">
            <Label className="form-label" for="inventoryCode">
              Inventory Code <span className="text-danger">*</span>
            </Label>
            <Controller
              name="inventoryCode"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  id="inventoryCode"
                  placeholder="MACP-2012"
                  invalid={errors.inventoryCode && true}
                  {...field}
                />
              )}
            />
          </div>

          <div className="w-100">
            <Label className="form-label" for="uom">
              UoM <span className="text-danger">*</span>
            </Label>
            <Controller
              name="uom"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  id="uom"
                  placeholder="pcs"
                  invalid={errors.uom && true}
                  {...field}
                />
              )}
            />
          </div>
        </div>

        <FormSpecification />

        <div className="mb-1 d-flex justify-content-between align-items-center">
          <div className="w-100 me-1">
            <Label className="form-label" for="condition">
              Condition <span className="text-danger">*</span>
            </Label>
            <Controller
              name="condition"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  isClearable={false}
                  classNamePrefix="select"
                  options={conditionOptions}
                  theme={selectThemeColors}
                  className={classnames("react-select", {
                    "is-invalid": data !== null && data.condition === null,
                  })}
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
                  id="status"
                  placeholder="Used"
                  invalid={errors.status && true}
                  {...field}
                />
              )}
            />
          </div>
        </div>

        <div className="mb-1">
          <Label className="form-label" for="additionalDescription">
            Additional Description
          </Label>
          <Controller
            name="additionalDescription"
            control={control}
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

const mapStateToProps = ({
  reducerInventory,
  reducerUser,
  reducerCategory,
  reducerCompany,
}) => {
  return {
    listData: reducerInventory.listData,
    listUser: reducerUser.listData,
    listCategory: reducerCategory.listData,
    listCompany: reducerCompany.listData,
  };
};

const SidebarNewInventorys = connect(mapStateToProps)(_SidebarNewInventorys);

export default SidebarNewInventorys;
