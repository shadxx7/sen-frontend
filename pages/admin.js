import React from "react"
import Layout from "../components/Layout"
import FacultyForm from "../components/Forms/faculty"
import CollegeForm from "../components/Forms/college"
import "bootstrap/dist/css/bootstrap.min.css"
import FacultyList from "../components/Lists/faculty"

class AdminDashboard extends React.Component {
  render() {
    return (
      <div>
        <Layout>
          <div style={{ width: 400 }}>
            <FacultyForm />
            <CollegeForm />
            <FacultyList />
          </div>
        </Layout>
      </div>
    )
  }
}

export default AdminDashboard
