import React from "react";
import { mount } from "enzyme";

import candidates from "./candidates.json";
import App from "Component/App";
import Header from "Component/Header";
import Table from "Component/Table";
import Loader from "Component/Loader";

const history = {
  push: jest.fn()
};

describe("App Component", () => {
  let AppComponent;

  beforeEach(() => {
    AppComponent = mount(<App history={history} location={{search: ""}}/>);
  });

  it("data is fetched only once", () => {
    // Since the fetch is mocked globally,
    // this test must be executed on first mount only.
    // On every mount fetch is called and fetch
    // `callTimes` is increased accordingly hence this
    // test will fail if put anywhere else.
    // This can also be achieved by using `fetch.mockClear`
    // in beforeEach.
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("renders App", () => {
    expect(AppComponent.exists()).toBe(true);
  });
  
  it("renders Components", () => {
    expect(AppComponent.find(Header).exists()).toBe(true);
    expect(AppComponent.find(Loader).exists()).toBe(true);
    expect(AppComponent.find(Table).exists()).toBe(false);
  });

  it("Class functions checks", () => {
    const instance = AppComponent.instance();

    instance.changePage(3);
    expect(AppComponent.state().page).toBe(3);

    // First state is application_date | DESC
    // On first changeSort state should be position_applied | ASC
    // On second changeSort state should be position_applied | DESC
    // On third changeSort state should be back to position_applied | ASC
    ["ASC", "DESC", "ASC"].forEach(order => {
      instance.changeSort("position_applied");
      expect(AppComponent.state().sortField).toBe("position_applied");
      expect(AppComponent.state().sortOrder).toBe(order);
      // This checks if update URL was called
      expect(history.push).toHaveBeenCalledWith({
        "pathname": "/",
        "search": `?nameFilter=&positionFilter=&statusFilter=&sortField=position_applied&sortOrder=${order}`
      });
    })

    instance.changeFilter("nameFilter", "test");
    expect(AppComponent.state().nameFilter).toBe("test");
    expect(history.push).toHaveBeenCalledWith({
      "pathname": "/",
      "search": "?nameFilter=test&positionFilter=&statusFilter=&sortField=application_date&sortOrder=DESC"
    });
  })
});

describe("Fetches data", () => {
  it("sets data on successful fetch", () => {
    const wrapper = mount(<App location={{search: ""}}/>);

    // isLoading should be set to true when fetch starts
    expect(wrapper.state().isLoading).toBe(true);

    process.nextTick(() => {
      expect(wrapper.state().isLoading).toBe(false);
      expect(wrapper.state().data.length).toEqual(candidates.data.length);
    });
  });

  it("shows error on fetch fail", () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve({ ok: false }));
    const wrapper = mount(<App location={{search: ""}}/>);

    process.nextTick(() => {
      expect(wrapper.state().errorMsg).toEqual("Error: network Fetch Fail");
    });
  });

  it("shows JSON format error on fetch fail", () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ random: 123}),
      }));
    const wrapper = mount(<App location={{search: ""}}/>);

    process.nextTick(() => {
      expect(wrapper.state().errorMsg).toEqual("Error: Unexpected JSON format");
    });
  });

  it("shows server error on fetch fail", () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ error: { message: "fatal!"}}),
      }));
    const wrapper = mount(<App location={{search: ""}}/>);

    process.nextTick(() => {
      expect(wrapper.state().errorMsg).toEqual("Error: Server Error: fatal!");
    });
  });
});
