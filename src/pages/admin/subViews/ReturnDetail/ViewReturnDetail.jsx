import { useState, useEffect } from 'react';
import { Table, Button, Modal, Image, message } from 'antd';
import axios from 'axios';


const ViewReturnDetail = () => {
    const [returnDetails, setReturnDetails] = useState([]);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    // Lấy dữ liệu ReturnDetail từ API
    const fetchReturnDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/return-details`
            );
            setReturnDetails(response.data);
            setLoading(false);
        } catch (error) {
            message.error('Không thể tải dữ liệu trả hàng.');
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReturnDetails();
    }, []);

    // Hiển thị modal chi tiết
    const showDetailsModal = (detail) => {
        setSelectedDetail(detail);
        setIsModalVisible(true);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        setSelectedDetail(null);
    };

    // Cấu hình cột cho bảng
    const columns = [
        {
            title: 'Mã trả hàng',
            dataIndex: 'ReturnProductID',
            key: 'ReturnProductID',
        },
        {
            title: 'Mã sản phẩm',
            dataIndex: 'ProductID',
            key: 'ProductID',
        },
        {
            title: 'Số lượng',
            dataIndex: 'Quantity',
            key: 'Quantity',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'Status',
            key: 'Status',
            render: (status) => {
                const statusColors = {
                    Pending: 'text-yellow-500',
                    Approved: 'text-green-500',
                    Rejected: 'text-red-500',
                };
                return <span className={statusColors[status] || 'text-gray-500'}>{status}</span>;
            },
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
            <h2 className="text-2xl font-bold text-gray-800 mb-5">Chi tiết trả hàng</h2>
            <Table
                columns={columns}
                dataSource={returnDetails}
                rowKey="ReturnProductID"
                loading={loading}
                pagination={{ pageSize: 5 }}
            />

            {/* Modal hiển thị chi tiết */}
            <Modal
                title="Chi tiết trả hàng"
                visible={isModalVisible}
                onCancel={handleModalCancel}
                footer={null}
                className="rounded-lg"
            >
                {selectedDetail && (
                    <div className="space-y-4">
                        <p>
                            <strong>Mã trả hàng:</strong> {selectedDetail.ReturnProductID}
                        </p>
                        <p>
                            <strong>Mã sản phẩm:</strong> {selectedDetail.ProductID}
                        </p>
                        <p>
                            <strong>Số lượng:</strong> {selectedDetail.Quantity}
                        </p>
                        <p>
                            <strong>Hình ảnh trả hàng:</strong>
                        </p>
                        {selectedDetail.ReturnImage ? (
                            <Image
                                src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${selectedDetail.ReturnImage}`}
                                alt="Hình ảnh trả hàng"
                                className="rounded-lg"
                            />
                        ) : (
                            <p>Không có hình ảnh.</p>
                        )}
                        <p>
                            <strong>Lý do trả hàng:</strong> {selectedDetail.Reason || 'Không có lý do.'}
                        </p>
                        <p>
                            <strong>Trạng thái:</strong>{' '}
                            <span className={selectedDetail.Status === 'Approved' ? 'text-green-500' : selectedDetail.Status === 'Rejected' ? 'text-red-500' : 'text-yellow-500'}>
                                {selectedDetail.Status}
                            </span>
                        </p>
                        <p>
                            <strong>Mã yêu cầu:</strong> {selectedDetail.RequestID}
                        </p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ViewReturnDetail;
