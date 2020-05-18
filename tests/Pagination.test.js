import React from "react";
import { mount } from "enzyme";

import Pagination from "Component/Pagination";
import { pageSize } from "src/utility";

const props = {
  page: 1,
  changePage: jest.fn(),
  total: 35
};

const totalPages = Math.ceil(props.total / pageSize);

describe("Pagination Component", () => {
  it("renders Pagination", () => {
    const wrapper = mount(<Pagination { ...props }/>);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("#pagination").exists()).toBe(true);
    expect(wrapper.find("span").text()).toEqual(`Showing ${props.page} of ${totalPages}`);
  });

  it("doesnt render prev for first page", () => {
    const wrapper = mount(<Pagination { ...props }/>);
    expect(wrapper.find(".prev").exists()).toBe(false);
    expect(wrapper.find(".next").exists()).toBe(true);
    wrapper.find(".next").simulate("click");
    expect(props.changePage).toHaveBeenCalledWith(props.page + 1);
  }); 

  it("doesnt render next for last page", () => {
    const newProps = { ...props, page: totalPages };
    const wrapper = mount(<Pagination { ...newProps }/>);
    expect(wrapper.find(".next").exists()).toBe(false);
    expect(wrapper.find(".prev").exists()).toBe(true);
    
    wrapper.find(".prev").simulate("click");
    expect(newProps.changePage).toHaveBeenCalledWith(newProps.page - 1);
  });
});
