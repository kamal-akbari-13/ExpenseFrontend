import user from '../../assets/images/user.png'
import useProfileImage from '../../hooks/useProfileImage';
import Loading from "../utils/loading";

function ProfileCard({ username, email}) {

    const [profileImg, isLoading, uploadProfileImage, removeProfileImage] = useProfileImage();

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        const maxSize = 10 * 1024 * 1024;
        if (selectedFile && selectedFile.size > maxSize) {
            return
        }
        await uploadProfileImage(selectedFile)
    }

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            gap: '25px'
        }}>
            {
                (isLoading) ?
                    <Loading /> :
                    (
                        <>
                            <div style={{
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '20px'
                            }}>
                                <div style={{
                                    position: 'relative',
                                    borderRadius: '50%',
                                    padding: '8px',
                                    background: 'linear-gradient(135deg, #FFB22C, #FFD700)',
                                    boxShadow: '0 8px 25px rgba(255, 178, 44, 0.3)'
                                }}>
                                    {!profileImg && <img src={user} width={120} height={120} alt='user' style={{ borderRadius: '50%', border: '4px solid white' }}/>}
                                    {profileImg && <img src={profileImg} width={120} height={120} alt='user' style={{ borderRadius: '50%', border: '4px solid white' }}/>}
                                </div>
                                
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '12px',
                                    alignItems: 'center',
                                    width: '100%'
                                }}>
                                    {profileImg && (
                                        <button
                                            onClick={removeProfileImage}
                                            style={{
                                                backgroundColor: '#ff4444',
                                                color: '#fff',
                                                border: 'none',
                                                padding: '10px 20px',
                                                borderRadius: '8px',
                                                fontSize: '14px',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                fontWeight: '500',
                                                minWidth: '140px'
                                            }}
                                        >
                                            Remove Image
                                        </button>
                                    )}
                                    <label style={{
                                        backgroundColor: '#FFB22C',
                                        color: '#fff',
                                        border: 'none',
                                        padding: '10px 20px',
                                        borderRadius: '8px',
                                        fontSize: '14px',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        display: 'inline-block',
                                        fontWeight: '500',
                                        minWidth: '140px',
                                        textAlign: 'center'
                                    }}>
                                        Change Image
                                        <input 
                                            type="file" 
                                            onChange={handleFileChange} 
                                            accept=".jpg, .jpeg, .png" 
                                            style={{ display: 'none' }}
                                        />
                                    </label>
                                </div>
                            </div>

                            <div style={{ 
                                textAlign: 'center',
                                padding: '20px',
                                background: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: '12px',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                width: '100%'
                            }}>
                                <h3 style={{
                                    color: '#FFD700',
                                    fontSize: '22px',
                                    fontWeight: '600',
                                    marginBottom: '8px',
                                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}>
                                    {username}
                                </h3>
                                <p style={{
                                    color: '#666',
                                    fontSize: '16px',
                                    margin: '0',
                                    fontWeight: '400'
                                }}>
                                    {email}
                                </p>
                            </div>
                        </>
                    )
            }
        </div>
    )
}

export default ProfileCard;