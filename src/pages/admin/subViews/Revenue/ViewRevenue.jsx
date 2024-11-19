import { useState, useEffect } from 'react';
import { Table, Button, Modal, message } from 'antd';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

const ViewRevenue = () => {
    const [revenueReports, setRevenueReports] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [loading, setLoading] = useState(false);

    // Lấy dữ liệu báo cáo doanh thu từ API
    const fetchRevenueReports = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/revenue-reports`);
            setRevenueReports(response.data);
            setLoading(false);
        } catch (error) {
            message.error('Không thể tải dữ liệu báo cáo doanh thu.');
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRevenueReports();
    }, []);

    // Hiển thị modal chi tiết báo cáo
    const showDetailsModal = (report) => {
        setSelectedReport(report);
        setIsModalVisible(true);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        setSelectedReport(null);
    };

    // Cấu hình cột cho bảng
    const columns = [
        {
            title: 'Ngày báo cáo',
            dataIndex: 'ReportDate',
            key: 'ReportDate',
            render: (text) => new Date(text).toLocaleDateString(),
        },
        {
            title: 'Tổng doanh thu',
            dataIndex: 'TotalRevenue',
            key: 'TotalRevenue',
            render: (value) => `${value.toLocaleString()} VND`,
        },
        {
            title: 'Người báo cáo',
            dataIndex: 'ReportedBy',
            key: 'ReportedBy',
        },
        {
            title: 'Ghi chú',
            dataIndex: 'Notes',
            key: 'Notes',
            ellipsis: true,
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Button type="link" onClick={() => showDetailsModal(record)}>
                    Xem chi tiết
                </Button>
            ),
        },
    ];

    return (
        <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">Báo cáo doanh thu</h2>
            <Table
                columns={columns}
                dataSource={revenueReports}
                rowKey="id"
                loading={loading}
                pagination={{ pageSize: 5 }}
            />

            {/* Modal hiển thị chi tiết báo cáo */}
            <Modal
                title="Chi tiết báo cáo doanh thu"
                visible={isModalVisible}
                onCancel={handleModalCancel}
                footer={null}
                className="rounded-lg"
            >
                {selectedReport && (
                    <div className="space-y-4">
                        <p>
                            <strong>Ngày báo cáo:</strong>{' '}
                            {new Date(selectedReport.ReportDate).toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Tổng doanh thu:</strong>{' '}
                            {selectedReport.TotalRevenue.toLocaleString()} VND
                        </p>
                        <p>
                            <strong>Người báo cáo:</strong> {selectedReport.ReportedBy}
                        </p>
                        <p>
                            <strong>Ghi chú:</strong> {selectedReport.Notes || 'Không có ghi chú.'}
                        </p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ViewRevenue;
