import { useState, useEffect } from "react";
import AuthService from "../../services/auth.service";
import ProfileCard from "../../components/userProfile/userProfileCard";
import Header from '../../components/utils/header';
import ChangePassword from "../../components/userProfile/changePassword";
import Container from "../../components/utils/Container";
import { Toaster } from "react-hot-toast";

function AdminProfile() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setEmail(user.email)
            setUsername(user.username)
        }
    }, [])

    return (
        <Container activeNavId={8}>
            <Header title="Settings" />
            <Toaster/>
            
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 'calc(100vh - 120px)',
                padding: '20px'
            }}>
                <div style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '24px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    padding: '50px',
                    width: '100%',
                    maxWidth: '600px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}>
                    <h1 style={{
                        textAlign: 'center',
                        marginBottom: '40px',
                        color: '#FFB22C',
                        fontSize: '32px',
                        fontWeight: '700',
                        letterSpacing: '1px'
                    }}>
                        Account Settings
                    </h1>

                    {/* Profile Section */}
                    <div style={{
                        marginBottom: '50px',
                        paddingBottom: '40px',
                        borderBottom: '2px solid rgba(255, 178, 44, 0.2)'
                    }}>
                        <h2 style={{
                            marginBottom: '30px',
                            color: '#854836',
                            fontSize: '24px',
                            fontWeight: '600',
                            textAlign: 'center'
                        }}>
                            Profile Information
                        </h2>
            <ProfileCard username={username} email={email} />
                    </div>

                    {/* Password Section */}
                    <div>
                        <h2 style={{
                            marginBottom: '30px',
                            color: '#854836',
                            fontSize: '24px',
                            fontWeight: '600',
                            textAlign: 'center'
                        }}>
                            Security Settings
                        </h2>
                        <ChangePassword email={email} />
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default AdminProfile;