import React from "react";

import { AppStateKeys, TablePropType } from "../types";
import { pageSize, sortArray } from "../utility";

import TableBody from "./TableBody";
import Sortable from "./Sortable";
import Pagination from "./Pagination";

const Table: React.SFC<TablePropType> = (props) => {
  const {
    data,
    changeFilter,
    changePage,
    changeSort,
    nameFilter: nf,
    page,
    positionFilter: pf,
    sortField,
    sortOrder,
    statusFilter: sf
  } = props;

  const filteredData = data
  .filter(d => {
    if(
      (nf !== "" && !d.name.toLowerCase().includes(nf.toLowerCase())) ||
      (pf !== "" && !d.position_applied.toLowerCase().includes(pf.toLowerCase())) ||
      (sf !== "" && sf !== d.status)
    ) return false;
    return true;
  });
  const sortedData = sortArray(filteredData, sortField, sortOrder);

  const startIndex = (page - 1) * pageSize;
  const sliceData = sortedData.slice(startIndex, startIndex + pageSize);

  // Handles both input and selectbox events.
  const handleChange = (event: React.ChangeEvent, field: AppStateKeys): void => {
    const target = event.target as HTMLInputElement;
    changeFilter(field, target.value);
  };

  return (
    <div id="applicationTable">
      <table>
        <thead>
          <tr>
            <th>
              <span>Name</span><br/>
              <input className="textFilter name" value={nf} onChange={e => handleChange(e, "nameFilter")}/>
            </th>
            <th><span>Email</span></th>
            <th><span>Age</span></th>
            <th>
              <Sortable
                title="Years of experience"
                handleClick={changeSort}
                sortBy="year_of_experience"
                sortField={sortField}
                sortOrder={sortOrder}
              />
            </th>
            <th>
              <Sortable
                title="Position Applied"
                handleClick={changeSort}
                sortBy="position_applied"
                sortField={sortField}
                sortOrder={sortOrder}
              />
              <br/>
              <input className="textFilter position" value={pf} onChange={e => handleChange(e, "positionFilter")}/>
            </th>
            <th>
              <Sortable
                title="Applied on"
                handleClick={changeSort}
                sortBy="application_date"
                sortField={sortField}
                sortOrder={sortOrder}
              />
            </th>
            <th>
              <span>Status</span>
              <br/>
              <select
                onChange={e => handleChange(e, "statusFilter")}
                value={sf}
              >
                <option value="">All</option>
                {["approved", "rejected", "waiting"].map(s => <option value={s} key={s}>{s}</option>)}
              </select>
            </th>
          </tr>
        </thead>
        <TableBody data={sliceData} />
      </table>
      {
        sortedData.length !== 0 &&
        <Pagination page={page} changePage={changePage} total={sortedData.length}/>
      }
    </div>
  );
};

export default Table;
