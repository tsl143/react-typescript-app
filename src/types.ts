export type SortFieldType = "year_of_experience" | "position_applied" | "application_date";
export type StatusType = "approved" | "rejected" | "waiting";

export type QueryParamsType = {
  nameFilter: string;
  positionFilter: string;
  sortField: SortFieldType;
  sortOrder: string;
  statusFilter: StatusType | "";
};

export type AppStateType = QueryParamsType & {
  data: Array<ApplicationType>;
  errorMsg: string;
  isLoading: boolean;
  page: number;
};

export type AppStateKeys = keyof AppStateType;

export type ApplicationType = {
  application_date: string;
  birth_date: string;
  email: string;
  id: number;
  name: string;
  position_applied: string;
  status: StatusType;
  year_of_experience: number;
};

export type TablePropType = QueryParamsType & {
  changeFilter: (field: AppStateKeys, value: string) => void;
  changeSort: (field: SortFieldType) => void;
  changePage: (page: number) => void;
  data: Array<ApplicationType>;
  page: number;
};

export type TableBodyPropType = {
  data: Array<ApplicationType>;
};

export type SortablePropType = {
  handleClick: (field: SortFieldType) => void;
  sortBy: SortFieldType;
  sortField: string;
  sortOrder: string;
  title: string;
};

export type PaginationPropType = {
  changePage: (page: number) => void;
  page: number;
  total: number;
};

export type LoaderPropType = {
  errorMsg: string;
  isLoading: boolean;
};

export type customDateObj = {
  day: number;
  month: number;
  year: number;
};
