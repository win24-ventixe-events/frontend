import { HashRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./Pages/Dashboard"
import Bookings from "./Pages/Bookings"
import Manage from "./Pages/Manage.jsx"

function App() {

return (
    <HashRouter>
        <main>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/my_bookings" element={<Bookings />} />
                <Route path="/admin_manage" element={<Manage />} />
            </Routes>
        </main>
    </HashRouter>
        
    )
}

export default App