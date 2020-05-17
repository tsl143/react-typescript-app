import React from "react";
import { PaginationPropType } from "../types";
import { pageSize } from "../utility";

const Pagination: React.SFC<PaginationPropType> = (props) => {
  const { changePage, page, total } = props;
  const totalPages = Math.ceil(total/pageSize);

  return (
    <div id="pagination">
      { page > 1 && <a className="prev" onClick={() => changePage(page - 1)}>«</a> }
      <span>{`Showing ${page} of ${totalPages}`}</span>
      { page < totalPages && <a className="next" onClick={() => changePage(page+1)}>»</a> }
    </div>
  )
}

export default Pagination;
