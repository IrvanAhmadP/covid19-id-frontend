import React from "react";

// reactstrap components
import {
  Spinner
} from "reactstrap";

class SpinnerDefault extends React.Component {
  render(){
    return(
      <div className="spinner-primary-wrap text-center">
        <Spinner color="success" />
      </div>
    )
  }
}

export default SpinnerDefault;