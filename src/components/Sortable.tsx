import React from "react";
import { SortablePropType } from "../types";

const Sortable: React.SFC<SortablePropType> = (props) => {
  const { title, handleClick, sortBy, sortField, sortOrder } = props;
  const classNames = (() => {
    let names = "sortable";
    if (sortBy === sortField) names += " " + sortOrder.toLowerCase();
    return names;
  })();

  return (
    <span className={classNames} onClick={e => handleClick(e, sortBy)}>
      {title}
    </span>
  )
}

export default Sortable;