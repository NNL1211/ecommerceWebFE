import React from 'react'
import UserSideBar from '../../components/UserSideBar'
const AdminDashboardPage = () => {
    return (
        <div className="container-fluid ">
        <div className="row">
          <div className="col-md-2">
            <UserSideBar />
          </div>
          <div className="col">user dashboard page</div>
        </div>
      </div>
    )
}

export default AdminDashboardPage
