import React, { useState } from 'react'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

const Mail = (props) => {
    const [time, setTime] = useState('')
    const [from, setFrom] = useState('')
    const [subject, setSubject] = useState('')
    const [body, setBody] = useState('<div>his</div>')
    const identifier = props.identifier
    const domain = props.domain
    const id = props.id
    axios.get(`https://www.1secmail.com/api/v1/?action=readMessage&login=${identifier}&domain=${domain}&id=${id}`)
        .then(res => {
            let tempdate = new Date(res.data.date)
            setTime(new Date(Date.UTC(tempdate.getFullYear(),tempdate.getMonth(),tempdate.getDate(),tempdate.getHours()-1,tempdate.getMinutes(),tempdate.getSeconds())).toLocaleString())
            setFrom(res.data.from)
            setSubject(res.data.subject)
            setBody(res.data.body)
        })
        .catch(err => {
            console.log(err)
        })

    return (
        <div className='mx-5 my-2'>
            <Card>
                <Card.Body className='mx-2 my-2'>
                    <Card.Title>{from}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Arrived(CET): {time}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Subject: {subject}</Card.Subtitle>
                    <hr />
                    <div style={{ overflow: 'auto' }} dangerouslySetInnerHTML={{ __html: body }} />
                </Card.Body>
            </Card>
        </div>
    )
}

export default Mail
