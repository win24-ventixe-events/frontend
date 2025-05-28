import { HashRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./Pages/Dashboard"
import Bookings from "./Components/Bookings"
import Manage from "./Components/Manage"
import EventContent from "./Components/EventContent"  
import Homepage from "./Pages/Homepage"
import LoginForm from "./Components/LoginForm"

function App() {
    return (
        <>
            <HashRouter>
                <main>
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/login" element={<LoginForm />} />
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