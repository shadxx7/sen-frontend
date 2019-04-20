import React from "react"
import CollegeAdmin from "../components/Dashboard/college"
import SystemAdmin from "../components/Dashboard/system"
import "bootstrap/dist/css/bootstrap.min.css"

class AdminDashboard extends React.Component {
  state = { type: "", element: "" }

  componentDidMount() {
    const { type, element } = this.props.url.query
    this.setState({ type, element })
  }

  componentDidUpdate(prevProps) {
    const { type, element } = this.props.url.query
    if (this.props !== prevProps) {
      this.setState({ type, element })
    }
  }

  render() {
    let element
    const { type } = this.state
    if (type === "system")
      element = <SystemAdmin element={this.state.element} />
    else if (type === "college")
      element = <CollegeAdmin element={this.state.element} />
    return <div>{element}</div>
  }
}

export default AdminDashboard
