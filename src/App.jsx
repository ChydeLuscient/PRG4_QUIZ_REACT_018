import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeaderComponent from './components/templates/HeaderComponent';
import FooterComponent from './components/templates/FooterComponent';
import ListInovasiComponent from './components/inovasi/ListInovasiComponent';
import AddInovasiComponent from './components/inovasi/AddInovasiComponent';
import EditInovasiComponent from './components/inovasi/EditInovasiComponent';


function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <HeaderComponent />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<ListInovasiComponent />} />
            <Route path="/list-inovasi" element={<ListInovasiComponent />} />
            <Route path="/add-inovasi" element={<AddInovasiComponent />} />
            <Route path="/edit-inovasi/:id" element={<EditInovasiComponent />} />
          </Routes>
        </div>
        <FooterComponent />
      </div>
    </Router>
  );
}

export default App;