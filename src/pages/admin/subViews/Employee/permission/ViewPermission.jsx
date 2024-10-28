import { useState } from 'react';

const ViewPermission = () => {
    //const [permissions, setPermissions] = useState([
    const [permissions] = useState([
        {
            id: 1,
            name: 'Admin',

        },
        {
            id: 2,
            name: 'Quản lí',

        },
        {
            id: 3,
            name: 'Nhân viên',

        },
        {
            id: 4,
            name: 'Nhân viên giao hàng',

        },
        {
            id: 5,
            name: 'Nhân viên kho',

        },
    ]);

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-5">Danh sách quyền</h1>

            <div className="overflow-x-auto">
                <table className="text-left min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border text-xl">Tên quyền</th>
                            <th className="py-2 px-4 border text-xl">Số lượng tài khoản</th>
                        </tr>
                    </thead>
                    <tbody>
                        {permissions.map((permission) => (
                            <tr key={permission.id} className=" hover:bg-gray-100">
                                <td className="py-2 px-4 border">{permission.name}</td>
                                <td className="py-2 px-4 border">{ }</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewPermission;
