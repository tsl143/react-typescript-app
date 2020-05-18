import React from "react";
import { RouteComponentProps } from "react-router-dom";

import "../App.css";

import Header from "./Header";
import Table from "./Table";
import Loader from "./Loader";

import { AppStateType, AppStateKeys, QueryParamsType, SortFieldType } from "../types";
import { API_URL, resolveQueryParams, stringifyQueryParams } from "../utility";

export default class App extends React.PureComponent<RouteComponentProps, AppStateType>{
  constructor(props: RouteComponentProps) {
    super(props);
    // Get state of filters and sorts from querystring or fallback to default.
    const stateFromQS = resolveQueryParams(props.location.search);
    this.state = {
      ...stateFromQS,
      data: [],
      errorMsg: "",
      isLoading: true,
      page: 1
    }
  }

  componentDidMount() {
    fetch(API_URL)
    .then(r => {
      if (r.ok) return r.json();
      throw new Error("network Fetch Fail");
    })
    .then(d => {
      if (d.error) throw new Error(`Server Error: ${d.error.message}`);
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
    }));
  }

  // This updates the persistent URL query parameters
  updateURL = (obj: { [key: string]: string }) => {
    // Get state of filters and sorts from querystring or fallback to default.
    // Define extra key-value as string due to dynamic keys
    const stateFromQS: QueryParamsType & { [key: string]: string }
      = resolveQueryParams(this.props.location.search);
    for (let q in obj) {
      stateFromQS[q] = obj[q];
    };
    // Create querystring after updating the params
    const QS = stringifyQueryParams(stateFromQS);
    this.props.history.push({
      pathname: '/',
      search: QS
    });
  }

  changeSort = (field: SortFieldType) => {
    const { sortField, sortOrder } = this.state;
    let newOrder = "ASC";
    if (sortField === field) {
      newOrder = sortOrder === "ASC" ? "DESC" : "ASC";
    }

    this.setState({
      page: 1,
      sortField: field,
      sortOrder: newOrder
    });
    this.updateURL({ sortField: field, sortOrder: newOrder });
  }

  changeFilter = (key: AppStateKeys, value: string) => {
    this.setState(prevState => ({
      ...prevState,
      page: 1,
      [key]: value
    }));
    this.updateURL({ [key]: value });
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
              changeSort={this.changeSort}
              changePage={this.changePage}
            />
          : <Loader errorMsg={errorMsg} isLoading={isLoading}/>
        }
      </div>
    );
  };
};
