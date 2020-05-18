import React from "react";
import { mount } from "enzyme";

import Loader from "Component/Loader";

describe("Loader Component", () => {
  it("renders loader", () => {
    const wrapper = mount(<Loader errorMsg="" isLoading={true}/>);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('p').text()).toEqual("Loading ...");
  });
  
  it("renders error msg", () => {
    const wrapper = mount(<Loader errorMsg="ERROR" isLoading={false}/>);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('p').text()).toEqual("ERROR");
  });

  it("renders no data found", () => {
    const wrapper = mount(<Loader errorMsg="" isLoading={false}/>);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('p').text()).toEqual("No data found");
  });
});
