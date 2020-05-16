import { ApplicationType, SortType } from "./types";

export const sortArray = (data: Array<ApplicationType>, field: SortType, order: string) => {
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