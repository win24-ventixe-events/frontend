import { HashRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./Pages/Dashboard"
import Bookings from "./Pages/Bookings"
import Manage from "./Pages/Manage"
import EventContent from "./Components/EventContent"  

function App() {
    return (
        <>
            <HashRouter>
                <main>
                    <Routes>
                        <Route path="/" element={<Dashboard ContentComponent={EventContent} />} />
                        <Route path="/my_bookings" element={<Dashboard ContentComponent={EventContent} />} />
                        <Route path="/admin_manage" element={<Dashboard ContentComponent={EventContent} />} />
                    </Routes>
                </main>
            </HashRouter>
        </>
        
    )
}

export default App