import { Route, Routes } from "react-router-dom";
import NotFound from "./Pages/NotFound";
import ChartPage from "./Pages/ChartPage";
import ListPage from "./Pages/ListPage";
import "./Style/Style.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path="/chart/:id" element={<ChartPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
