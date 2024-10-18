import { useState, useEffect } from 'react';
// import login from '../../../assets/client/login.png';
// import google from '../../../assets/client/google.png';
// import icons from '../../../utils/icons.jsx';
import { auth, database } from '../../../config/firebaseConfig.jsx';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
const CustomerRegister = () => {
    const [formData, setFormData] = useState({
        customerName: '',
        address: '',
        email: '',
        phoneNumber: '',
        birthday: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({
        customerName: '',
        address: '',
        email: '',
        phoneNumber: '',
        birthday: '',
        password: '',
        confirmPassword: '',
    });

    useEffect(() => {
        if (formData.email && !validateEmail(formData.email)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: 'Định dạng email không hợp lệ',
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: '',
            }));
        }

        if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                confirmPassword: 'Mật khẩu không khớp',
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                confirmPassword: '',
            }));
        }
    }, [formData]);

    const handleBlur = (e) => {
        const { name, value } = e.target;
        // Nếu giá trị trống thì thông báo lỗi
        if (!value.trim()) {
            setErrors({
                ...errors,
                [name]: 'Vui lòng không bỏ trống',
            });
        } else {
            // Xóa thông báo lỗi nếu đã có giá trị
            setErrors({
                ...errors,
                [name]: '',
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateEmail = (email) => {
        // Hàm kiểm tra định dạng email
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };
    const handleRegister = async (e) => {
        e.preventDefault();
        const { email, password } = formData;
    
        try {
            // Tạo tài khoản với email và password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
            // Lấy ID token để gửi đến backend
            const token = await userCredential.user.getIdToken();
    
            // Lưu thông tin người dùng vào Realtime Database
            await set(ref(database, 'users/' + userCredential.user.uid), {
                email: userCredential.user.email,
                userActive: false,
                createdAt: new Date().toString(),
            });
    
            // Gửi thông tin đến backend
            const response = await fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ email }),
            });
    
            // Kiểm tra xem phản hồi từ backend có thành công không
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response from backend:', errorText);
                throw new Error('Lỗi đăng ký từ máy chủ.');
            }
    
            const data = await response.json(); // Chỉ gọi response.json() khi phản hồi ok
    
            console.log('Đăng ký thành công:', data);
    
            // Reset form sau khi đăng ký thành công
            setFormData({
                customerName: '',
                address: '',
                email: '',
                phoneNumber: '',
                birthday: '',
                password: '',
                confirmPassword: '',
            });
    
            // Hiển thị thông báo thành công
            alert('Đăng ký thành công!');
    
            // Gửi email xác nhận
            await userCredential.user.sendEmailVerification();
            alert('Email xác nhận đã được gửi. Vui lòng kiểm tra hộp thư.');
            
        } catch (error) {
            console.error('Lỗi đăng ký:', error.message);
            setErrors({ ...errors, email: error.message || 'Đăng ký thất bại. Thử lại email khác.' });
        }
    };
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
            <div className="w-[700px] p-8 rounded-lg shadow-lg mt-[50px]">
                <div className="flex justify-start">
                    {/* <icons.IoArrowBackSharp className="text-xl" /> */}
                </div>
                {/* Icon logo */}
                <div className="flex justify-center mb-6">
                    {/* <img src={login} alt="Logo" className="w-20 h-20" /> */}
                </div>

                {/* Title */}
                <h2 className="text-center text-2xl font-semibold mb-2">Đăng ký với</h2>

                {/* Social Login */}
                <div className="flex justify-center space-x-4 mb-4">
                    <button className="flex items-center py-2 px-4 rounded-lg">
                        {/* <img src={google} alt="Google" className="w-6 h-6 mr-2" /> Google */}
                    </button>
                </div>

                {/* Divider */}
                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">hoặc</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Form */}
                <form onSubmit={handleRegister} className="space-y-4">
                    {/* Name Input */}
                    <div className="relative">
                        <input
                            
                            type="text"
                            name="customerName"
                            placeholder="Nhập họ và tên"
                            className={`w-full text-sm p-3 rounded-lg focus:outline-none focus:ring-2 ${
                                errors.customerName ? 'border-red-500' : 'border-gray-300'
                            }`}
                            value={formData.customerName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        
                        {errors.customerName && <p className="text-sm text-red-500 mt-1">{errors.customerName}</p>}
                    </div>

                    {/* Phone Input */}
                    <div className="relative">
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Nhập số điện thoại"
                            className={`w-full p-3 text-sm rounded-lg focus:outline-none focus:ring-2 ${
                                errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                            }`}
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.phoneNumber && <p className="text-sm text-red-500 mt-1">{errors.phoneNumber}</p>}
                    </div>

                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            placeholder="Nhập email"
                            className={`w-full p-3 text-sm rounded-lg focus:outline-none focus:ring-2 ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    <div className="relative">
                        <input
                            type="date"
                            name="birthday"
                            className={`w-full p-3 border text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${
                                errors.birthday ? 'border-red-500' : 'border-gray-300'
                            }`}
                            value={formData.birthday}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.birthday && <p className="text-sm text-red-500 mt-1">{errors.birthday}</p>}
                    </div>

                    {/* Other Inputs... */}
                    <input
                        type="password"
                        name="password"
                        placeholder="Nhập mật khẩu"
                        className={`w-full p-3 rounded-lg text-sm focus:outline-none focus:ring-2 ${
                            errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Nhập lại mật khẩu"
                        className={`w-full p-3 rounded-lg text-sm focus:outline-none focus:ring-2 ${
                            errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        }`}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
                    {/* Submit button */}
                    <button type='submit' className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 text-sm">
                        Đăng ký
                    </button>
                </form>

                {/* Login link */}
                <div className="text-center mt-4 text-gray-500 text-sm">
                    Bạn đã có tài khoản?{' '}
                    <span className="text-red-500 hover:underline cursor-pointer text-sm">Đăng nhập ngay</span>
                </div>
            </div>
        </div>
    );
};

export default CustomerRegister;
