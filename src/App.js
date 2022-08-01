import './App.css';
import { React, useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap/'
import Header from './components/header/Header'
import UserInfo from './components/userInfo/UserInfo'
import Posts from './components/posts/Posts'
import CreatePost from './components/createPost/CreatePost'
import Footer from './components/footer/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [mounted, setMouted] = useState(true)
  return (
   <div className='app-holder'>
     <Header />
      <Container className='mt-5'>
        <Row>
          <Col className='mb-5' md={3}>
            <UserInfo />
          </Col>
          <Col md={7}>
            <CreatePost />
            <Posts />
          </Col>
        </Row>
      </Container>
      <Footer />
   </div>
  );
}

export default App;
