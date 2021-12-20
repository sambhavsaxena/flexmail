import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form, Row, Col, FloatingLabel } from 'react-bootstrap'
import Mail from './Mail'

const Home = () => {

    const [domains, setDomains] = useState([])
    const [identifier, setIdentifier] = useState('')
    const [domain, setDomain] = useState('')
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('https://www.1secmail.com/api/v1/?action=getDomainList')
            .then(res => {
                setDomains(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const fetch = () => {
        setIdentifier(document.getElementById('identifier').value)
        setDomain(document.getElementById('domain').value)
        axios.get(`https://www.1secmail.com/api/v1/?action=getMessages&login=${identifier}&domain=${domain}`)
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div style={{ minHeight: '92vh' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Row className="g-2 mx-2">
                        <Col md>
                            <FloatingLabel label="Identifier">
                                <Form.Control type="email" id="identifier" placeholder="Specify your identifier" />
                            </FloatingLabel>
                        </Col>
                        <Col md>
                            <FloatingLabel label="domain">
                                <Form.Select aria-label="Floating label select example">
                                    {domains.map((domain, index) => {
                                        return <option id="domain" key={index}>{domain}</option>
                                    }
                                    )}
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Button onClick={fetch} variant="outline-dark">Refresh</Button>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                {identifier && <p>Your email is: {identifier}@{domain}</p>}
            </div>
            <div>
                {data ?
                    data.map(
                        data =>
                            <div key={data.id} style={{ display: 'flex', marginTop: '20px', alignItems: 'center', justifyContent: 'center' }}>
                                <Mail identifier={identifier} domain={domain} id={data.id} />
                            </div>
                    ) : null}
            </div>
            <hr />
        </div>
    )
}

export default Home
