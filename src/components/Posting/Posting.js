import './Posting.css'
import WindowStore from '../../store/WindowStore';
import PostingHeader from './PostingHeader';
import PostingBody from './PostingBody';
import PostingFooter from './PostingFooter';

const Posting = ({posting, _id}) => {

    const w = WindowStore
   
    const imgData = [{src:`${process.env.PUBLIC_URL}/test.jpg`},
        {src:`${process.env.PUBLIC_URL}/test2.jpg`},
        {src:`${process.env.PUBLIC_URL}/test3.jpg`},
        {src:`${process.env.PUBLIC_URL}/test.jpg`},
        {src:`${process.env.PUBLIC_URL}/test2.jpg`},
        {src:`${process.env.PUBLIC_URL}/test3.jpg`}]

    const comments = [
        {_id:'1', nickName:'카르마', comment:'ㅂㅇ', writeAt:"2022-05-19"},
        {_id:'2', nickName:'베이가', comment:'좋다', writeAt:"2022-05-19"},
        {_id:'3', nickName:'karma', comment:'ㅎㅇ', writeAt:"2022-05-19"},
        {_id:'4', nickName:'질리언', comment:'~~', writeAt:"2022-05-19"},
        {_id:'5', nickName:'karma', comment:'좋다', writeAt:"2022-05-19"},
        {_id:'6', nickName:'karma', comment:'좋다', writeAt:"2022-05-19"},
    ]

    return (
        <div className='posting__container'>
            <PostingHeader imgSrc={`${process.env.PUBLIC_URL}/test.jpg`} nickName={'suzi'}/>

            <PostingBody imgData={imgData} article={"HI"}/>

            <PostingFooter _id={_id} comments={comments}/>           
        </div>
    )
}

export default Posting