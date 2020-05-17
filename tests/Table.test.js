import React from "react";
import { mount } from "enzyme";

import candidates from "./candidates.json";
import Table from "Component/Table";

const props = {
  data: [],
  changeFilter: jest.fn(),
  changePage: jest.fn(),
  changeSort: jest.fn(),
  nameFilter: "",
  page: 1,
  positionFilter: "",
  sortField: "application_date",
  sortOrder: "ASC",
  statusFilter: ""
};

describe("Table Component", () => {
  it("renders Table", () => {
    const wrapper = mount(<Table { ...props } />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("#applicationTable").exists()).toBe(true);
  });

  it("handles filter input", () => {
    const wrapper = mount(<Table { ...props } />);
    wrapper.find("input.name").simulate("change", { target: { value: "alv" } });
    expect(props.changeFilter).toHaveBeenCalledWith("nameFilter", "alv");
    wrapper.find("input.position").simulate("change", { target: { value: "tech" } });
    expect(props.changeFilter).toHaveBeenCalledWith("positionFilter", "tech");
  });

  it("handles filter select", () => {
    const wrapper = mount(<Table { ...props } />);
    wrapper.find("select").simulate("change", { target: { value: "status" } });
    expect(props.changeFilter).toHaveBeenCalledWith("statusFilter", "status");
  });

  it("handles sort click", () => {
    const wrapper = mount(<Table { ...props } />);
    let x=0;
    [
      "year_of_experience",
      "position_applied",
      "application_date"
    ].forEach(sortBy => {
      const sortable = wrapper.find(`.sortable.${sortBy}`);
      sortable.simulate("click");
      expect(props.changeSort).toHaveBeenCalledWith(sortBy);
    })
  });

  it("handles prefilled status filter", () => {
    const newProps = { ...props, data: candidates.data, statusFilter: "waiting" };
    const wrapper = mount(<Table { ...newProps } />);
    const rows = wrapper.find("tbody tr");
    rows.forEach(row => {
      expect(row.find("td:last-child").text()).toEqual("waiting");
    });
  });
});
