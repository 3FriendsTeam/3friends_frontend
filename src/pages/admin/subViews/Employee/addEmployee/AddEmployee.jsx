import React, { useState } from 'react';
import UploadImgEmployee from './UploadImgEmployee'; // Import phần upload ảnh

const AddEmployee = ({ onBack }) => {
    const [FullName, setFullName] = useState('');
    const [DateOfBirth, setDateOfBirth] = useState('');
    const [Gender, setGender] = useState('');
    const [Address, setAddress] = useState('');
    const [Email, setEmail] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [Role, setRole] = useState('');
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    // Hàm xử lý submit form
    const handleSubmit = (e) => {
        e.preventDefault(); // Ngăn hành vi mặc định của form
        // Xử lý gửi dữ liệu ở đây (gửi đến server hoặc xử lý dữ liệu)
        console.log({
            FullName,
            DateOfBirth,
            Gender,
            Address,
            Email,
            PhoneNumber,
            Role,
            Username,
            Password,
            thumbnail
        });
    };

    return (
        <div className="">
            <h1 className="text-blue-800 text-3xl font-bold mb-5 flex justify-center">Thêm nhân viên</h1>
            <form onSubmit={handleSubmit}>
                {/* Phần thông tin cơ bản nhân viên */}
                <div className="p-4 border rounded bg-white shadow-md mb-4 grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium">Họ tên</label>
                        <input
                            type="text"
                            value={FullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full border p-2 mb-2"
                        />

                        <label className="block text-sm font-medium">Ngày sinh</label>
                        <input
                            type="date"
                            value={DateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            className="w-full border p-2 mb-2"
                        />

                        <label className="block text-sm font-medium">Giới tính</label>
                        <select
                            value={Gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="w-full border p-2 mb-2"
                        >
                            <option value="">-- Chọn giới tính --</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">Khác</option>
                        </select>

                        <label className="block text-sm font-medium">Địa chỉ</label>
                        <input
                            type="text"
                            value={Address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full border p-2 mb-2"
                        />

                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border p-2 mb-2"
                        />

                        <label className="block text-sm font-medium">Số điện thoại</label>
                        <input
                            type="tel"
                            value={PhoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full border p-2 mb-2"
                        />

                    </div>

                    <div>
                        <label className="block text-sm font-medium">Chức vụ</label>
                        <select
                            value={Role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full border p-2 mb-2"
                        >
                            <option value="">-- Chọn chức vụ --</option>
                            <option value="Quản lý">Quản lý</option>
                            <option value="Nhân viên">Nhân viên</option>
                            <option value="Kỹ sư">Kỹ sư</option>
                        </select>

                        <label className="block text-sm font-medium">Tên đăng nhập</label>
                        <input
                            value={Username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border p-2 mb-2"
                        />

                        <label className="block text-sm font-medium">Mật khẩu</label>
                        <input
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border p-2 mb-2"
                            type='password'
                        />
                    </div>
                </div>

                {/* Thêm phần upload ảnh */}
                <UploadImgEmployee setThumbnail={setThumbnail} />

                <div className='flex justify-center'>
                    <button
                        type="submit"
                        className="bg-green-500 text-white p-2 rounded mt-4"
                    >
                        Thêm nhân viên
                    </button>
                </div>

                <button
                    onClick={onBack} // Gọi hàm onBack khi nhấn nút "Quay lại"
                    type="button"
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4"
                >
                    Quay lại
                </button>
            </form>
        </div>
    );
}

export default AddEmployee;
