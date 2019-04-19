import React from "react"
import Link from "next/link"
import {
  ListGroupItem,
  ListGroupItemText,
  ListGroupItemHeading,
} from "reactstrap"
import "./style.css"

const ResultItem = props => {
  const { data, type } = props
  console.log(data)
  if (type === "faculty") {
    return (
      <ListGroupItem style={{ display: "flex" }}>
        <div style={{ width: 300 }}>
          <ListGroupItemHeading>
            <Link href={`/faculty?id=${data._id}`}>
              <a>{data.name}</a>
            </Link>
          </ListGroupItemHeading>
          <ListGroupItemText>College: {data.college.name}</ListGroupItemText>
          <ListGroupItemText>
            {`Area of Interests: 
          ${data.areaOfInterests.map(aoi => {
            return `${aoi.name} `
          })}`}
          </ListGroupItemText>
        </div>
      </ListGroupItem>
    )
  } else if (type === "college") {
    return (
      <ListGroupItem tag="a" style={{ display: "flex" }} action>
        <div>
          <ListGroupItemHeading>
            <Link href={`/college?id=${data._id}`}>{data.name}</Link>
          </ListGroupItemHeading>
          <ListGroupItemText>
            {data.location.city}, {data.location.country}
          </ListGroupItemText>
        </div>
      </ListGroupItem>
    )
  }
}

export default ResultItem
