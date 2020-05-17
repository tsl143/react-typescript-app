import React from "react";
import { LoaderPropType } from "../types";

const Loader: React.SFC<LoaderPropType> = ({ errorMsg, isLoading }) => {
  const msg = errorMsg !== "" ? errorMsg : "No data found";
  return (
    <div className="center">
      {isLoading ? <p> Loading ... </p> : <p> { msg } </p>}
    </div>
  )
}

export default Loader;
