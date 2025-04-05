import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddBeer from './pages/AddBeer';
import Ranking from './pages/Ranking';
import EditBeer from './pages/EditBeer';
import ContactUs from './pages/ContactUs';




export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    <Routes>
      <Route path="/add-beer" element={<AddBeer />} />
    </Routes>
    <Routes>
      <Route path="/ranking" element={<Ranking />} />
    </Routes>
    <Routes>
      <Route path="/edit-beer/:beerName" element={<EditBeer />} /> {}
    </Routes>
    <Routes>
      <Route path="/contact-us" element={<ContactUs />} /> {}
    </Routes>
  </BrowserRouter>
  )
}

