import { useState, useEffect } from 'react';
import api from "../../../../middlewares/tokenMiddleware";


const ViewCustomer = () => {
    const [customers, setCustomers] = useState([]);

    // State để lưu giá trị tìm kiếm người dùng nhập
    const [searchTerm, setSearchTerm] = useState('');

    // Lọc danh sách khách hàng theo từ khóa tìm kiếm
    const filteredCustomers = customers.filter(customer =>
        customer.CustomerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        // Lấy danh sách nhân viên
        const fetchCustomerData = async () => {
            try {
                const response = await api.get(`${import.meta.env.VITE_BACKEND_URL}/api/get-all-customer`);
                setCustomers(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCustomerData();
    }, []);

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-5">Danh sách khách hàng</h1>
            {/* Ô tìm kiếm */}
            <div className="mb-4 flex">
                <input
                    type="text"
                    placeholder="Tìm kiếm khách hàng..."
                    className="p-2 border border-gray-300 rounded mr-2"
                    value={searchTerm} // Dùng searchTerm thay vì searchInput
                    onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật searchTerm khi người dùng nhập
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border bg-blue-400">Mã</th>
                            <th className="py-2 px-4 border bg-blue-400">Tên khách hàng</th>
                            <th className="py-2 px-4 border bg-blue-400">Giới tính</th>
                            <th className="py-2 px-4 border bg-blue-400">Email</th>
                            <th className="py-2 px-4 border bg-blue-400">Số điện thoại</th>
                            <th className="py-2 px-4 border bg-blue-400">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.map((customer) => (
                            <tr key={customer.id} className="bg-white text-center hover:bg-gray-100">
                                <td className="py-2 px-4 border">{customer.id}</td>
                                <td className="py-2 px-4 border">{customer.CustomerName}</td>
                                <td className="py-2 px-4 border">{customer.Gender}</td>
                                <td className="py-2 px-4 border">{customer.Email}</td>
                                <td className="py-2 px-4 border">{customer.PhoneNumber}</td>
                                <td className="py-2 px-4 border">
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
        </div>
    );
};

export default ViewCustomer;

