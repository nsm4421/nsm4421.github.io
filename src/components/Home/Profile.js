const Profile = ({user})=>{
    return (
        <div>
            <h4>{user.name}</h4>
            <img src={user.thumbNail}></img>
            <p>{user.info}</p>
        </div>
    );
}

export default Profile