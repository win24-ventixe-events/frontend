import LoginButton from './LoginButton'

function DashboardNav() {
  return (
    <div className='dashboard-nav-container'>
        <div className='logo-container'>
            <a href="/">
                <img src="./src/assets/images/Logo.svg" alt="logo" />
            </a>
        </div>
        <nav className="dashboard-nav">
            <ul>
                <li><a className='nav-item' href="/">Events</a></li>
                <li><a className='nav-item' href="/#/my_bookings">Your Bookings</a></li>
                <li><a className='nav-item' href="/#/admin_manage">Manage Bookings</a></li>
            </ul>
        </nav>
        <LoginButton label="Login" />
    </div>
  )
}

export default DashboardNav