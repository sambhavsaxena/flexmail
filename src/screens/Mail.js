import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

const Mail = (props) => {

    const [time, setTime] = useState()
    const [from, setFrom] = useState()
    const [subject, setSubject] = useState()
    const [body, setBody] = useState()
    const [data, setData] = useState([])
    const identifier = props.identifier
    const domain = props.domain
    const id = props.id
    useEffect(() => {
        axios.get(`https://www.1secmail.com/api/v1/?action=readMessage&login=${identifier}&domain=${domain}&id=${id}`)
            .then(res => {
                let tempdate = new Date(res.data.date)
                setTime(new Date(Date.UTC(tempdate.getFullYear(), tempdate.getMonth(), tempdate.getDate(), tempdate.getHours() - 2, tempdate.getMinutes(), tempdate.getSeconds())).toLocaleString())
                setFrom(res.data.from)
                setSubject(res.data.subject)
                setBody(res.data.body)
                setData(res.data.attachments)
            })
            .catch(err => {
                console.log(err)
            })
    }, [domain])

    return (
        <div className='mx-5 my-2'>
            <Card>
                <Card.Body className='mx-2 my-2'>
                    <Card.Title>{from}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Arrived(IST): {time}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Subject: {subject}</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Attachments:
                        {data && data.map((data) => {
                            return (
                                <div key={data.size}>
                                    <a href={`https://www.1secmail.com/api/v1/?action=download&login=${identifier}&domain=${domain}&id=${id}&file=${data.filename}`}>{data.filename}</a>
                                </div>
                            )
                        })}
                    </Card.Subtitle>
                    <hr />
                    <div style={{ overflow: 'auto' }} dangerouslySetInnerHTML={{ __html: body }} />
                </Card.Body>
            </Card>
        </div>
    )
}

export default Mail
