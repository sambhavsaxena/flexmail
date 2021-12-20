import React from 'react'
import { Nav } from 'react-bootstrap'

function Navbar() {
    return (
        <div>
            <Nav className="justify-content-center my-4" activeKey="/home">
                <Nav.Item>
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href='/about'>About</Nav.Link>
                </Nav.Item>
            </Nav>
            <hr />
        </div>
    )
}

export default Navbar
