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
import { Timeline, TimelineSwitch } from './routes/timline';
import LightPollution from './routes/lightpollution';

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/soon" element={<Soon />} />
      <Route path="/universe_scale" element={<UniversScale />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/planetage" element={<PlanetAge />} />
      <Route path="/timeline" element={<TimelineSwitch />} />
      <Route path="/timeline/:TLID" element={<Timeline />} />
      <Route path="/lightpollution" element={<LightPollution />} />

    </Routes>
  </BrowserRouter>,
  rootElement
);