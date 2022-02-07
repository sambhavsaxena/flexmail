import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <div style={{ height: '80vh' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: '120px' }}>
                <h4 style={{ marginTop: '10%', marginBottom: '5%' }}>Aw snap!</h4>
                <Link to="/">
                    <Button variant="outline-primary">Let's go Home 🤝</Button>
                </Link>
            </div>
        </div>
    )
}

export default Error
