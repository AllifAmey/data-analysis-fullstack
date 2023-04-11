import {
  createRoutesFromElements,
  RouterProvider,
  Route,
  createBrowserRouter,
} from "react-router-dom";

import HomePage from "./components/data projects/HomePage";
import Kluster from "./components/data projects/Kluster/pages/Kluster/Kluster";
import YellowSubHydroMain from "./components/data projects/YellowSubHydro/pages/YellowSubHydroMain/YellowSubHydroMain";
import YellowSubHydroIndividual from "./components/data projects/YellowSubHydro/pages/YellowSubHydroIndividual/YellowSubHydroIndividual";
import YellowSubHydroRouting from "./components/data projects/YellowSubHydro/pages/YellowSubHydroRouting/YellowSubHydroRouting";

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
// <RouterProvider router={router} />
function App() {
  return <RouterProvider router={router} />;
}

export default App;
