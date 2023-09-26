import "./css/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landingpage from "./landingpage";
import Daa from "./postview";
import "bootstrap/dist/css/bootstrap.min.css";

import Addpost from "./form";
import { NameProvider } from "./NameContext";

function App() {
  return (
    <BrowserRouter>
      <NameProvider>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/postview" element={<Daa />} />

          <Route path="/form" element={<Addpost />} />
        </Routes>
      </NameProvider>
    </BrowserRouter>
  );
}

export default App;
