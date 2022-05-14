import './Posting.css'
import { Button, Typography, ImageList, ImageListItem, TextField } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SendIcon from '@mui/icons-material/Send';
import { Tooltip } from '@mui/material';
import { useState } from 'react';
import WindowStore from '../../store/WindowStore';

// 머릿글
const PostingHeader = ({imgSrc,userId})=>{
    return (
        <div className='posting__header'>
            <div className='posting__header__box'>
                {/* 프사 아바타 */}
                <img src={imgSrc}/>
                {/* 아이디 */}
                <span className='posting__header__name'>{userId}</span>
            </div>
            {/* 더보기 버튼 */}
            <Tooltip title="더보기">
                <MoreHorizIcon className='posting__header__button'/>
            </Tooltip>

        </div>        
    )
}

// 포스팅
const PostingArticle = ({article})=>{
    return (
        <div className='posting__article' >
            <p>
                {article}
            </p>
        </div>
    )
}

// 이미지, 글
const PostingGrid = ({imgData, article})=>{

    const [imgIdx, setImgIdx] = useState(0);
    
    // 뒤로 가기 버튼
    const GoBackBtn = ()=>{
        const decreaseImgIdx = ()=>{
            if (imgIdx === 0){
                setImgIdx(imgData.length-1);
            } else {
                setImgIdx(imgIdx-1);
            }}
        return (
            <Tooltip title="Before">
                <ArrowBackIosIcon 
                    className='posting__grid__inner__left__icon'
                    onClick={decreaseImgIdx}/>   
            </Tooltip>
        )
    }
    
    // 앞으로 가기 버튼
    const GoNextBtn = ()=>{
        const increaseImgIdx = ()=>{
            if (imgIdx === imgData.length-1){
                setImgIdx(0);
            } else {
                setImgIdx(imgIdx+1);
            }
        }
        return (
            <Tooltip title="next">
                <ArrowForwardIosIcon 
                    className='posting__grid__inner__right__icon'
                    onClick={increaseImgIdx}/>
            </Tooltip>
        )
    }

    return (
        <div className='posting__grid'>
            <div className='posting__grid__inner__img__box'>
                <GoBackBtn/>                
                <img className='posting__grid__image' src={imgData[imgIdx].src}/>
                <GoNextBtn/>
            </div>
            {article}
        </div>
    )
}

// 좋아요, 싫어요, 댓글 버튼
const PostingButtons = ({showComment, handleShowComment})=>{

    return (
        <ul className='posting__button__box'>
            
            <li className='posting__button__item'>
                <Tooltip title="좋아요"><ThumbUpAltIcon/></Tooltip>
            </li>
            <li className='posting__button__item'>
                <Tooltip title="싫어요"><ThumbDownAltIcon/></Tooltip>
            </li>
            <li className='posting__button__item' onClick={handleShowComment}>
                {
                    showComment
                    ? <Tooltip title="댓글창 닫기"><KeyboardArrowUpIcon/></Tooltip>
                    : <Tooltip title="댓글창 열기"><ChatBubbleIcon/></Tooltip>
                }
            </li>
        </ul>
    )
}

const PostingComment = ({comments})=>{

    const [myComment, setMyComment] = useState("");
    const handleComment = (e) =>{
        const v = e.target.value;
        setMyComment(v.slice(0, 500));    
    }

    return (
        <div>
            <div className='posting__comment__container'>
                <TextField 
                    className='posting__comment__textfield'
                    label={myComment===""?"댓글달기":`${myComment.length}/500`} 
                    variant="standard"
                    multiline maxRows={5}
                    value={myComment}
                    onChange={(e)=>handleComment(e)}/>
                <Tooltip title="Submit">
                    <button className='posting__comment__button'>
                        <SendIcon/>
                    </button>
                </Tooltip>
            </div>

            <div>
                {
                    comments.map((c, i)=>{
                        return (
                            <div className='posting__comment' key={i}>
                                <h5>{c.userId}</h5>
                                <p>{c.comment}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}


const Posting = ({user,posting}) => {

    const w = WindowStore
    const [showComment, setShowComment] = useState(false);

    const handleShowComment = ()=>{setShowComment(!showComment)}

    const imgData = [{src:`${process.env.PUBLIC_URL}/test.jpg`},
        {src:`${process.env.PUBLIC_URL}/test2.jpg`},
        {src:`${process.env.PUBLIC_URL}/test3.jpg`},
        {src:`${process.env.PUBLIC_URL}/test.jpg`},
        {src:`${process.env.PUBLIC_URL}/test2.jpg`},
        {src:`${process.env.PUBLIC_URL}/test3.jpg`}]

    const comments = [
        {_id:'1', userId:'카르마', comment:'ㅂㅇ'},
        {_id:'2', userId:'베이가', comment:'좋다'},
        {_id:'3', userId:'karma', comment:'ㅎㅇ'},
        {_id:'4', userId:'질리언', comment:'~~'},
        {_id:'5', userId:'karma', comment:'좋다'},
        {_id:'6', userId:'karma', comment:'좋다'},
    ]

    return (
        <div className='posting__container'>
            <PostingHeader/>

            {
                imgData
                ?<PostingGrid imgData={imgData} article={<PostingArticle/>}/>
                : <PostingArticle/>
            }        

            <PostingButtons showComment={showComment} handleShowComment={handleShowComment}/>

            {
                showComment
                ? <PostingComment comments={comments}/>          
                : null
            }
           
        </div>
    )
}

export default Posting