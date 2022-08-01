import { React, useState, useEffect, useRef } from 'react'
import axios from 'axios';
import { Alert } from 'react-bootstrap/'

const url = 'https://62e02192fa8ed271c47efdef.mockapi.io/1/userInfo/1/post'

const CreatePost = () => {
    const messageInputRef = useRef();
    const [error, setError] = useState();


    const createMessage = (event) => {
        event.preventDefault()
        if(messageInputRef.current.value.trim().length === 0) {
            setError({
                title: 'Invalid input',
                message: 'Please fill the input'
            })

            return
        }

        axios.post(url, {
            postDescription: messageInputRef.current.value,
            createdAt: Math.floor(new Date().getTime() / 1000) ,
            userInfoId: 1
        })

        messageInputRef.current.value = ''
    }

    return(
        <div>
            {error && <Alert variant='danger'>{error.title} {error.message}</Alert>}
                <div className="form-holder user-info component-card-bg rounded mb-3">
                <form onSubmit={createMessage}>
                    <textarea ref={messageInputRef} className="input-bg message" placeholder="Share something to the community..."></textarea>
                    <div className="d-flex justify-content-end">
                        <button type='submit' className="btn btn-custom create-post-btn">Post</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePost