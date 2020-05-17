export type sortFieldType = "year_of_experience" | "position_applied" | "application_date";
export type StatusType = "approved" | "rejected" | "waiting";

export type queryParamsType = {
  nameFilter: string;
  positionFilter: string;
  sortField: sortFieldType;
  sortOrder: string;
  statusFilter: StatusType | "";
};

export type AppStateType = queryParamsType & {
  data: Array<ApplicationType>;
  errorMsg: string;
  isLoading: boolean;
  page: number;
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
  changeSort: (field: sortFieldType) => void;
  changePage: (page: number) => void;
};

export type TableBodyPropType = {
  data: Array<ApplicationType>;
};

export type SortablePropType = {
  title: string;
  sortField: string;
  sortOrder: string;
  handleClick: (e: React.MouseEvent, field: sortFieldType) => void;
  sortBy: sortFieldType;
}

export type PaginationPropType = {
  page: number;
  total: number;
  changePage: (page: number) => void;
}

export type LoaderPropType = {
  errorMsg: string;
  isLoading: boolean;
}

export type customDateObj = {
  year: number;
  month: number;
  day: number;
}
