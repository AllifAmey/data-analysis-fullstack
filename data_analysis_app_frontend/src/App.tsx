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
import MimicMain from "./components/frontend projects/MimicMain";
import EmpowerWomanHome from "./components/frontend projects/EmpowerWoman/EmpowerWomanHome";
import EmpowerWomanAccountRouting from "./components/frontend projects/EmpowerWoman/pages/EmpowerWomanAccountRouting/EmpowerWomanAccountRouting";
import EmpowerWomanUser from "./components/frontend projects/EmpowerWoman/pages/EmpowerWomanAccountRouting/utility/EmpowerWomanUser";
import EmpowerWomanAdmin from "./components/frontend projects/EmpowerWoman/pages/EmpowerWomanAccountRouting/utility/EmpowerWomanAdmin";

const routeDefinition = createRoutesFromElements(
  <Route>
    <Route path="/" element={<HomePage />} />
    <Route path="/NewHome" element={<NewHomePage />} />
    <Route path="/mimics" element={<MimicMain />} />
    <Route path="/mimics/EmpowerWomanHome" element={<EmpowerWomanHome />} />
    <Route
      path="/mimics/EmpowerWomanHome/account/:accessAccount"
      element={<EmpowerWomanAccountRouting />}
    />
    <Route
      path="/mimics/EmpowerWomanHome/account/member/:accountName"
      element={<EmpowerWomanUser />}
    />
    <Route
      path="/mimics/EmpowerWomanHome/account/admin/:accountName"
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
