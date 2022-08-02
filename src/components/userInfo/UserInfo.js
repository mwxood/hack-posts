import { React, useState, useEffect, useRef } from 'react'
import {Alert,  Row, Col } from 'react-bootstrap/'
import axios from 'axios';

const UserInfo = () => {
    const [user, getUser] = useState([])
    const [likes, getLikes] = useState([])
    const [posts, getPosts] = useState([])
    const [error, setError] = useState(null)
    const [modal, setModal] = useState(false)
    const name = useRef()
    const userInfo = useRef()
    const avatar = useRef()
    const resData = (url, geData) => {
        axios.get(url).then(res => {
            geData(res.data)
        }).catch(error => {
            setError(error);
          })
    }
    
    const url = 'https://62e02192fa8ed271c47efdef.mockapi.io/1/'

    useEffect(() => {
        resData(url + 'userInfo/1', getUser)
        resData(url + 'userInfo/1/post', getPosts)
        resData(url + 'userInfo/1/likes/1', getLikes)
    }, [])


    const showModal = () => {
        setModal(true)
    }

    const closeModal = () => {
        setModal(false)
    }

    const editUser = (event) => {
        event.preventDefault()
        if(name.current.value.trim().length === 0 || userInfo.current.value.trim().length === 0) {
            setError({
                title: 'Invalid input',
                message: 'Please fill the input'
            })

            return
        }
        axios.put('https://62e02192fa8ed271c47efdef.mockapi.io/1/userInfo/1', {
            name: name.current.value,
            avatar: avatar.current.files[0].name,
            userInfo: userInfo.current.value,
        })

        name.current.value = ''
        userInfo.current.value = ''
        closeModal()
  
    }





    if(!posts) return (
        <div className="user-info component-card-bg rounded">
            <div className='user-details'>
                <div className='d-flex'>
                    <div className='user-img'>
                        <img className="skeleton skeleton_image" />
                    </div>
                    <div className='user-info-text'>
                        <span className="skeleton skeleton-text"></span>  
                        <span className="skeleton skeleton-text"></span>  
                    </div>
                </div>
            </div>

            
        </div>
    )
    return(
        <div>
            {modal && <div className=''>
               
                    <div onClick={closeModal} className='overlay'></div>
                    <div className='modal-inner component-card-bg rounded'> 
                        <span onClick={closeModal} className='close-modal'>
                            <i className="fa-solid fa-xmark"></i>
                        </span>
                        <div className='post-inner'>
                        {error && <Alert className='mt-5' variant='danger'>{error.title} {error.message}</Alert>}
                            <form onSubmit={editUser} className='mt-5'>
                                <div className='form-group'>
                                    <input type="text" ref={name} className="input-bg message" placeholder={user.name} />
                                </div>

                                <div className='form-group'>
                                    <input type="text" ref={userInfo} className="input-bg message" placeholder={user.userInfo} />
                                </div>

                                <div className='form-group'>
                                    <input type="file" ref={avatar} className="input-bg message" placeholder={user.avatar} />
                           
                                </div>

                                <div className="d-flex justify-content-end mt-3">
                                    <button type='submit' className="btn btn-custom create-post-btn">Edit</button>
                                </div>
                               
                            </form>
                        </div>
                    </div>
               </div>}
            <div className="user-info component-card-bg rounded">
                <div className='user-details'>
                    <span onClick={showModal} className='edit'>
                        <i className="fa-solid fa-pen"></i>
                    </span>

                    <div className='d-flex align-items-center'>
                        <div className='user-img'>
                            <img src={`images/${user.avatar}`} alt="user" className='rounded-circle'/>
                        </div>
                        <div className='user-info-text'>
                            <span className='user-name'>{user.name}</span>
                            <span className='d-block user-info'>{user.userInfo}</span>
                        </div>
                    </div>
                </div>

                <div className='user-posts-holder'>
                    <Row>
                        <Col className='custom-col border-right d-flex justify-content-center pt-1 pb-1' xs={6}>
                            <div className='text-center'>
                                <span className='d-block likes-counter bold-font'>{likes.likes}</span>
                                <span className='d-block likes small-size-text'>{likes.likes > 1 ? 'Likes' : 'Like'}</span>
                            </div>
                        </Col>
                        <Col className='custom-col d-flex justify-content-center align-center pt-1 pb-1' xs={6}>
                            <div className='text-center'>
                                <span className='d-block posts-counter bold-font'>{posts.length}</span>
                                <span className='d-block posts small-size-text'>{posts.length > 1 ? 'Posts' : 'Post' }</span>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
        
    )
}

export default UserInfo