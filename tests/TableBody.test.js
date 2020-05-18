import React from "react";
import { mount } from "enzyme";

import TableBody from "Component/TableBody";
import candidates from "./candidates.json";
const data = candidates.data.slice(0,10);

describe("TableBody component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<table><TableBody data={data}/></table>);
  });

  it("renders TableBody", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it(`has ${data.length} rows`, () => {
    expect(wrapper.find('tr').length).toEqual(data.length);
  });

  it("renders row data properly", () => {
    const firstRow = wrapper.find('tr:first-child');
    expect(firstRow.find("td").length).toEqual(7);
    expect(firstRow.find("td:first-child").text()).toEqual(data[0].name);
    expect(firstRow.find("td:last-child").text()).toEqual(data[0].status);
    expect(firstRow.find(".age").text()).toEqual("22");
  });
});

describe("Render no data found message", () => {
  it("renders TableBody", () => {
    const wrapper = mount(<table><TableBody data={[]}/></table>);
    expect(wrapper.find('tr').length).toEqual(1);
    expect(wrapper.find('tr td').text()).toEqual("No data found");
  });
});
