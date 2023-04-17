// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Icons Imports
import { ArrowLeft, ArrowRight } from "react-feather";
import { FilePond, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
registerPlugin(FilePondPluginFileValidateType);

// ** Reactstrap Imports
import { Button, Alert } from "reactstrap";
import { connect } from "react-redux";
import Swal from "sweetalert2";

const _UploadFile = ({ stepper, dispatch, listDataImport }) => {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  useEffect(() => {
    if (files.length) {
      let formData = new FormData();
      formData.append("file", files[0]?.file);
      if (!isUploading) {
        dispatch({
          type: "inventory/upload_file_inventory",
          payload: formData,
          callback: (res) => {
            stepper.next();
            setIsUploading(false);
          },
        });
        setIsUploading(true);
      }
    }
  }, [files]);
  useEffect(() => {}, [listDataImport]);

  return (
    <Fragment>
      <div className="mb-3">
        <div className="content-header mb-2">
          <h4 className="mb-0">Follow these steps to import inventory</h4>
          <small className="text-muted">
            Please pay close attention to the steps.
          </small>
        </div>
        <div>
          <ol className="ps-1">
            <li className="mb-2">
              <div className="content-header">
                <h5 className="mb-0">Download file template inventory</h5>
                <small className="text-muted">
                  If you don't have the latest inventory template file yet, you
                  can download it <a href="#">here</a>.
                </small>
              </div>
            </li>
            <li className="mb-2">
              <div className="content-header mb-1">
                <h5 className="mb-0">
                  Insert the inventory data you have into template
                </h5>
                <small className="text-muted">
                  Using Excel or other spreadsheet software, enter the detailed
                  inventory data into our template file. Make sure the data
                  matches the header fields in the template.
                </small>
              </div>
              <Alert color="primary">
                <h4 className="alert-heading">Info</h4>
                <div className="alert-body">
                  Do not change the column headers in the template. This is
                  required for the import to work. A maximum of 20 inventory can
                  be imported at one time. Category names, inventory owner
                  (company name), PIC (user) that do not exist in the app will
                  be entered as new data. When importing, the application will
                  only enter new data, no data is deleted or updated.
                </div>
              </Alert>
            </li>
            <li className="mb-2">
              <div className="content-header mb-1">
                <h5 className="mb-0">Upload the updated template here.</h5>
                <small className="text-muted">
                  To reduce data discrepancies, make sure the data entered into
                  the template follows the rules given.
                </small>
              </div>
              <div>
                <FilePond
                  allowMultiple={false}
                  maxFiles={1}
                  files={files}
                  onupdatefiles={setFiles}
                  onaddfileprogress
                  allowFileTypeValidation={true}
                  acceptedFileTypes="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, .xlsx"
                />
              </div>
            </li>
          </ol>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ reducerInventory }) => {
  return {
    listDataImport: reducerInventory.listDataImport,
  };
};

const UploadFile = connect(mapStateToProps)(_UploadFile);
export default UploadFile;
