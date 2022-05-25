import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import Soon from "./routes/soon";
import UniversScale from './routes/universe_scale';
import Terms from './routes/terms';
import PlanetAge from './routes/planetage'
import Timeline from './routes/timline';

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/soon" element={<Soon />} />
      <Route path="/universe_scale" element={<UniversScale />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/planetage" element={<PlanetAge />} />
      <Route path="/timeline" element={<Timeline />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);