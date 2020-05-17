export type SortType = "year_of_experience" | "position_applied" | "application_date";
export type StatusType = "approved" | "rejected" | "waiting";

export type AppStateType = {
  data: Array<ApplicationType>;
  errorMsg: string;
  isLoading: boolean;
  nameFilter: string;
  page: number;
  positionFilter: string;
  sortField: string;
  sortOrder: string;
  statusFilter: StatusType | "";
};

export type AppStateKeys = keyof AppStateType;

export type ApplicationType = {
  id: number;
  name: string;
  email: string;
  birth_date: string;
  year_of_experience: number;
  position_applied: string;
  application_date: string;
  status: StatusType;
};


export type TablePropType = AppStateType & {
  changeFilter: (field: AppStateKeys, value: string) => void;
  sort: (field: SortType) => void;
  changePage: (page: number) => void;
};

export type TableBodyPropType = {
  data: Array<ApplicationType>;
};

export type SortablePropType = {
  title: string;
  sortField: string;
  sortOrder: string;
  handleClick: (e: React.MouseEvent, field: SortType) => void;
  sortBy: SortType;
}

export type PaginationPropType = {
  page: number;
  total: number;
  changePage: (page: number) => void;
}

export type LoaderPropType = {
  errorMsg: string;
  isLoading: boolean;
  len: number;
}

export type customDateObj = {
  year: number;
  month: number;
  day: number;
}
