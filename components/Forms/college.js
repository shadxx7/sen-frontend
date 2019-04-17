import { Formik, Field, Form, ErrorMessage } from "formik"
import { Label } from "reactstrap"
import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

const onSubmit = async (values, actions, edit) => {
  const token = sessionStorage.getItem("TOKEN")
  const finalValues = {
    college: {
      name: values.collegeName,
      location: {
        country: values.country,
        city: values.city,
      },
    },
    admin: {
      name: values.adminName,
      username: values.adminUsername,
      password: values.password,
      type: "college",
    },
  }
  if (edit) {
    axios({
      method: "put",
      headers: { "x-access-token": token },
      url: `${API_URL}/college/update`,
      data: finalValues,
    })
      .then(response => {
        actions.setSubmitting(false)
        console.log(response)
      })
      .catch(err => {
        actions.setSubmitting(false)
        console.log(err)
      })
  } else {
    axios({
      method: "post",
      headers: { "x-access-token": token },
      url: `${API_URL}/college/add`,
      data: finalValues,
    })
      .then(response => {
        actions.setSubmitting(false)
        console.log(response)
      })
      .catch(err => {
        actions.setSubmitting(false)
        console.log(err)
      })
  }
}

const CollegeForm = props => {
  return (
    <div>
      <Formik
        initialValues={{
          collegeName: "",
          country: "",
          city: "",
          adminName: "",
          adminUsername: "",
          password: "",
        }}
        onSubmit={(values, actions) => onSubmit(values, actions, props.edit)}
        render={({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <Label>College Name</Label>
              <Field
                type="text"
                name="collegeName"
                className="form-control"
                required
              />
              <ErrorMessage name="CollegeName" component="div" />
              <Label>Country</Label>
              <Field type="text" className="form-control" name="country" />
              <ErrorMessage name="country" component="div" />
              <Label>City</Label>
              <Field className="form-control" type="text" name="city" />
              <ErrorMessage name="city" className="error" component="div" />
              <Label>College Admin Name</Label>
              <Field className="form-control" type="text" name="adminName" />
              <ErrorMessage
                name="adminName"
                className="error"
                component="div"
              />
              <Label>College Admin Username</Label>
              <Field
                name="adminUsername"
                className="form-control"
                type="text"
              />
              <ErrorMessage
                name="adminUsername"
                className="error"
                component="div"
              />
              <Label>Password</Label>
              <Field className="form-control" type="text" name="password" />
              <ErrorMessage name="password" className="error" component="div" />
              <br />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      />
    </div>
  )
}

export default CollegeForm
