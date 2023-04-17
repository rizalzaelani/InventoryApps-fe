// ** React Imports
import { Fragment, useState } from "react";

// ** Icons Imports
import { ArrowLeft, ArrowRight } from "react-feather";

// ** Reactstrap Imports
import { Button, Form, Input, Row, Col } from "reactstrap";

// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";

// ** Styles
import "@styles/base/pages/page-misc.scss";
import { Link } from "react-router-dom";

const Completed = ({ stepper, type }) => {
  const { skin } = useSkin();

  const illustration =
      skin === "dark" ? "coming-soon-dark.svg" : "coming-soon.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default;
  return (
    <Fragment>
      <div className="p-50 px-sm-3">
        <div className="w-100 text-center">
          <div className="mb-2">
            <img
              className="img-fluid"
              style={{ width: "30%" }}
              src={source}
              alt="Coming soon page"
            />
          </div>
          <h2 className="mb-1">Completed Import Inventory</h2>
          <p className="mb-2">
            We're creating something awesome. Please subscribe to get notified
            when it's ready!
          </p>
          <div className="d-flex justify-content-center">
            <Link to={"/inventory"}>
              <Button color="primary" className="btn-next">
                <span className="align-middle d-sm-inline-block d-none">
                  Go to inventory's list
                </span>
                <ArrowRight
                  size={14}
                  className="align-middle ms-sm-25 ms-0"
                ></ArrowRight>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Completed;
