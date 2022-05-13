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

const PostingHeader = ({imgSrc,name})=>{
    return (
        <div className='posting__header'>

            <div className='posting__header__box'>
                <img src={`${process.env.PUBLIC_URL}/test.jpg`}/>
                <span className='posting__header__name'>HI</span>
            </div>

            <Tooltip title="더보기">
                <MoreHorizIcon className='posting__header__button'/>
            </Tooltip>

        </div>        
    )
}

const PostingArticle = (props)=>{

    const [article, setArticle] = useState("");

    return (
        <div className='posting__article' >
            <p>
                dfjaklsfjdskafaj;dsk
            </p>
        </div>
    )
}

const PostingGrid = ({imgData, article})=>{

    const [imgIdx, setImgIdx] = useState(0);
    
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

const PostingComment = ()=>{

    const [comment, setComment] = useState("");
    const handleComment = (e) =>{
        const v = e.target.value;
        setComment(v.slice(0, 500));    
    }

    return (
        <div className='posting__comment__container'>
            <TextField 
                className='posting__comment__textfield'
                label={comment===""?"댓글달기":`${comment.length}/500`} 
                variant="standard"
                multiline maxRows={5}
                value={comment}
                onChange={(e)=>handleComment(e)}/>
            <Tooltip title="Submit">
                <button className='posting__comment__button'>
                    <SendIcon/>
                </button>
            </Tooltip>
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
                ?  <PostingComment/>          
                : null
            }
           
        </div>
    )
}

export default Posting