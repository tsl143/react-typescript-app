/* globals global */
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import candidates from "../candidates.json";

configure({ adapter: new Adapter() });

// Mock fetch to provide sample results
// Additionally this will help us to spy on fetch calls
const mockFetch = Promise.resolve({
  ok: true,
  json: () => Promise.resolve(candidates),
});

global.fetch = jest.fn().mockImplementation(() => mockFetch);
