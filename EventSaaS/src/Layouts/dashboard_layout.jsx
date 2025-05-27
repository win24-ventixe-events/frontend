import DashboardNav from '../Components/DashboardNav'
import EventCard from '../Components/EventCard'
import EventContent from '../Components/EventContent'

function dashboard_layout({component}) {
  return (
    <div className='wrapper dashboard'>
        <DashboardNav />
        <div className="title-section">
            <p className="welcome-msg">
                Welcome, User/Admin
            </p>
        </div>
        <component />
    </div>
  )
}

export default dashboard_layout