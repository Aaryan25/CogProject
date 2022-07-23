import Login from "./components/Login";
import Register from "./components/Register";
import Admindashboard from "./components/Admindashboard";
import StudentDashboard from "./components/StudentDashboard";
import TutorDashboard from "./components/TutorDashboard";
import Help from "./components/Help";
import HelpResolve from "./components/HelpResolve";
import Classroom from "./components/Classroom";


import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Topics from "./components/Topics";
function App() {
  return (
    <Router>
      <Navbar />
            <div>
                <Routes>
                    <Route exact path="/" element={ <Login /> } />
                    <Route path="/login" element={ <Login /> } />
                    <Route path="/register" element={ <Register /> } />
                    <Route path="/admindashboard" element={ <Admindashboard /> } />
                    <Route path="/studentdashboard" element={ <StudentDashboard /> } />
                    <Route path="/tutordashboard" element={ <TutorDashboard /> } />
                    <Route path="/tutordashboard/help" element={ <Help /> } />
                    <Route path="/studentdashboard/help" element={ <Help /> } />
                    <Route path="/admindashboard/helpresolve" element={ <HelpResolve /> } />
                    <Route path="/tutordashboard/classroom" element={ <Classroom /> } />
                    <Route path="/admindashboard/topics" element={ <Topics /> } />

                    
                </Routes>
            </div>
        </Router>
  );
}

export default App;
