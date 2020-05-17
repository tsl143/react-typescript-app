import { ApplicationType, sortFieldType, queryParamsType } from "./types";

export const pageSize = 15;
export const API_URL = "http://localhost:8112/candidates.json";

export const sortArray = (data: Array<ApplicationType>, field: sortFieldType, order: string) => {
  return data.sort(function (first, second) {
    const a = first[field];
    const b = second[field];
    if (
      (order == "DESC" && a > b) ||
      (order == "ASC" && a < b)
    ) {
        return -1;
    }
    if (
      (order == "DESC" && b > a) ||
      (order == "ASC" && b > a)
    ) {
        return 1;
    }
    return 0;
  });
}

// Define extra key-value as string due to dynamic keys
const defaultFilterSortState: queryParamsType & { [key: string]: string } = {
  nameFilter: "",
  positionFilter: "",
  statusFilter: "",
  sortField: "application_date",
  sortOrder: "DESC"
};

export const resolveQueryParams = (str: string): queryParamsType => {
  // Remove `?` from the string.
  const query = str.substr(1);
  const params = query.split('&');
  const obj = { ...defaultFilterSortState };
  params.forEach(p => {
    const qs = p.split("=");
    if (obj.hasOwnProperty(qs[0])) obj[qs[0]] = qs[1];
  });

  return obj;
}

// Define extra key-value as string due to dynamic keys
export const stringifyQueryParams  = (obj: queryParamsType & { [key: string]: string }): string => {
  let QS = "?";
  for (let q in obj) {
    if (obj.hasOwnProperty(q)) QS += `${q}=${obj[q]}&`;
  }
  return QS.slice(0, -1);
}
