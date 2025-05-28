import { HashRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./Pages/Dashboard"
import Bookings from "./Components/Bookings"
import Manage from "./Components/Manage"
import EventContent from "./Components/EventContent"  
import Signup from "./Pages/Signup"
import LoginPage from "./Pages/LoginPage"
import Homepage from "./Pages/Homepage"

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
                        <Route path="/admin_manage" element={<Dashboard ContentComponent={Manage} />} />
                    </Routes>
                </main>
            </HashRouter>
        </>
        
    )
}

export default App