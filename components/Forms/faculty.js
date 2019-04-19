import { Formik, Field, Form, ErrorMessage } from "formik"
import { Label } from "reactstrap"
import * as Yup from "yup"
import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

const FacultyFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  department: Yup.string()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  aoi: Yup.string()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  publications: Yup.string()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  coursesTaught: Yup.string()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
})

const onSubmit = async (values, actions, props) => {
  const collegeId = sessionStorage.getItem("COLLEGE_ID")
  const collegeName = sessionStorage.getItem("COLLEGE_NAME")
  const token = sessionStorage.getItem("TOKEN")
  const finalValues = {
    name: values.name,
    department: values.department,
    areaOfInterests: [{ name: values.aoi }],
    publications: [
      { name: values.publications, description: "Something goes here" },
    ],
    coursesTaught: [{ name: values.coursesTaught, code: "IE509" }],
    college: {
      name: collegeName,
      id: collegeId,
    },
  }
  if (props.edit) {
    const editValues = { faculty: finalValues, id: props.facultyId }
    axios({
      method: "put",
      headers: { "x-access-token": token },
      url: `${API_URL}/faculty/update`,
      data: editValues,
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
  } else {
    axios({
      method: "post",
      headers: { "x-access-token": token },
      url: `${API_URL}/faculty/add`,
      data: finalValues,
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
  }
}

const FacultyForm = props => {
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          department: "",
          aoi: "",
          publications: "",
          coursesTaught: "",
        }}
        validationSchema={FacultyFormSchema}
        onSubmit={(values, actions) => onSubmit(values, actions, props)}
        render={({ status, isSubmitting }) => (
          <Form>
            <div className="form-group">
              <Label>Name</Label>
              <Field
                type="text"
                name="name"
                className="form-control"
                required
              />
              <ErrorMessage
                style={{ color: "red" }}
                name="name"
                component="div"
              />
              <Label>Department</Label>
              <Field type="text" className="form-control" name="department" />
              <ErrorMessage
                style={{ color: "red" }}
                name="department"
                component="div"
              />
              <Label>Area of Interests</Label>
              <Field className="form-control" type="text" name="aoi" />
              <ErrorMessage
                style={{ color: "red" }}
                name="aoi"
                className="error"
                component="div"
              />
              <Label>Publications</Label>
              <Field className="form-control" type="text" name="publications" />
              <ErrorMessage
                style={{ color: "red" }}
                name="publications"
                className="error"
                component="div"
              />
              <Label>Courses Taught</Label>
              <Field
                className="form-control"
                type="text"
                name="coursesTaught"
              />
              <ErrorMessage
                style={{ color: "red" }}
                name="coursesTaught"
                className="error"
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

export default FacultyForm
