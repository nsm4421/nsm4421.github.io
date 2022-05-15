import './Posting.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Tooltip } from '@mui/material';
import { useState } from 'react';


// 이미지, 글
const PostingBody = ({imgData, article})=>{
    
    const [imgIdx, setImgIdx] = useState(0);
    
    // 포스팅
    const Article = ({article})=>{
        return (
            <div className='posting__article' >
                <p>
                    {article}
                </p>
            </div>
        )
    }

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
            
            {
                imgData
                ?
                <div className='posting__grid__inner__img__box'>
                <GoBackBtn/>                
                <img className='posting__grid__image' src={imgData[imgIdx].src}/>
                <GoNextBtn/>
                </div>
                : null
            }

            <Article article={article}/>
        </div>
    )
}

export default PostingBody;