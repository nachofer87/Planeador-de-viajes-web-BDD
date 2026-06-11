import { Router } from "preact-router";

import Planeador from "./components/Planeador/Planeador";

import Inicio from "./pages/Inicio";
import Personas from "./pages/Personas";

export default function App() {
  return (
    <>
      <Planeador />

      <Router>
        <Inicio path="/" />
        <Personas path="/personas" />
      </Router>
    </>
  );
}