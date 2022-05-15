import './Posting.css'
import { TextField } from '@mui/material'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SendIcon from '@mui/icons-material/Send';
import { Tooltip } from '@mui/material';
import { useState } from 'react';
import HandleDB from '../../api/HandleDB';
import UserStore from '../../store/UserStore';

// 댓글쓰기 
const WriteComment = ({_id, myComment, setMyComment})=>{
            
    const handleComment = (e) =>{
        const v = e.target.value;
        setMyComment(v.slice(0, 500));    
    };
    
    const handleCommentSend = ()=>{    
        const userString = localStorage.getItem('user')
        const user = JSON.parse(userString);
        const uid = user.uid;
        if (!uid){
            return {status:false, msg:'Not Logined'}
        } else {
            const today = new Date();
            const writeAt = `${today.toLocaleDateString()} ${today.toLocaleTimeString()}`;
            const payload = {uid:uid, comment:myComment, writeAt:writeAt};
            const add = HandleDB('add')
            add(`posting/${_id}/comments`, payload).then((res)=>{
                if (res.status){
                    return {status:true}
                } else {
                    return {status:false, msg:'Upload Failed'}
                }
            })
        }    
    }

    return (
        <div className='posting__comment__container'>
            <TextField 
                className='posting__comment__textfield'
                label={myComment===""?"Write Comment":`${myComment.length}/500`} 
                variant="standard"
                multiline maxRows={5}
                onChange={(e)=>{handleComment(e)}}
                value={myComment}
            />
                
            <Tooltip title="Submit">
                <button className='posting__comment__button' onClick={handleCommentSend}>
                    <SendIcon/>
                </button>
            </Tooltip>
        </div>
    )
}

const PostingButtons = ({showComment, setShowComment})=>{

    const handleShowComment = () => {setShowComment(!showComment)}
    
    return (
        <ul className='posting__button__box'>
            
            <li className='posting__button__item'>
                <Tooltip title="Like">                       
                    <ThumbUpAltIcon/>                      
                </Tooltip>
            </li>
            <li className='posting__button__item'>
                <Tooltip title="Hate">
                    <ThumbDownAltIcon/>            
                </Tooltip>
            </li>
            <li className='posting__button__item' onClick={handleShowComment}>
                {
                    showComment
                    ? <Tooltip title="Open Comment"><KeyboardArrowUpIcon/></Tooltip>
                    : <Tooltip title="Close Comment"><ChatBubbleIcon/></Tooltip>
                }
            </li>
        </ul>
    )
}


// 댓글 화면
const Comments = ({comments})=>{ 
    return (
        <div>
            {
                comments.map((c, i)=>{
                    return (
                        <div className='posting__comment' key={i}>
                            <h5>{c.nickName}</h5>                            
                            <p>{c.comment}</p>
                            <span>{c.writeAt}</span>
                        </div>
                    )
                })
            }
        </div>
    )
}



const PostingFooter = ({comments, _id})=>{

    const [myComment, setMyComment] = useState("");
    const [showComment, setShowComment] = useState(false);

   return (
        <div>
            <PostingButtons showComment={showComment} setShowComment={setShowComment}/>

            {
                showComment
                ?
                <div>
                    <WriteComment _id={_id} myComment={myComment} setMyComment={setMyComment}/>
                    <Comments comments={comments}/>
                </div>                
                : null
            }

        </div>
    )
}

export default PostingFooter;