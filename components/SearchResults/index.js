import React from "react"
import { ListGroup } from "reactstrap"
import _ from "lodash"
import ResultItem from "./ResultItem"
import "./style.css"

function SearchResults(props) {
  let n = 0
  return (
    <ListGroup style={{ width: 500 }} className="temp" flush>
      {_.map(props.results, item => {
        n++
        return <ResultItem key={n} data={item} type={props.type} />
      })}
    </ListGroup>
  )
}

export default SearchResults
