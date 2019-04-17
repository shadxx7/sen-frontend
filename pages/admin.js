import React from "react"
import CollegeAdmin from "../components/Dashboard/college"
import SystemAdmin from "../components/Dashboard/system"
import "bootstrap/dist/css/bootstrap.min.css"

class AdminDashboard extends React.Component {
  state = { type: "" }

  componentDidMount() {
    const college = sessionStorage.getItem("COLLEGE_ID")
    let type
    if (college) type = "college"
    else type = "system"
    return this.setState({ type })
  }
  render() {
    let element
    console.log(this.state.type)
    const { type } = this.state
    if (type === "system") element = <SystemAdmin />
    else if (type === "college") element = <CollegeAdmin />
    return <div>{element}</div>
  }
}

export default AdminDashboard
