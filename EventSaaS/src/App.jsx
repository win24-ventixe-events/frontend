import { HashRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./Pages/Dashboard"
import Bookings from "./Components/Bookings"
import EventContent from "./Components/EventContent"  
import Signup from "./Pages/Signup"
import LoginPage from "./Pages/LoginPage"
import Homepage from "./Pages/Homepage"
import MoreInfo from "./Pages/MoreInfo"
import Success from "./Pages/Success"

function App() {
    return (
        <>
            <HashRouter>
                <main>
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/events" element={<Dashboard ContentComponent={EventContent} />} />
                        <Route path="/my_bookings" element={<Dashboard ContentComponent={Bookings} />} />
                        <Route path="/more_info" element={<MoreInfo />} />
                        <Route path="/success" element={<Success />} />
                    </Routes>
                </main>
            </HashRouter>
        </>
        
    )
}

export default App