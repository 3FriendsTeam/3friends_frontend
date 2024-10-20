import { useState, useEffect } from 'react';
import { auth } from '../../../config/firebaseConfig.jsx';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';



const CustomerRegister = () => {
    const [formData, setFormData] = useState({
        customerName: '',
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
    // kiểm tra định dạng email
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
    //kiểm tra dữ liệu bị bỏ trống
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
    // kiểm tra thay đổi dữ liệu
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    //kiểm tra email hợp lệ
    const validateEmail = (email) => {
        // A regular expression to check if the email address is valid
        // Hàm kiểm tra định dạng email
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

//các hàm xử lí đăng ký


    //lưu thông tin người dùng
    const saveAccount =async (
        {
            uid,
            customerName,
            gender,
            email,
            phoneNumber,
            birthDate,
            isVerified = false,
        }
    ) => {
        try{
            console.log(uid,customerName,gender,email,phoneNumber,birthDate,isVerified);
            const response = await axios.post('http://localhost:3001/api/register', {
            uid,
            customerName,
            gender,
            email,
            phoneNumber,
            birthDate,
            isVerified,
            })
            if(response.status === 200){
                console.log("save accounting success");
                return true;
            }
        }catch(error){
            console.log("error save accounting",error.message);
            return false;
        }

    }

    // check email tồn tại hay chưa
    const checkEmail = async ({ email }) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/check-email?email=${email}`);
            console.log("res: ", response);
    
            if (response.data.success) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("error check mail: ", error.message);
            return false;
        }
    };
    //xử lý đăng ký
    const handleRegister = async (e) => {
        e.preventDefault();
        const { email, password } = formData;
    
        try {
           
            const checkCreatedEmail = await checkEmail({ email });
            console.log("checkCreatedEmail: ", checkCreatedEmail);
            if (checkCreatedEmail) {
                alert('Email đã tồn tại trên hệ thống. Vui lý đăng ký lại!');
                throw new Error('Email đã đăng ký');
            }
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                if (userCredential) {
                    await saveAccount({
                        uid: userCredential.user.uid,
                        customerName: formData.customerName,
                        gender: formData.gender,
                        email: formData.email,
                        phoneNumber: formData.phoneNumber,
                        birthDate: formData.birthday,
                    });
                }
                setFormData({
                    customerName: '',
                    email: '',
                    phoneNumber: '',
                    birthday: '',
                    password: '',
                    confirmPassword: '',
                });
                alert('Đăng ký thành công vui lòng xác thực email!');
            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    alert('Email đã tồn tại trên hệ thống. Vui lòng đăng ký với email khác!');
                } else {
                    console.error('Error creating user:', error.message);
                }
            }
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
                    <div className="relative mt-4">
                        <label className="block text-sm mb-2">Giới tính</label>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="Nam"
                                className="mr-2"
                                checked={formData.gender === 'Nam'}
                                onChange={handleChange}
                            />
                            <label className="mr-4">Nam</label>

                            <input
                                type="radio"
                                name="gender"
                                value="Nữ"
                                className="mr-2"
                                checked={formData.gender === 'Nữ'}
                                onChange={handleChange}
                            />
                            <label className="mr-4">Nữ</label>

                            <input
                                type="radio"
                                name="gender"
                                value="Khác"
                                className="mr-2"
                                checked={formData.gender === 'Khác'}
                                onChange={handleChange}
                            />
                            <label>Khác</label>
                            </div>
                    </div>
                    {errors.gender && <p className="text-sm text-red-500 mt-1">{errors.gender}</p>}  
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            placeholder="Nhập email*"
                            className={`w-full p-3 text-sm rounded-lg focus:outline-none focus:ring-2 ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                    </div>
                    {/* Phone Input */}
                    <div className="relative">
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Nhập số điện thoại*"
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
