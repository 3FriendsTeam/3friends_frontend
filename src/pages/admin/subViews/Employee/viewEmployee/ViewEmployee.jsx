import { useState } from 'react';
import AddEmployee from '../addEmployee/AddEmployee'; // Giả sử bạn đã có component AddEmployee

const ViewEmployee = () => {
    //const [employees, setEmployees] = useState([
    const [employees] = useState([
        {
            id: 1,
            name: 'Trần Văn Tình',
            email: 'tinh@gmail.com',
            phonenumber: '0123456789',
            position: 'Nhân viên quèn',
        },
        {
            id: 2,
            name: 'Trần Văn Tình',
            email: 'tinh@gmail.com',
            phonenumber: '0123456789',
            position: 'Nhân viên quèn',
        },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [isAddingEmployee, setIsAddingEmployee] = useState(false); // Thêm state để quản lý hiển thị AddEmployee

    // Lọc danh sách nhân viên theo từ khóa tìm kiếm
    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto">
            {isAddingEmployee ? (
                // Hiển thị component AddEmployee khi isAddingEmployee là true
                <AddEmployee onBack={() => setIsAddingEmployee(false)} />
            ) : (
                // Hiển thị danh sách nhân viên khi isAddingEmployee là false
                <>
                    <h1 className="text-3xl font-bold mb-5">Danh sách nhân viên</h1>
                    {/* Ô tìm kiếm */}
                    <div className="mb-4 flex">
                        <input
                            type="text"
                            placeholder="Tìm kiếm nhân viên..."
                            className="p-2 border border-gray-300 rounded mr-2"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <button
                            onClick={() => setIsAddingEmployee(true)} // Cập nhật trạng thái khi nhấn nút
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto cursor-pointer"
                        >
                            Thêm nhân viên
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border">Mã</th>
                                    <th className="py-2 px-4 border">Họ tên</th>
                                    <th className="py-2 px-4 border">Email</th>
                                    <th className="py-2 px-4 border">Số điện thoại</th>
                                    <th className="py-2 px-4 border">Chức vụ</th>
                                    <th className="py-2 px-4 border">Ngày tạo</th>
                                    <th className="py-2 px-4 border">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEmployees.map((employee) => (
                                    <tr key={employee.id} className="text-center hover:bg-gray-100">
                                        <td className="py-2 px-4 border">{employee.id}</td>
                                        <td className="py-2 px-4 border">{employee.name}</td>
                                        <td className="py-2 px-4 border">{employee.email}</td>
                                        <td className="py-2 px-4 border">{employee.phonenumber}</td>                                      
                                        <td className="py-2 px-4 border">{employee.position}</td>
                                        <td className="py-2 px-4 border">{}</td>
                                        <td className="py-2 px-4 border">
                                            <button
                                                className="bg-blue-200 hover:bg-blue-700 hover:text-white text-blue-700 font-bold py-1 px-2 rounded mx-1"
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                className="hover:text-white hover:bg-red-700 text-red-400 font-bold py-1 px-2 rounded mx-1"
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default ViewEmployee;
