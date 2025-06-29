import { useState } from "react";
import { useForm } from "react-hook-form";
import Header from "../../components/utils/header";
import AdminService from "../../services/adminService";
import { useNavigate } from "react-router-dom";
import Container from "../../components/utils/Container";
import toast, { Toaster } from "react-hot-toast";

function NewCategory() {

    const { register, handleSubmit, formState } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        setIsLoading(true)
        await AdminService.addNewcategory(data.cname, data.type).then(
            (response) => {
                if (response.data.status === 'SUCCESS') {
                    navigate('/admin/categories')
                }
            },
            (error) => {
                error.response ?
                    toast.error("Failed to add category: Try again later!")
                    :
                    toast.error("Failed to add category: Try again later!")
            }
        )
        setIsLoading(false)
    }

    return (
        <Container activeNavId={7}>
            <Header title="New Category" />
            <Toaster/>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 'calc(100vh - 80px)',
                padding: '20px'
            }}>
                <div style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    padding: '40px',
                    width: '100%',
                    maxWidth: '500px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}>
                    <h2 style={{
                        textAlign: 'center',
                        marginBottom: '30px',
                        color: '#FFB22C',
                        fontSize: '24px',
                        fontWeight: '600'
                    }}>
                        Create New Category
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '8px',
                                color: '#FFB22C',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}>
                                Category name
                            </label>
                    <input
                        type='text'
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
                        {...register('cname', {
                            required: "Category name is required!",
                            maxLength: {
                                value: 30,
                                message: "Category name can have atmost 30 characters!"
                            }
                        })}
                    />
                            {formState.errors.cname && (
                                <small style={{
                                    color: '#ff4444',
                                    fontSize: '12px',
                                    marginTop: '4px',
                                    display: 'block'
                                }}>
                                    {formState.errors.cname.message}
                                </small>
                            )}
                </div>

                        <div style={{ marginBottom: '30px' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '12px',
                                color: '#FFB22C',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}>
                                Transaction type
                            </label>
                            <div style={{
                                display: 'flex',
                                gap: '20px',
                                justifyContent: 'center'
                            }}>
                                <label style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    padding: '8px 16px',
                                    borderRadius: '6px',
                                    border: '1px solid #e0e0e0',
                                    backgroundColor: '#fff',
                                    transition: 'all 0.3s ease'
                                }}>
                                <input
                                    type='radio'
                                    value={1}
                                        style={{
                                            marginRight: '8px',
                                            accentColor: '#FFB22C'
                                        }}
                                    {...register('type', {
                                        required: "Transaction type is required!"
                                    })}
                                />
                                Expense
                            </label>
                                <label style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    padding: '8px 16px',
                                    borderRadius: '6px',
                                    border: '1px solid #e0e0e0',
                                    backgroundColor: '#fff',
                                    transition: 'all 0.3s ease'
                                }}>
                                <input
                                    type='radio'
                                    value={2}
                                        style={{
                                            marginRight: '8px',
                                            accentColor: '#FFB22C'
                                        }}
                                    {...register('type', {
                                        required: "Transaction type is required!"
                                    })}
                                />
                                Income
                            </label>
                    </div>
                            {formState.errors.type && (
                                <small style={{
                                    color: '#ff4444',
                                    fontSize: '12px',
                                    marginTop: '4px',
                                    display: 'block',
                                    textAlign: 'center'
                                }}>
                                    {formState.errors.type.message}
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
                                {isLoading ? "Saving..." : 'Save Category'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </Container>
    )
}

export default NewCategory;