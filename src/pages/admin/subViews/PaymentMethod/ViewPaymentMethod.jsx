import { useState, useEffect } from "react";
import { Table, Input, Button, Popconfirm, message, Spin } from "antd";
import axios from "axios";

const ViewPaymentMethod = () => {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    // Lọc danh sách phương thức thanh toán theo từ khóa tìm kiếm
    const filteredPaymentMethods = paymentMethods.filter((method) =>
        method.PaymentMethodName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Fetch danh sách phương thức thanh toán
    useEffect(() => {
        const fetchPaymentMethods = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/method-payment`
                );
                setPaymentMethods(
                    response.data.map((method, index) => ({ key: index, ...method }))
                );
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
                message.error(
                    "Không thể tải danh sách phương thức thanh toán. Vui lòng thử lại sau."
                );
            } finally {
                setLoading(false);
            }
        };
        fetchPaymentMethods();
    }, []);

    const reloadPaymentMethods = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/method-payment`
            );
            setPaymentMethods(
                response.data.map((method, index) => ({ key: index, ...method }))
            );
        } catch {
            message.error("Vui lòng thử lại sau");
        } finally {
            setLoading(false);
        }
    };

    // Kích hoạt phương thức thanh toán
    const handleActivate = async (id) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/update-status-method-payment`,
                { id }
            );
            reloadPaymentMethods();
            message.success(response.data.message);
        } catch (error) {
            console.error("Lỗi khi kích hoạt phương thức thanh toán", error);
            message.error("Không thể kích hoạt phương thức thanh toán! Vui lòng thử lại.");
        }
    };

    // Ngưng hoạt động phương thức thanh toán
    const handleDeactivate = async (id) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/update-status-method-payment`,
                { id }
            );
            reloadPaymentMethods();
            message.success(response.data.message);
        } catch (error) {
            console.error("Lỗi khi ngưng hoạt động phương thức thanh toán", error);
            message.error("Không thể ngưng hoạt động phương thức thanh toán! Vui lòng thử lại.");
        }
    };

    const columns = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Tên phương thức thanh toán",
            dataIndex: "PaymentMethodName",
            key: "PaymentMethodName",
            render: (name) => name || "Chưa cập nhật",
        },
        {
            title: "Mô tả",
            dataIndex: "Description",
            key: "Description",
            render: (description) => description || "Chưa cập nhật",
        },
        {
            title: "Trạng thái",
            dataIndex: "Status",
            key: "Status",
            render: (status) => (status === "hoạt động" ? "Hoạt động" : "Ngừng hoạt động"),
        },
        {
            title: "Thao tác",
            key: "action",
            render: (text, record) => (
                <>
                    {record.Status === "hoạt động" ? (
                        <Popconfirm
                            title="Bạn có chắc chắn muốn ngưng hoạt động phương thức thanh toán này không?"
                            onConfirm={() => handleDeactivate(record.id)}
                            okText="Có"
                            cancelText="Không"
                        >
                            <Button type="link" className="text-red-600 font-bold mx-1">
                                Ngưng hoạt động
                            </Button>
                        </Popconfirm>
                    ) : (
                        <Popconfirm
                            title="Bạn có chắc chắn muốn kích hoạt phương thức thanh toán này không?"
                            onConfirm={() => handleActivate(record.id)}
                            okText="Có"
                            cancelText="Không"
                        >
                            <Button type="link" className="text-green-600 font-bold mx-1">
                                Hoạt động
                            </Button>
                        </Popconfirm>
                    )}
                </>
            ),
        },
    ];

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-5">Danh sách phương thức thanh toán</h1>
            <Input
                placeholder="Tìm kiếm phương thức thanh toán..."
                className="mb-4"
                style={{ width: "300px", height: "40px" }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {loading ? (
                <div className="flex justify-center items-center">
                    <Spin size="large" />
                </div>
            ) : (
                <Table
                    columns={columns}
                    dataSource={filteredPaymentMethods}
                    pagination={{
                        pageSize: 5,
                        showSizeChanger: false,
                    }}
                />
            )}
            <div className="text-sm mt-2">{filteredPaymentMethods.length} phương thức thanh toán</div>
        </div>
    );
};

export default ViewPaymentMethod;
