import { useState, useEffect } from 'react';
import AddEmployee from '../addEmployee/AddEmployee'; 
import api from "../../../../../middlewares/tokenMiddleware";

const ViewEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [positions, setPositions] = useState([]); // Lưu danh sách chức vụ
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddingEmployee, setIsAddingEmployee] = useState(false); // Thêm state để quản lý hiển thị AddEmployee

    // Lọc danh sách nhân viên theo từ khóa tìm kiếm
    const filteredEmployees = employees.filter(employee =>
        employee.FullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        // Lấy danh sách nhân viên
        const fetchEmployeeData = async () => {
            try {
                const response = await api.get(`${import.meta.env.VITE_BACKEND_URL}/api/employees`);
                setEmployees(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        // Lấy danh sách chức vụ từ API
        const fetchPositionData = async () => {
            try {
                const response = await api.get(`${import.meta.env.VITE_BACKEND_URL}/api/positions`);
                setPositions(response.data); // Gán danh sách chức vụ vào state
            } catch (error) {
                console.log(error);
            }
        };

        fetchEmployeeData();
        fetchPositionData();
    }, []);

    // Hàm tìm tên chức vụ dựa trên PositionID
    const getPositionName = (PositionID) => {
        const position = positions.find(p => p.id === parseInt(PositionID)); // Chuyển PositionID sang kiểu số nếu cần
        return position ? position.PositionName : 'Chưa xác định';
    };



    return (
        <div className="container mx-auto">
            {isAddingEmployee ? (
                <AddEmployee onBack={() => setIsAddingEmployee(false)} />
            ) : (
                <>
                    <h1 className="text-3xl font-bold mb-5">Danh sách nhân viên</h1>
                    <div className="mb-4 flex">
                        <input
                            type="text"
                            placeholder="Tìm kiếm nhân viên..."
                            className="p-2 border border-gray-300 rounded mr-2"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            onClick={() => setIsAddingEmployee(true)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto cursor-pointer"
                        >
                            Thêm nhân viên
                        </button>
                    </div>

                    {employees.length === 0 ? (
                        <p>Không có dữ liệu nhân viên.</p>
                    ) : (
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
                                            <td className="py-2 px-4 border">{employee.FullName}</td>
                                            <td className="py-2 px-4 border">{employee.Email}</td>
                                            <td className="py-2 px-4 border">{employee.PhoneNumber}</td>
                                            <td className="py-2 px-4 border">{getPositionName(employee.PositionID)}</td>
                                            <td className="py-2 px-4 border">{employee.createdAt ? new Date(employee.createdAt).toLocaleDateString() : 'N/A'}</td>
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
                    )}
                </>
            )}
        </div>
    );
};

export default ViewEmployee;
