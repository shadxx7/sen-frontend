import { Form, Formik, Field, ErrorMessage } from "formik"
import Router from "next/router"
import { Container, Button, Label } from "reactstrap"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

const onSubmit = (values, actions) => {
  axios
    .post(`${API_URL}/signin`, values)
    .then(response => {
      let type
      sessionStorage.setItem("TOKEN", response.data.token)
      if (response.data.admin.type === "college") {
        sessionStorage.setItem("COLLEGE_NAME", response.data.admin.college.name)
        sessionStorage.setItem("COLLEGE_ID", response.data.admin.college.id)
        type = "college"
      } else {
        type = "system"
      }
      Router.push({
        pathname: "/admin",
        query: { type, element: "list" },
      })
      actions.setSubmitting(false)
    })
    .catch(err => {
      actions.setSubmitting(false)
      actions.setStatus({ msg: err.response.data.message })
      actions.setErrors(err.response.data.message)
    })
}

const SignIn = props => {
  return (
    <Container style={{ width: 400, paddingTop: "10%" }}>
      <h1 className="text-center" style={{ paddingBottom: 20 }}>
        Admin Sign In
      </h1>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={onSubmit}
        render={({ errors, status, isSubmitting }) => (
          <Form>
            <div className="form-group">
              <Label>Username</Label>
              <Field
                type="text"
                name="username"
                className="form-control"
                required
              />
              <ErrorMessage name="username" component="div" />
            </div>
            <div className="form-group">
              <Label>Password</Label>
              <Field
                type="password"
                name="password"
                className="form-control"
                required
              />
              <ErrorMessage name="password" component="div" />
            </div>
            {status && status.msg && (
              <div style={{ color: "red" }}>{status.msg}</div>
            )}
            <br />
            <Button disabled={isSubmitting} color="primary">
              Sign In
            </Button>
          </Form>
        )}
      />
    </Container>
  )
}

export default SignIn
