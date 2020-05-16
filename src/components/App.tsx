import React from "react";

import "../App.css";
import { AppStateType, AppStateKeys, SortType } from "../types";
import { sortArray } from "../utility";

import Header from "./Header";
import Table from "./Table";

export default class App extends React.PureComponent<{}, AppStateType>{

  constructor(props: {}) {
    super(props);
    this.state = {
      data: [],
      sortField: "",
      sortOrder: "ASC",
      nameFilter: "",
      positionFilter: "",
      statusFilter: ""
    }
  }

  componentDidMount() {
    fetch("http://localhost:8112/candidates.json")
    .then(r => r.json())
    .then(d => this.setState({data: d.data}))
  }

  // Sorts the data and update field and order in state.
  sort = (field: SortType) => {
    const { data, sortField, sortOrder } = this.state;
    let newOrder = "ASC";
    if (sortField === field) {
      newOrder = sortOrder === "ASC" ? "DESC" : "ASC";
    }
    const sortedData = sortArray(data, field, newOrder);
    this.setState({ data: sortedData, sortField: field, sortOrder: newOrder })
  }

  changeFilter = (key: AppStateKeys, value: string) => {
    this.setState(prevState => ({
      ...prevState,
      [key]: value,
    }));
  }

  render() {
    const { data, nameFilter, positionFilter, statusFilter } = this.state;

    return (
      <div className="App">
        <Header/>
        <Table
          data={data}
          changeFilter={this.changeFilter}
          sort={this.sort}
          nameFilter={nameFilter}
          positionFilter={positionFilter}
          statusFilter={statusFilter}
        />
      </div>
    );
  }
}
