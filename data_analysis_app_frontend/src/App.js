import {
  createRoutesFromElements,
  RouterProvider,
  Route,
  createBrowserRouter,
} from "react-router-dom";

import "./App.css";

import HomePage from "./data projects/HomePage";
import Kluster from "./data projects/Kluster/pages/Kluster/Kluster";
import YellowSubHydro from "./data projects/YellowSubHydro/pages/YellowSubHydro/YellowSubHydro";
import YellowSubHydroSeperate from "./data projects/YellowSubHydro/pages/DashBoardSeperate/YellowSubHydroSeperate";
import YellowSubHydroRouting from "./data projects/YellowSubHydro/pages/DashBoardSeperate/YellowSubHydroRouting";

const routeDefinition = createRoutesFromElements(
  <Route>
    <Route path="/" element={<HomePage />} />
    <Route path="/project/kluster" element={<Kluster />} />
    <Route path="/project/yellowsubhydro" element={<YellowSubHydro />} />
    <Route
      path="/project/yellowsubhydro/seperate"
      element={<YellowSubHydroRouting />}
    />
    <Route
      path="/project/yellowsubhydro/seperate/:county"
      element={<YellowSubHydroSeperate />}
    />
  </Route>
);

const router = createBrowserRouter(routeDefinition);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
