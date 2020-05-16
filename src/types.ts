export type SortType = "year_of_experience" | "position_applied" | "application_date";
export type StatusType = "approved" | "rejected" | "waiting";

export type AppStateType = {
  data: Array<ApplicationType>;
  sortField: string;
  sortOrder: string;
  nameFilter: string;
  positionFilter: string;
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


export type TablePropType = {
  data: Array<ApplicationType>;
  changeFilter: (field: AppStateKeys, value: string) => void;
  sort: (field: SortType) => void;
  nameFilter: string;
  positionFilter: string;
  statusFilter: StatusType | "";
};

export type TableBodyPropType = {
  data: Array<ApplicationType>;
};

export type customDateObj = {
  year: number;
  month: number;
  day: number;
}
