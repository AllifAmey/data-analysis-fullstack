import {
  createRoutesFromElements,
  RouterProvider,
  Route,
  createBrowserRouter,
} from "react-router-dom";

import "./App.css";

import HomePage from "./data projects/HomePage";

import Kluster from "./data projects/Kluster/pages/Kluster/Kluster";
import YellowSubHydro from "./data projects/YellowSubHydro/APIs/pages/YellowSubHydro/YellowSubHydro";

const routeDefinition = createRoutesFromElements(
  <Route>
    <Route path="/" element={<HomePage />} />
    <Route path="/project/kluster" element={<Kluster />} />
    <Route path="/project/yellowsubhydro" element={<YellowSubHydro />} />
  </Route>
);

const router = createBrowserRouter(routeDefinition);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
