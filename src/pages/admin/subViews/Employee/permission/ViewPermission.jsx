import { useState, useEffect } from 'react';
import { Table, Spin, notification } from 'antd';
import axios from 'axios';

const ViewPermission = () => {
    // State to hold permissions data and loading status
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch permissions from API
    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/positions`);
                setPermissions(response.data);
            } catch (error) {
                notification.error({
                    message: 'Error',
                    description: error.message,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchPermissions();
    }, []);

    // Define columns for Ant Design Table
    const columns = [
        {
            title: 'Tên quyền',
            dataIndex: 'PositionName',
            key: 'PositionName',
        },
        {
            title: 'Số lượng tài khoản',
            dataIndex: 'employeeCount',
            key: 'employeeCount',
        },
    ];

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-5">Danh sách quyền</h1>
            <Spin spinning={loading}>
                <Table
                    columns={columns}
                    dataSource={permissions}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                />
            </Spin>
        </div>
    );
};

export default ViewPermission;

