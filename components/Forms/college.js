import { Formik, Field, Form, ErrorMessage } from "formik"
import { Label } from "reactstrap"
import axios from "axios"
import * as Yup from "yup"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

const CollegeFormSchema = Yup.object().shape({
  collegeName: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  country: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  city: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  adminName: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  adminUsername: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  password: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
})

const onSubmit = async (values, actions, props) => {
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
  if (props.edit) {
    const editValues = { ...finalValues, id: props.collegeId }
    axios({
      method: "put",
      headers: { "x-access-token": token },
      url: `${API_URL}/college/update`,
      data: editValues,
    })
      .then(response => {
        actions.setSubmitting(false)
        actions.setStatus({ msg: response.data })
      })
      .catch(err => {
        actions.setSubmitting(false)
        actions.setStatus({ msg: err.response.data.message })
        actions.setErrors(err.response.data.message)
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
        actions.setStatus({ msg: response.data })
        window.location.reload()
      })
      .catch(err => {
        actions.setSubmitting(false)
        actions.setStatus({ msg: err.response.data.message })
        actions.setErrors(err.response.data.message)
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
        validationSchema={CollegeFormSchema}
        onSubmit={(values, actions) => onSubmit(values, actions, props)}
        render={({ status, isSubmitting }) => (
          <Form>
            <div className="form-group">
              <Label>College Name</Label>
              <Field
                type="text"
                name="collegeName"
                className="form-control"
                required
              />
              <ErrorMessage
                style={{ color: "red" }}
                name="collegeName"
                component="div"
              />
              <Label>Country</Label>
              <Field type="text" className="form-control" name="country" />
              <ErrorMessage
                style={{ color: "red" }}
                name="country"
                component="div"
              />
              <Label>City</Label>
              <Field className="form-control" type="text" name="city" />
              <ErrorMessage
                style={{ color: "red" }}
                name="city"
                component="div"
              />
              <Label>College Admin Name</Label>
              <Field className="form-control" type="text" name="adminName" />
              <ErrorMessage
                style={{ color: "red" }}
                name="adminName"
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
                style={{ color: "red" }}
                component="div"
              />
              <Label>Password</Label>
              <Field className="form-control" type="text" name="password" />
              <ErrorMessage
                name="password"
                style={{ color: "red" }}
                component="div"
              />
              <br />
              {status && status.msg && (
                <div style={{ color: "blue" }}>{status.msg}</div>
              )}
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
