import React from "react";

import "../App.css";
import { AppStateType, AppStateKeys, SortType } from "../types";
import { sortArray } from "../utility";

import Header from "./Header";
import Table from "./Table";
import Loader from "./Loader";

export default class App extends React.PureComponent<{}, AppStateType>{

  constructor(props: {}) {
    super(props);
    this.state = {
      data: [],
      errorMsg: "",
      isLoading: true,
      nameFilter: "",
      page: 1,
      positionFilter: "",
      sortField: "",
      sortOrder: "ASC",
      statusFilter: ""
    }
  }

  componentDidMount() {
    fetch("http://localhost:8112/candidates.json")
    .then(r => {
      if (r.ok) return r.json();
      throw new Error("network Fetch Fail");
    })
    .then(d => {
      if (!d.data) throw new Error("Unexpected JSON format");
      this.setState({
        data: d.data,
        errorMsg: "",
        isLoading: false
      })
    })
    .catch(e => this.setState({
      isLoading: false,
      errorMsg: e.toString()
    }))
  }

  // Sorts the data and update field and order in state.
  sort = (field: SortType) => {
    const { data, sortField, sortOrder } = this.state;
    let newOrder = "ASC";
    if (sortField === field) {
      newOrder = sortOrder === "ASC" ? "DESC" : "ASC";
    }
    const sortedData = sortArray(data, field, newOrder);
    this.setState({
      data: sortedData,
      page: 1,
      sortField: field,
      sortOrder: newOrder
    })
  }

  changeFilter = (key: AppStateKeys, value: string) => {
    this.setState(prevState => ({
      ...prevState,
      page: 1,
      [key]: value,
    }));
  }

  changePage = (page: number) => this.setState({ page });

  render() {
    const { data, errorMsg, isLoading } = this.state;

    return (
      <div className="App">
        <Header/>
        {
          (data.length && !isLoading)
          ? <Table
              { ...this.state }
              changeFilter={this.changeFilter}
              sort={this.sort}
              changePage={this.changePage}
            />
          : <Loader len={data.length} errorMsg={errorMsg} isLoading={isLoading}/>
        }
      </div>
    );
  }
}
