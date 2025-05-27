import React from 'react'
import EventContent from '../Components/EventContent'
import DashboardLayout from '../Layouts/dashboard_layout'

function Dashboard() {
  return (
    <DashboardLayout component={EventContent} />
  )
}

export default Dashboard