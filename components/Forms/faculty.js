import { Formik, Field, Form, ErrorMessage } from "formik"
import { Label } from "reactstrap"
import axios from "axios"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

const onSubmit = async (values, actions, edit) => {
  const collegeId = sessionStorage.getItem("COLLEGE_ID")
  const collegeName = sessionStorage.getItem("COLLEGE_NAME")
  const token = sessionStorage.getItem("TOKEN")
  const finalValues = {
    name: values.name,
    department: values.department,
    aoi: [{ name: values.aoi }],
    publications: [
      { name: values.publications, description: "Something goes here" },
    ],
    coursesTaught: [{ name: values.coursesTaught, code: "IE509" }],
    college: {
      name: collegeName,
      id: collegeId,
    },
  }
  if (edit) {
    axios({
      method: "post",
      headers: { "x-access-token": token },
      url: `${API_URL}/faculty/update`,
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
      url: `${API_URL}/faculty/add`,
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
        onSubmit={(values, actions) => onSubmit(values, actions, props.edit)}
        render={({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <Label>Name</Label>
              <Field
                type="text"
                name="name"
                className="form-control"
                required
              />
              <ErrorMessage name="name" component="div" />
              <Label>Department</Label>
              <Field type="text" className="form-control" name="department" />
              <ErrorMessage name="department" component="div" />
              <Label>Area of Interests</Label>
              <Field className="form-control" type="text" name="aoi" />
              <ErrorMessage name="aoi" className="error" component="div" />
              <Label>Publications</Label>
              <Field className="form-control" type="text" name="publications" />
              <ErrorMessage
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
                name="coursesTaught"
                className="error"
                component="div"
              />
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
