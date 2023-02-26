import {
  createRoutesFromElements,
  RouterProvider,
  Route,
  createBrowserRouter,
} from "react-router-dom";

import "./App.css";

import HomePage from "./data projects/HomePage";
import Kluster from "./data projects/Kluster/pages/Kluster";

const routeDefinition = createRoutesFromElements(
  <Route>
    <Route path="/" element={<HomePage />} />
    <Route path="/project/kluster" element={<Kluster />} />
  </Route>
);

const router = createBrowserRouter(routeDefinition);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
