import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
        <Link to="/" style={{margin: 5 + 'em'}}>Accueil !</Link>
        <Link to="/users">Users</Link>
    </nav>
  )
}

export default Navbar