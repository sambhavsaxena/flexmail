import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Form, Row, Col, FloatingLabel } from 'react-bootstrap'
import Mail from './Mail'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './home.css'

toast.configure()

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

    const changed = () => {
        setIdentifier(document.getElementById('identifier').value)
        setDomain(document.getElementById('domain').value)
    }

    const fetch = () => {
        setIdentifier(document.getElementById('identifier').value)
        setDomain(document.getElementById('domain').value)
        if (!identifier) {
            toast.error(`Identifier is required!`, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return
        }
        axios.get(`https://www.1secmail.com/api/v1/?action=getMessages&login=${identifier}&domain=${domain}`)
            .then(res => {
                setData(res.data)
                const dataf = JSON.stringify(res.data)
                if (dataf === '[]') {
                    toast.error(`No new mails!`, {
                        position: "bottom-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                else {
                    toast(`Loading new mails`, {
                        position: "bottom-right",
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div style={{ minHeight: '92vh' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '80px', flexDirection: 'column' }}>
                <h3>Welcome to Flexmail</h3>
                <h5 style={{ marginBottom: '100px' }}>A disposable email generator</h5>
                <div className="text-center">Enter your identifier and select your domain before going live.</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
                <div className="div" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Row onChange={changed} className="g-2 mx-2">
                        <Col md>
                            <FloatingLabel label="Identifier">
                                <Form.Control type="email" id="identifier" placeholder="Specify your identifier" />
                            </FloatingLabel>
                        </Col>
                        <Col md>
                            <FloatingLabel label="Domain">
                                <Form.Select id='domain' aria-label="Floating label select example">
                                    {domains.map((domain, index) => {
                                        return <option key={index}>{domain}</option>
                                    }
                                    )}
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Button className="btn" onClick={fetch} variant="outline-dark">Refresh</Button>
                </div>
            </div>
            <div className="text-center" style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', marginBottom: '40px' }}>
                {identifier && <h5>Your temporary email is: {identifier}@{domain}</h5>}
            </div>
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', marginBottom: '40px' }}>
                    Total count: {data.length}
                </div>
            </div>
            <div>
                {
                    data && data.map(data => <Mail key={data.id} identifier={identifier} domain={domain} id={data.id} />)
                }
            </div>
        </div>
    )
}

export default Home
