import {
  createRoutesFromElements,
  RouterProvider,
  Route,
  createBrowserRouter,
} from "react-router-dom";

import HomePage from "./components/HomePage";
import NewHomePage from "./components/SophiaHomePage";
import CryptoFinance from "./components/data projects/CryptoFinance/CryptoFinance";
import Kluster from "./components/data projects/Kluster/pages/Kluster/Kluster";
import YellowSubHydroMain from "./components/data projects/YellowSubHydro/pages/YellowSubHydroMain/YellowSubHydroMain";
import YellowSubHydroIndividual from "./components/data projects/YellowSubHydro/pages/YellowSubHydroIndividual/YellowSubHydroIndividual";
import YellowSubHydroRouting from "./components/data projects/YellowSubHydro/pages/YellowSubHydroRouting/YellowSubHydroRouting";
import FrontendMain from "./components/frontend projects/FrontendMain";
import EmpowerWomanHome from "./components/frontend projects/EmpowerWoman/EmpowerWomanHome";
import EmpowerWomanAccountRouting from "./components/frontend projects/EmpowerWoman/pages/EmpowerWomanAccountRouting/EmpowerWomanAccountRouting";
import EmpowerWomanUser from "./components/frontend projects/EmpowerWoman/pages/EmpowerWomanAccountRouting/utility/EmpowerWomanUser";
import EmpowerWomanAdmin from "./components/frontend projects/EmpowerWoman/pages/EmpowerWomanAccountRouting/utility/EmpowerWomanAdmin";
import HorseRacing from "./components/frontend projects/HorseRacing/HorseRacing";

const routeDefinition = createRoutesFromElements(
  <Route>
    <Route path="/" element={<HomePage />} />
    <Route path="/NewHome" element={<NewHomePage />} />
    <Route path="/frontend" element={<FrontendMain />} />
    <Route path="/frontend/HorseRacing" element={<HorseRacing />} />
    <Route path="/frontend/EmpowerWomanHome" element={<EmpowerWomanHome />} />
    <Route
      path="/frontend/EmpowerWomanHome/account/:accessAccount"
      element={<EmpowerWomanAccountRouting />}
    />
    <Route
      path="/fronted/EmpowerWomanHome/account/member/:accountName"
      element={<EmpowerWomanUser />}
    />
    <Route
      path="/frontend/EmpowerWomanHome/account/admin/:accountName"
      element={<EmpowerWomanAdmin />}
    />
    <Route path="/project/kluster" element={<Kluster />} />
    <Route path="/project/cryptoFinance" element={<CryptoFinance />} />
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
