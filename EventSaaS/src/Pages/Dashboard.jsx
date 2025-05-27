
import DashboardNav from '../Components/DashboardNav'


function Dashboard({ ContentComponent }) {
    return (
        <div className='wrapper dashboard'>
            <DashboardNav />
            <div className="title-section">
                <p className="welcome-msg">
                    Welcome, User/Admin
                </p>
            </div>
            {ContentComponent ? <ContentComponent /> : <div>Sorry there has been an error</div>}
        </div>
    )
}

export default Dashboard