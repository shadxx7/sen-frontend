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
import CollegeForm from "../Forms/college"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

class CollegeList extends React.Component {
  state = { college: [], modal: false }

  toggle = () => {
    this.setState({ modal: !this.state.modal })
  }

  editClick = (e, id) => {
    this.setState({ modal: true })
  }

  deleteClick = (e, id) => {
    axios
      .delete(`${API_URL}/college/${id}`)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    axios
      .get(`${API_URL}/college`)
      .then(response => {
        console.log(response)
        this.setState({ college: response.data.data })
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
          <ModalHeader toggle={this.toggle}>Edit College</ModalHeader>
          <ModalBody>
            <CollegeForm edit />
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
            {this.state.college.map(item => {
              n++
              return (
                <tr>
                  <th>{n}</th>
                  <td>{item.name}</td>
                  <td>
                    <Link href={`/college?id=${item._id}`}>
                      <a>Link</a>
                    </Link>
                  </td>
                  <td>
                    <Button
                      color="primary"
                      onClick={e => this.editClick(e, item._id)}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      color="danger"
                      onClick={e => this.deleteClick(e, item._id)}
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

export default CollegeList
