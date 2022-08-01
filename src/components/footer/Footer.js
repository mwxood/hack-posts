import { Container, Row, Col } from 'react-bootstrap/'
import { React, useState, useEffect } from 'react'


const Footer = () => {
    const [date, setDate] = useState(2022)
    useEffect(() => {
        const date = new Date()
        setDate(date.getFullYear())
    })

    return(
        <footer className='footer'>
            <Container>
                Copyright <span>{date}</span> HackSoft Ltd. All rights reserved. No part of this site may be reproduced without our written permission.
            </Container>
        </footer>
    )
}

export default Footer