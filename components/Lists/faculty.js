import React from "react"
import Link from "next/link"
import {
  Table,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap"
import axios from "axios"
import FacultyForm from "../Forms/faculty"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

class FacultyList extends React.Component {
  state = { faculty: [], modal: false }

  toggle = () => {
    this.setState({ modal: !this.state.modal })
  }

  editClick = (e, id) => {
    this.setState({ modal: true })
  }

  deleteClick = (e, id) => {
    axios
      .delete(`${API_URL}/faculty/${id}`)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    const collegeId = sessionStorage.getItem("COLLEGE_ID")
    axios
      .get(`${API_URL}/college/${collegeId}`)
      .then(response => {
        console.log(response)
        this.setState({ faculty: response.data.faculty })
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    let n = 0
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Edit Faculty</ModalHeader>
          <ModalBody>
            <FacultyForm edit />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Profile</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.faculty.map(item => {
              n++
              return (
                <tr>
                  <th>{n}</th>
                  <td>{item.name}</td>
                  <td>
                    <Link href={`/faculty?id=${item.id}`}>
                      <a>Link</a>
                    </Link>
                  </td>
                  <td>
                    <Button
                      color="primary"
                      onClick={e => this.editClick(e, item.id)}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      color="danger"
                      onClick={e => this.deleteClick(e, item.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default FacultyList
