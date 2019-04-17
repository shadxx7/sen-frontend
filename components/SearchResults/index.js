import React from "react"
import { ListGroup } from "reactstrap"
import _ from "lodash"
import ResultItem from "./ResultItem"
import "./style.css"

const isEmpty = arr => {
  if (arr.length === 0) return true
  else return false
}

const SearchResults = props => {
  let n = 0
  if (!isEmpty(props.results)) {
    return (
      <ListGroup style={{ width: 700 }} className="temp" flush>
        {_.map(props.results, item => {
          n++
          return <ResultItem key={n} data={item} type={props.type} />
        })}
      </ListGroup>
    )
  } else {
    return <h3 style={{ color: "#5e5e5e" }}>Please search something!</h3>
  }
}

export default SearchResults
