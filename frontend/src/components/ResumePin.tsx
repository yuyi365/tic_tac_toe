import { useState } from "react";

type Props = {
  pin: string;
  setPin: (pin: string | ((pin: string) => string)) => void;
};
const ResumePin = (props: Props) => {
  const [notFoundError, setNotFoundError] = useState(false);

  const handlePinSubmission = (e: any) => {
    e.preventDefault();
    props.setPin(props.pin);
    // query backend for pin
    // if pin is found, change boardcontainer to true, else: pop-up game does not exst
  };

  console.log(props.pin);

  return (
    <div className="form-div">
      <form className="form">
        <label>Please input your four (4) digit game pin:</label>
        <input
          type="text"
          id="pin-input"
          name="pin"
          onChange={(e) => props.setPin(e.target.value)}
        />
        <button
          onClick={(e) => handlePinSubmission(e)}
          className="pin-complete-button"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ResumePin;
