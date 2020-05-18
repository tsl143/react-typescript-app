import { resolveQueryParams, stringifyQueryParams } from "src/utility";

describe("Utility functions", () => {
  it("checks resolveQueryParams", () => {
    const correctObj =
      resolveQueryParams("?nameFilter=test&positionFilter=&statusFilter=&sortField=application_date&sortOrder=DESC");
    expect(correctObj).toEqual({
      nameFilter: "test",
      positionFilter: "",
      statusFilter: "",
      sortField: "application_date",
      sortOrder: "DESC"
    });

    // Use `spam` key instead of `nameFilter` which should not be included in obj.
    const spamObj =
      resolveQueryParams("?spam=test&positionFilter=&statusFilter=&sortField=application_date&sortOrder=DESC");
    expect(spamObj).toEqual({
      nameFilter: "",
      positionFilter: "",
      statusFilter: "",
      sortField: "application_date",
      sortOrder: "DESC"
    });
  });

  it("checks stringifyQueryParams", () => {
    const correctStr = stringifyQueryParams({
      nameFilter: "test",
      positionFilter: "",
      statusFilter: "",
      sortField: "application_date",
      sortOrder: "DESC"
    })

    expect(correctStr).toEqual("?nameFilter=test&positionFilter=&statusFilter=&sortField=application_date&sortOrder=DESC");

    // Use `extra` key additionally which should not be part of QS.
    const spamStr = stringifyQueryParams({
      nameFilter: "test",
      positionFilter: "",
      statusFilter: "",
      sortField: "application_date",
      sortOrder: "DESC",
      extra: 123
    })

    expect(spamStr).toEqual("?nameFilter=test&positionFilter=&statusFilter=&sortField=application_date&sortOrder=DESC");
  });
});
