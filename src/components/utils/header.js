import { memo, useContext, useEffect, useState } from "react";
import AuthService from "../../services/auth.service";
import user from '../../assets/images/user.png'
import useProfileImage from "../../hooks/useProfileImage";
import ThemeToggle from "./ThemeToggle";

const Header = memo(({ title}) => {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [profileImg] = useProfileImage();


    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setEmail(user.email)
            setUsername(user.username)
        }
    }, [])


    return (
        <div className='top'>
            <div className="title">
                <h1>{title}</h1>
            </div>

            <div className='profile'>
                <div className="profile-img">
                    {!profileImg && <img src={user} width={50} height={50} alt='user'/>}
                    {profileImg !== null && <img src={profileImg} width={50} height={50} alt='user'/>}
                </div>
                <div>
                    <p>{username}</p>
                    <p>{email}</p>
                </div>
                <ThemeToggle />
            </div>
        </div>
    )
})

export default Header;