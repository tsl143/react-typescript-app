import React from "react";
import { LoaderPropType } from "../types";

const Loader: React.SFC<LoaderPropType> = ({ errorMsg, isLoading, len }) => {
  console.log(errorMsg)
  const msg = errorMsg !== "" ? errorMsg : "No data found";
  return (
    <div id="messageBox">
      {isLoading ? <p> Loading ... </p> : <p> { msg } </p>}
    </div>
  )
}

export default Loader;
