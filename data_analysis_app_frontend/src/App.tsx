import {
  createRoutesFromElements,
  RouterProvider,
  Route,
  createBrowserRouter,
} from "react-router-dom";

import HomePage from "./components/HomePage";
import Kluster from "./components/data projects/Kluster/pages/Kluster/Kluster";
import YellowSubHydroMain from "./components/data projects/YellowSubHydro/pages/YellowSubHydroMain/YellowSubHydroMain";
import YellowSubHydroIndividual from "./components/data projects/YellowSubHydro/pages/YellowSubHydroIndividual/YellowSubHydroIndividual";
import YellowSubHydroRouting from "./components/data projects/YellowSubHydro/pages/YellowSubHydroRouting/YellowSubHydroRouting";
import MimicMain from "./components/mimic projects/MimicMain";
import EmpowerWomanHome from "./components/mimic projects/EmpowerWoman/EmpowerWomanHome";
import EmpowerWomanAccountRouting from "./components/mimic projects/EmpowerWoman/pages/EmpowerWomanAccountRouting/EmpowerWomanAccountRouting";

const routeDefinition = createRoutesFromElements(
  <Route>
    <Route path="/" element={<HomePage />} />
    <Route path="/mimics" element={<MimicMain />} />
    <Route path="/mimics/EmpowerWomanHome" element={<EmpowerWomanHome />} />
    <Route
      path="/mimics/EmpowerWomanHome/:accessAccount"
      element={<EmpowerWomanAccountRouting />}
    />
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
