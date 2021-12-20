import React, { useState } from 'react'
import axios from 'axios'
import { Card } from 'react-bootstrap'

const Mail = (props) => {
    const [time, setTime] = useState('')
    const [from, setFrom] = useState('')
    const [subject, setSubject] = useState('')
    const [textBody, setTextBody] = useState('')
    const identifier = props.identifier
    const domain = props.domain
    const id = props.id
    axios.get(`https://www.1secmail.com/api/v1/?action=readMessage&login=${identifier}&domain=${domain}&id=${id}`)
        .then(res => {
            setTime(res.data.date)
            setFrom(res.data.from)
            setSubject(res.data.subject)
            setTextBody(res.data.textBody)
        })
        .catch(err => {
            console.log(err)
        })

    return (
        <div>
            <Card className='mx-5'>
                <Card.Body>
                    <Card.Title>{from}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Arrived: {time}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Subject: {subject}</Card.Subtitle>
                    <hr />
                    <Card.Text>
                        Content: {textBody}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Mail
