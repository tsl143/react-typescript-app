import React from "react";
import { mount } from "enzyme";

import Sortable from "Component/Sortable";

const props = {
  title: "TEST",
  handleClick: jest.fn(),
  sortBy: "position_applied",
  sortField: "",
  sortOrder: "ASC"
}

describe("Render", () => {
  it("renders Sortable", () => {
    const wrapper = mount(<Sortable { ...props }/>);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(".sortable").exists()).toBe(true);
    expect(wrapper.find('span').text()).toEqual(props.title);
  });
  
  it("handles click", () => {
    const wrapper = mount(<Sortable { ...props }/>);
    wrapper.find("span").simulate("click");
    expect(props.handleClick).toHaveBeenCalledWith(props.sortBy);
  });

  it("render asc class", () => {
    const newProps = { ...props, sortField: "position_applied" };
    const wrapper = mount(<Sortable { ...newProps }/>);
    expect(wrapper.find("span").hasClass("asc")).toBe(true);
    expect(wrapper.find("span").hasClass("desc")).toBe(false);
  });

  it("render desc class", () => {
    const newProps = { ...props, sortField: "position_applied", sortOrder: "DESC" };
    const wrapper = mount(<Sortable { ...newProps }/>);
    expect(wrapper.find("span").hasClass("desc")).toBe(true);
    expect(wrapper.find("span").hasClass("asc")).toBe(false);
  });
});
