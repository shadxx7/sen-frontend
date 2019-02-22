import React from "react"
import { Button, Form, Input } from "reactstrap"
import "../style/index.css"
import "bootstrap/dist/css/bootstrap.min.css"

class Index extends React.Component {
  state = {
    wrapper: "form-wrapper",
  }
  handleSubmit = () => {
    this.setState({ wrapper: "form-wrapper searched" })
  }
  render() {
    return (
      <div className={this.state.wrapper}>
        <Form>
          <Input id="search-input" size="lg" />
          <Button
            id="search-button"
            color="primary"
            size="lg"
            onClick={() => {
              this.handleSubmit()
            }}
          >
            Search
          </Button>
          <div />
        </Form>
      </div>
    )
  }
}

export default Index
