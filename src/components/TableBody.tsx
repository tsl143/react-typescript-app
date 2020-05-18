import React from "react";
import { customDateObj, TableBodyPropType } from "../types";

const TableBody: React.SFC<TableBodyPropType> = ({ data }) => {
  const currentDate = new Date();
  const today = {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    day: currentDate.getDate()
  };

  const getAge = (birthDay: string, matchDate: customDateObj): number => {
    // Split date from "YYYY-MM-DD" to array
    const dob = birthDay.split("-");
    let age = matchDate.year - ~~dob[0];
    if ( matchDate.month < (~~dob[1] - 1)) age--;
    else if (
      ((~~dob[1] - 1) == matchDate.month) &&
      (matchDate.day < ~~dob[2])
    ) age--;
    return age;
  };

  return (
    <tbody>
      {
        data.length > 0
        ? data.map(d => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.email}</td>
              <td className="age">{getAge(d.birth_date, today)}</td>
              <td>{d.year_of_experience}</td>
              <td>{d.position_applied}</td>
              <td>{d.application_date}</td>
              <td>{d.status}</td>
            </tr>
          ))
        : <tr><td className="center" colSpan={7}>No data found</td></tr>
      }
    </tbody>
  );
};

export default TableBody;
