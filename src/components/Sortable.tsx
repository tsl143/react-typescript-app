import React from "react";
import { SortablePropType } from "../types";

const Sortable: React.SFC<SortablePropType> = (props) => {
  const { handleClick, sortBy, sortField, sortOrder, title } = props;
  const classNames = (() => {
    let names = `${sortBy} sortable`;
    if (sortBy === sortField) names += " " + sortOrder.toLowerCase();
    return names;
  })();

  return (
    <span className={classNames} onClick={() => handleClick(sortBy)}>
      {title}
    </span>
  )
}

export default Sortable;