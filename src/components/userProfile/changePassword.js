import {useForm} from 'react-hook-form';
import { useRef, useState } from 'react';
import UserService from '../../services/userService';
import toast from 'react-hot-toast';

function ChangePassword({email}) {
    
    const {register, handleSubmit, watch, reset, formState} = useForm();
    const password = useRef({});
    password.current = watch('newPassword', "");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);     
        await UserService.settingsResetPassword(email, data.currentPassword, data.newPassword).then(
            (response) => {
                if (response.data.status === "SUCCESS"){
                    toast.success(response.data.response)
                    reset({currentPassword: "", newPassword: "", cpassword: ""})
                    return
                }
            },
            (error) => {
                error.response ? 
                    toast.error(error.response.data.response)
                : 
                    toast.error("Failed to change password: Try again later!")
            }
          );
        setIsLoading(false);
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>

            <div style={{ marginBottom: '20px' }}>
                <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: '#FFB22C',
                    fontSize: '14px',
                    fontWeight: '500'
                }}>
                    Current Password
                </label>
                <input 
                    type='password'
                    style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '14px',
                        backgroundColor: '#fff',
                        color: '#333',
                        transition: 'border-color 0.3s ease'
                    }}
                    {
                        ...register('currentPassword', {
                        required: 'Current password is required!',
                            minLength: {
                                value:8,
                                message: "Password must have atleast 8 characters"
                            }
                        })
                    }
                />
                {formState.errors.currentPassword && (
                    <small style={{
                        color: '#ff4444',
                        fontSize: '12px',
                        marginTop: '4px',
                        display: 'block'
                    }}>
                        {formState.errors.currentPassword.message}
                    </small>
                )}
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: '#FFB22C',
                    fontSize: '14px',
                    fontWeight: '500'
                }}>
                    New Password
                </label>
                <input 
                    type='password'
                    style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '14px',
                        backgroundColor: '#fff',
                        color: '#333',
                        transition: 'border-color 0.3s ease'
                    }}
                    {
                        ...register('newPassword', {
                        required: 'Password is required!',
                            minLength: {
                                value:8,
                                message: "Password must have atleast 8 characters"
                            }
                        })
                    }
                />
                {formState.errors.newPassword && (
                    <small style={{
                        color: '#ff4444',
                        fontSize: '12px',
                        marginTop: '4px',
                        display: 'block'
                    }}>
                        {formState.errors.newPassword.message}
                    </small>
                )}
            </div>
                
            <div style={{ marginBottom: '30px' }}>
                <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: '#FFB22C',
                    fontSize: '14px',
                    fontWeight: '500'
                }}>
                    Confirm Password
                </label>
                <input 
                    type='password'
                    style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '14px',
                        backgroundColor: '#fff',
                        color: '#333',
                        transition: 'border-color 0.3s ease'
                    }}
                    {
                        ...register('cpassword', {
                            required: 'Confirm password is required!',
                            minLength: {
                                value:8,
                                message: "Password must have atleast 8 characters"
                            },
                            validate: cpass => cpass === password.current || "Passwords do not match!"
                        })
                    }
                />
                {formState.errors.cpassword && (
                    <small style={{
                        color: '#ff4444',
                        fontSize: '12px',
                        marginTop: '4px',
                        display: 'block'
                    }}>
                        {formState.errors.cpassword.message}
                    </small>
                )}
            </div>

            <div style={{ textAlign: 'center' }}>
                <button
                    type='submit'
                    disabled={isLoading}
                    style={{
                        backgroundColor: '#FFB22C',
                        color: '#fff',
                        border: 'none',
                        padding: '12px 32px',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '500',
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        opacity: isLoading ? 0.7 : 1,
                        transition: 'all 0.3s ease',
                        minWidth: '200px'
                    }}
                >
                    {isLoading ? "Updating..." : 'Update Password'}
                </button>
            </div>
            
        </form>
    )
}

export default ChangePassword;