import {
  createRoutesFromElements,
  RouterProvider,
  Route,
  createBrowserRouter,
} from "react-router-dom";

import "./App.css";

import HomePage from "./data projects/HomePage";
import Kluster from "./data projects/Kluster/pages/Kluster/Kluster";
import YellowSubHydroMain from "./data projects/YellowSubHydro/pages/YellowSubHydroMain/YellowSubHydroMain";
import YellowSubHydroIndividual from "./data projects/YellowSubHydro/pages/YellowSubHydroIndividual/YellowSubHydroIndividual";
import YellowSubHydroRouting from "./data projects/YellowSubHydro/pages/YellowSubHydroRouting/YellowSubHydroRouting";

const routeDefinition = createRoutesFromElements(
  <Route>
    <Route path="/" element={<HomePage />} />
    <Route path="/project/kluster" element={<Kluster />} />
    <Route path="/project/yellowsubhydro" element={<YellowSubHydroMain />} />
    <Route
      path="/project/yellowsubhydro/seperate"
      element={<YellowSubHydroRouting />}
    />
    <Route
      path="/project/yellowsubhydro/seperate/:county"
      element={<YellowSubHydroIndividual />}
    />
  </Route>
);

const router = createBrowserRouter(routeDefinition);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
