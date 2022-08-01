import { Container, Row, Col } from 'react-bootstrap/'
import logo from '../../images/hacksoft.png'
import user from '../../images/Ivailo.png'

const header = () => {
    return(
        <header className='header'>
            <Container>
                <Row className='justify-content-between'>
                    <Col className='d-flex justify-content-start'>
                        <a href='/'>
                            <img src={logo} alt="HackSoft logo" />
                        </a>
                    </Col>

                    <Col className='d-flex justify-content-end'>
                        <a href="#">
                            <img src={user} alt="user" className='rounded-circle' />
                        </a>
                    </Col>
                </Row>
             </Container>
        </header>
    );
}

export default header