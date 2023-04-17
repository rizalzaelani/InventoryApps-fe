// ** React Imports
import { useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";
import UploadFile from "./step/UploadFile";
import ReviewData from "./step/ReviewData";
import Completed from "./step/Completed";

// ** Steps
// import Address from "./steps-with-validation/Address";
// import SocialLinks from "./steps-with-validation/SocialLinks";
// import PersonalInfo from "./steps-with-validation/PersonalInfo";
// import AccountDetails from "./steps-with-validation/AccountDetails";

const WizardImport = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  const steps = [
    {
      id: "upload-file",
      title: "Upload File",
      subtitle: "Upload updated file template.",
      content: <UploadFile stepper={stepper} />,
      //   content: "",
    },
    {
      id: "review-data",
      title: "Review Data",
      subtitle: "Review data uploaded",
      content: <ReviewData stepper={stepper} />,

      //   content: <PersonalInfo stepper={stepper} />
    },
    {
      id: "import-complete",
      title: "Complete",
      subtitle: "Import completed",
      content: <Completed stepper={stepper} />,

      //   content: <SocialLinks stepper={stepper} />
    },
  ];

  return (
    <div className="horizontal-wizard">
      <Wizard instance={(el) => setStepper(el)} ref={ref} steps={steps} />
    </div>
  );
};

export default WizardImport;
