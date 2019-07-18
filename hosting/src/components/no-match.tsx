import React from "react"
import { Link } from "react-router-dom"

export default ({ location }: {[x: string]: any}) => {
  document.title = "404 - Davydoff's page"
  return (
    <div className="mt-4 mb-4 text-center main-wrapper">
      <Link to="/" className="back-link">Home</Link>
      <h3>No match for <code>{location.pathname}</code></h3>
    </div>
  )
}