import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import TrackComplaint from "./pages/track";

function App() {

  return (
   <Routes>
     <Route path="/" element={<Home />}/>
     <Route path="/track-complaint" element={<TrackComplaint />}/>
   </Routes>
  )
}

export default App
