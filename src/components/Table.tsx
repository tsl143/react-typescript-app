import React from "react";

import { AppStateKeys, SortType, TablePropType } from "../types";

import TableBody from "./TableBody";

const Table: React.SFC<TablePropType> = (props) => {
  const { data, sort, nameFilter: nf, positionFilter: pf, statusFilter: sf, changeFilter } = props;

  const sliceData = data
  .filter(d => {
    if(
      (nf !== "" && !d.name.toLowerCase().includes(nf.toLowerCase())) ||
      (pf !== "" && !d.position_applied.toLowerCase().includes(pf.toLowerCase())) ||
      (sf !== "" && sf !== d.status)
    ) return false;
    return true;
  });

  const handleClick = (e: React.MouseEvent, field: SortType): void => {
    sort(field);
  }

  // Handles both input and selectbox events.
  const handleChange = (event: React.ChangeEvent, field: AppStateKeys): void => {
    const target = event.target as HTMLInputElement;
    changeFilter(field, target.value);
  }

  return (
    <div className="applicationTable">
      <table>
        <thead>
          <tr>
            <th>
              <span>Name (filter)</span><br/>
              <input value={nf} onChange={e => handleChange(e, "nameFilter")}/>
            </th>
            <th><span>Email</span></th>
            <th><span>Age</span></th>
            <th>
              <span className="pointer" onClick={e => handleClick(e, "year_of_experience")}>
                Years of experience(sort)
              </span>
            </th>
            <th>
              <span className="pointer" onClick={e => handleClick(e, "position_applied")}>
                Position Applied(sort/ filter)
              </span>
              <br/>
              <input value={pf} onChange={e => handleChange(e, "positionFilter")}/>
            </th>
            <th>
              <span className="pointer" onClick={e => handleClick(e, "application_date")}>
                Applied on(sort)
              </span>
            </th>
            <th>
              <span>Status (filter)</span>
              <select
                onChange={e => handleChange(e, "statusFilter")}
                value={sf}
              >
                <option value=""></option>
                {["approved", "rejected", "waiting"].map(s => <option value={s} key={s}>{s}</option>)}
              </select>
            </th>
          </tr>
        </thead>
        <TableBody data={sliceData} />
      </table>
    </div>
  );
}

export default Table;