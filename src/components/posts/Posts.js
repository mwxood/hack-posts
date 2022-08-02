import { React, useState, useEffect } from 'react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import axios from 'axios';

const Posts = () => {
    TimeAgo.addLocale(en)
    const timeAgo = new TimeAgo('en-US')
    const [posts, setPost] = useState([])
    const [user, setUser] = useState([])
    const [pages, setPages] = useState(5)
    const [isHidden, setHidden] = useState(false)
    const url = 'https://62e02192fa8ed271c47efdef.mockapi.io/1/'

    const resData = async (url, geData) => {
        try {
            await axios.get(url).then(res => {
                geData(res.data)
            })
        } catch(e) {
            console.log(e.message)
        }
    }

    

    const showMorePages = (e) => {
        e.preventDefault()
        setPages(pages)
        if(pages <= posts.length) {
            setPages(currentPages => currentPages + 5)
            setHidden(false)
        } 

        setHidden(true)
    }

    useEffect(() => {
        resData(url + 'userInfo/1', setUser)
    }, [])


    useEffect(() => {
        let isCancelled = false;

        if(!isCancelled) {
            resData(url + 'userInfo/1/post?page=1&limit=' + pages, setPost)
        }

       
        if(pages <= posts.length) {
            setHidden(false)
        }

        return () => { 
            isCancelled = true
        }

    }, [pages])


    const likeHandler = () => {
      
       
    }



    const printData = () => {
        return posts.map(item => {
            return (
                <div key={item.id} className="user-info component-card-bg rounded mb-3 post-holder">
                    <div className='post-inner'>
                            <div className='d-flex userInfo mb-3'>
                            
                            <div className='user-image'>
                                <img src={`images/${user.avatar}`} alt={user.name} className='rounded-circle' />
                            </div>
                            <div className=' userInfo'>
                                <span className='user-name d-block'>
                                    {user.name}
                                </span>
                                <span className='user-info d-block'>
                                    {user.userInfo}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='post-inner'>
                        {item.postDescription}
                    </div>
                    <div className='post-date'>
                         {timeAgo.format(item.createdAt * 1000)} 
                    </div>

                    <div className='d-flex justify-content-between post-social-holder'>
                        <span  onClick={likeHandler} className='like-btn'>
                            <i className="fa-solid fa-thumbs-up"></i> Like
                        </span>
                        <span className='share-btn'>
                            <i className="fa-solid fa-share"></i> Share
                        </span>
                    </div>
                </div>
            )  
        })
    }

    
    if(posts.length === 0) {
        return(
            <div>
                <div className="user-info component-card-bg rounded mb-3 post-holder post-inner">
                    <div className='d-flex userInfo mb-3 align-items-center'>
                        <img className="skeleton skeleton_image" />
                        <div className=' userInfo'>
                            <span className="skeleton skeleton-text"></span>  
                            <span className="skeleton skeleton-text"></span>  
                        </div>
                    </div>
    
                    <div className='post-body'>
                        <div className="skeleton skeleton-text skeleton-text__body"></div>
                    </div>
                </div>
            </div>
        )
    } 

    return(
        <div>
            { printData() }
            <div className='d-flex justify-content-center'>
                <a style={{ display:  isHidden ? 'none' : 'block'}} onClick={showMorePages}
                 href='#' className='btn btn-custom'>Load more</a>
            </div>
        </div>
    )
}

export default Posts;