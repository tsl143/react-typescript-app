## A demo React-Typescript App

This is a basic React app to explain the usage of Typescript with React.  
This deliberately is not made with `create-react-app` to understand the packages required.
This app fetches data from API(for this demo I am serving the API from dev-server) and displays it as a table.  

This demonstrates an example for the following:
- React
- Typescript
- Jest
- Enzyme
- Webpack

<br/>

### Prerequisite
- `node >= 10.14.2`
- `yarn` (or `npm` is also fine)

### Getting started

  | Command                     | Description              |
  |-----------------------------|--------------------------|
  | `yarn install`              | Install all dependencies |
  | `yarn start`                | Starts dev server 		   |
  | `yarn test`                 | run test cases         	 |
  | `yarn coverage`             | run tests and coverage	 |


### Structure
The state of the complete app is maintained in the `App` component. Query parameters are used to setup initial state (fallback to default in case none present).
Once the component is mounted the data is fetched. If the data is not as expected or fetch fails, the error message is shown.
Once the data is fetched its set up in state and `Table` component is loaded.
All the filters and sorters are passed as props to `Table` component and based on that the component filters and sorts the data, the original data remains intact in the App state.
`Table` component also takes care of pagination, as per page it slices the data and passes it to `TableBody` component which in turn renders the table body UI.
The `Table` component also renders the `thead` with filters and sorters (in the form of `Sortable` component) and `Pagination` component.
All the actions are passed from the `App` component and in case of `click` or `change` events these are fired and the `App` state is changed accordingly.
These actions after updating the `App` state updates the URL with the help of `history`, so as to make the user choice persistent.

### Flexibility
- It easy to add new sorter, adding a sort field type and including a `Sortable` component will take care of everything.
- New Filters can be added reusing current functionality, both as input type text or select box.

### Tests
- Unit tests are written for all the components with 100% coverage.
- Enzyme + Jest setup has been used for writing tests.
- `fetch` is mocked globally and spyed for success/fail/error messages.
- Since `css` imports are used, `identity-obj-proxy` is used to handle them.

### Optimization
- Every component except the `App` component is a stateless functional component.
- Memoization is used to prevent unnecessary re-renders.

### Enhancements
- All the data is dumped with a single fetch call, server side pagination would improve performance.
- Better Pagination experience with pills structure.
- More filters can be added, eG: for email.
- There are no validations in `Input`, adding some will help.
- UI can be improved. eG: The table fluctuates in size with each change.
- The `App.css` houses all the CSS rules, this can be split.
- A few plugins can be added to webpack for optimizing production code like `uglifyjs-webpack-plugin`.
