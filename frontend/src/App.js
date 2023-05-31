import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListFilme from "./components/ListFilme";
import AddFilme from "./components/AddFilme";
import EditFilme from "./components/EditFilme";
import Footer from "./components/common/Footer";

function App() {
  return (
    <BrowserRouter>

      <div className="container">
        <Routes>
          <Route path="/" element={<ListFilme />} />
          <Route path="add" element={<AddFilme />} />
          <Route path="edit/:id" element={<EditFilme />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
