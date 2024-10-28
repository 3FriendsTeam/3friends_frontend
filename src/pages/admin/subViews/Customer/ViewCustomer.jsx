import { useState } from 'react';

const ViewCustomer = () => {
    //const [customers, setCustomers] = useState([
    const [customers] = useState([
        {
            id: 1,
            name: 'Trần Văn Tình',
            gender: 'Nam',
            email: 'tinh@gmail.com',
            phonenumber: '0123456789',
        },
        {
            id: 2,
            name: 'Trần Vân Anh',
            gender: 'Nữ',
            email: 'va123@gmail.com',
            phonenumber: '0123456987',
        },
    ]);

    // const handleDelete = (id) => {
    //     setCustomers(customers.filter(customer => customer.id !== id));
    // };

    // State để lưu giá trị tìm kiếm người dùng nhập
    const [searchTerm, setSearchTerm] = useState('');

    // Lọc danh sách khách hàng theo từ khóa tìm kiếm
    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                                <td className="py-2 px-4 border">{customer.name}</td>
                                <td className="py-2 px-4 border">{customer.gender}</td>
                                <td className="py-2 px-4 border">{customer.email}</td>
                                <td className="py-2 px-4 border">{customer.phonenumber}</td>
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

