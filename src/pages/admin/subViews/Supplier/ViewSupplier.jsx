import { useState, useEffect } from "react";
import {
    Table,
    Input,
    Button,
    Popconfirm,
    message,
    Spin,
    Modal,
    Form,
    Space,
    Select,
    DatePicker,
} from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";

const ViewSupplier = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingSupplier, setEditingSupplier] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]); // Danh sách sản phẩm từ API
    const [selectedProducts, setSelectedProducts] = useState([]); // Sản phẩm được thêm hoặc chỉnh sửa

    // Lọc danh sách nhà cung cấp theo từ khóa tìm kiếm
    const filteredSuppliers = suppliers.filter((supplier) =>
        supplier.SupplierName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Fetch danh sách nhà cung cấp
    const fetchSuppliers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/suppliers`);
            console.log("Danh sách nhà cung cấp:", response.data);

            setSuppliers(
                response.data.map((supplier) => ({
                    key: supplier.SupplierID, // Sử dụng SupplierID làm key
                    ...supplier,
                }))
            );
        } catch (error) {
            console.error("Lỗi khi tải danh sách nhà cung cấp:", error);
            message.error("Không thể tải danh sách nhà cung cấp. Vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    };


    const fetchProducts = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/products`
            );
            setProducts(response.data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách sản phẩm:", error);
            message.error("Không thể tải danh sách sản phẩm.");
        }
    };

    useEffect(() => {
        fetchSuppliers();
        fetchProducts();
    }, []);


    const reloadSuppliers = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/suppliers`)
            setSuppliers(response.data.map((suppliers, index) => ({ key: index, ...suppliers })))
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error)
            message.error("Không thể tải danh sách nhân viên. Vui lòng thử lại sau.")
        } finally {
            setLoading(false)
        }
    };

    // Hàm mở modal thêm nhà cung cấp
    const showAddModal = () => {
        form.resetFields();
        setSelectedProducts([]);
        setIsModalVisible(true);
    };

    // Hàm đóng modal thêm nhà cung cấp
    const handleAddCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
        setSelectedProducts([]);
    };

    // Hàm thêm sản phẩm vào danh sách liên kết
    const handleAddProduct = () => {
        const productData = form.getFieldsValue(["ProductID", "StartDate", "EndDate"]);
        if (!productData.ProductID) {
            message.error("Vui lòng chọn sản phẩm!");
            return;
        }

        const product = products.find((p) => p.id === productData.ProductID);

        setSelectedProducts((prev) => [
            ...prev,
            {
                key: productData.ProductID,
                ProductID: product.id,
                ProductName: product.ProductName,
                StartDate: productData.StartDate
                    ? productData.StartDate.format("YYYY-MM-DD")
                    : "Chưa có",
                EndDate: productData.EndDate ? productData.EndDate.format("YYYY-MM-DD") : "Chưa có",
            },
        ]);

        form.resetFields(["ProductID", "StartDate", "EndDate"]);
    };



    // Hàm xóa sản phẩm khỏi danh sách liên kết
    const handleRemoveProduct = (key) => {
        setSelectedProducts((prev) => prev.filter((item) => item.key !== key));
    };

    const handleAddSupplier = async () => {
        try {
            setLoading(true);
            const newSupplier = form.getFieldsValue();
            const supplierData = {
                ...newSupplier,
                Products: selectedProducts.map(({ key, ProductID, StartDate, EndDate }) => ({
                    ProductID,
                    StartDate: StartDate !== "Chưa có" ? StartDate : null,
                    EndDate: EndDate !== "Chưa có" ? EndDate : null,
                })),
            };

            console.log("Dữ liệu gửi lên API:", supplierData);

            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/create-supplier`, supplierData);
            message.success("Thêm nhà cung cấp thành công!");
            handleAddCancel();
            reloadSuppliers();
        } catch (error) {
            console.error("Lỗi khi thêm nhà cung cấp:", error.response?.data || error);
            message.error(error.response?.data?.message || "Không thể thêm nhà cung cấp. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };


    // Hàm mở modal chỉnh sửa
    const showEditModal = (supplier) => {
        setEditingSupplier(supplier);

        // Đặt giá trị form chỉnh sửa
        form.setFieldsValue({
            SupplierName: supplier.SupplierName,
            Address: supplier.Address,
            PhoneNumber: supplier.PhoneNumber,
            Email: supplier.Email,
        });

        // Xử lý danh sách sản phẩm
        setSelectedProducts(
            supplier.Products.map((product) => ({
                key: product.ProductID,
                ProductID: product.ProductID,
                ProductName: product.ProductName,
                StartDate: product.StartDate ? moment(product.StartDate).format("YYYY-MM-DD") : "N/A",
                EndDate: product.EndDate ? moment(product.EndDate).format("YYYY-MM-DD") : "N/A",
            }))
        );

        setIsEditModalVisible(true);
    };

    // Hàm đóng modal chỉnh sửa
    const handleEditCancel = () => {
        setEditingSupplier(null);
        setIsEditModalVisible(false);
        form.resetFields();
        setSelectedProducts([]);
    };

    const handleEditSupplier = async () => {
        try {
            setLoading(true);
            const updatedSupplier = form.getFieldsValue();
            const supplierData = {
                ...updatedSupplier,
                Products: selectedProducts.map(({ ...rest }) => rest), // Lấy danh sách sản phẩm đã chỉnh sửa
            };

            await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/update-supplier?id=${editingSupplier.SupplierID}`,
                supplierData
            );

            message.success("Cập nhật thông tin nhà cung cấp thành công!");
            handleEditCancel();
            reloadSuppliers();
        } catch (error) {
            console.error("Lỗi khi cập nhật nhà cung cấp:", error);
            message.error("Không thể cập nhật nhà cung cấp. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatusSupplier = async (id, newStatus) => {
        try {
            setLoading(true);
            console.log("Cập nhật trạng thái:", { id, newStatus });

            await axios.patch(
                `${import.meta.env.VITE_BACKEND_URL}/api/update-supplier-status`,
                { Status: newStatus },
                { params: { id } }
            );

            message.success(
                newStatus === 1
                    ? "Nhà cung cấp đã chuyển sang trạng thái hợp tác!"
                    : "Nhà cung cấp đã chuyển sang trạng thái ngưng hợp tác!"
            );

            // Cập nhật danh sách nhà cung cấp
            reloadSuppliers();
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái nhà cung cấp:", error);
            message.error("Không thể cập nhật trạng thái nhà cung cấp. Vui lòng thử lại.");
        } finally {
            setLoading(false);
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
            title: "Tên nhà cung cấp",
            dataIndex: "SupplierName",
            key: "SupplierName",
        },
        {
            title: "Địa chỉ",
            dataIndex: "Address",
            key: "Address",
        },
        {
            title: "Số điện thoại",
            dataIndex: "PhoneNumber",
            key: "PhoneNumber",
        },
        {
            title: "Email",
            dataIndex: "Email",
            key: "Email",
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_, supplier) => (
                <Space>
                    <Button
                        type="link"
                        onClick={() => showEditModal(supplier)}
                        className="text-blue-600 font-bold"
                    >
                        Sửa
                    </Button>
                    {supplier.Status === false ? (
                        <Popconfirm
                            title="Bạn có chắc chắn muốn hợp tác nhà cung cấp không?"
                            onConfirm={() => handleUpdateStatusSupplier(supplier.SupplierID, 1)}
                            okText="Có"
                            cancelText="Không"
                        >
                            <Button
                                type="link"
                                className="text-green-600 font-bold"
                            >
                                Hợp tác
                            </Button>
                        </Popconfirm>

                    ) : (
                        <Popconfirm
                            title="Bạn có chắc chắn muốn ngưng hợp tác nhà cung cấp?"
                            type="link"
                            onConfirm={() => handleUpdateStatusSupplier(supplier.SupplierID, 0)}
                            okText="Có"
                            cancelText="Không"
                            className="text-red-600 font-bold"
                        >
                            <Button type="link"> Ngưng hợp tác</Button>
                        </Popconfirm>
                    )}
                </Space>
            ),
        }

    ];

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-5">Danh sách nhà cung cấp</h1>
            <Input
                placeholder="Tìm kiếm nhà cung cấp..."
                className="mb-4"
                style={{ width: "300px", height: "40px" }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="primary" onClick={showAddModal} className="ml-4">
                + Thêm nhà cung cấp
            </Button>
            {loading ? (
                <div className="flex justify-center items-center">
                    <Spin size="large" />
                </div>
            ) : (
                <Table
                    columns={columns}
                    dataSource={filteredSuppliers}
                    pagination={{ pageSize: 5, showSizeChanger: false }}
                />
            )}

            <Modal
                title="Thêm nhà cung cấp"
                visible={isModalVisible}
                onCancel={handleAddCancel}
                width={570}
                footer={[
                    <Button key="cancel" onClick={handleAddCancel}>
                        Hủy
                    </Button>,
                    <Button key="add" type="primary" onClick={handleAddSupplier}>
                        Thêm
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="SupplierName"
                        label="Tên nhà cung cấp"
                        rules={[{ required: true, message: "Vui lòng nhập tên nhà cung cấp!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="Address"
                        label="Địa chỉ"
                        rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="PhoneNumber"
                        label="Số điện thoại"
                        rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="Email"
                        label="Email"
                        rules={[{ type: "email", message: "Vui lòng nhập email hợp lệ!" }]}
                    >
                        <Input />
                    </Form.Item>

                    {/* Liên kết sản phẩm */}
                    <h3 className="text-lg font-bold mb-3">Liên kết sản phẩm</h3>
                    <Space style={{ display: "flex", marginBottom: 8 }} align="baseline">
                        <Form.Item name="ProductID" style={{ flex: 2 }}>
                            <Select
                                placeholder="Chọn sản phẩm"
                                options={products.map((product) => ({
                                    label: product.ProductName,
                                    value: product.id,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item name="StartDate" style={{ flex: 1 }}>
                            <DatePicker placeholder="Ngày bắt đầu" style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item name="EndDate" style={{ flex: 1 }}>
                            <DatePicker placeholder="Ngày kết thúc" style={{ width: "100%" }} />
                        </Form.Item>
                        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddProduct}>
                            Thêm
                        </Button>
                    </Space>

                    {/* Danh sách sản phẩm liên kết */}
                    <Table
                        columns={[
                            {
                                title: "Tên sản phẩm",
                                dataIndex: "ProductName",
                                key: "ProductName",
                            },
                            {
                                title: "Ngày bắt đầu",
                                dataIndex: "StartDate",
                                key: "StartDate",
                                render: (date) => (date ? date : "Chưa có"), // Hiển thị ngày hoặc "Chưa có" nếu không có giá trị
                            },
                            {
                                title: "Ngày kết thúc",
                                dataIndex: "EndDate",
                                key: "EndDate",
                                render: (date) => (date ? date : "Chưa có"), // Hiển thị ngày hoặc "Chưa có" nếu không có giá trị
                            },
                            {
                                title: "Thao tác",
                                key: "action",
                                render: (_, record) => (
                                    <Button
                                        type="link"
                                        danger
                                        icon={<DeleteOutlined />}
                                        onClick={() => handleRemoveProduct(record.key)}
                                    >
                                        Xóa
                                    </Button>
                                ),
                            },
                        ]}
                        dataSource={selectedProducts}
                        pagination={false}
                        rowKey="key"
                        bordered
                    />

                </Form>
            </Modal>


            {/* Modal sửa nhà cung cấp */}
            <Modal
                title="Sửa thông tin nhà cung cấp"
                visible={isEditModalVisible}
                onCancel={handleEditCancel}
                footer={[
                    <Button key="cancel" onClick={handleEditCancel}>
                        Hủy
                    </Button>,
                    <Button key="save" type="primary" onClick={handleEditSupplier}>
                        Lưu
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="SupplierName"
                        label="Tên nhà cung cấp"
                        rules={[{ required: true, message: "Vui lòng nhập tên nhà cung cấp!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="Address"
                        label="Địa chỉ"
                        rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="PhoneNumber"
                        label="Số điện thoại"
                        rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="Email"
                        label="Email"
                        rules={[{ type: "email", message: "Vui lòng nhập email hợp lệ!" }]}
                    >
                        <Input />
                    </Form.Item>

                    {/* Thêm sản phẩm */}
                    <h3 className="text-lg font-bold mb-3">Danh sách sản phẩm liên kết</h3>
                    <Space style={{ display: "flex", marginBottom: 8 }} align="baseline">
                        <Form.Item name="ProductID" style={{ flex: 2 }}>
                            <Select
                                placeholder="Chọn sản phẩm"
                                options={products.map((product) => ({
                                    label: product.ProductName,
                                    value: product.id,
                                }))}
                            />
                        </Form.Item>
                        <Form.Item name="StartDate" style={{ flex: 1 }}>
                            <DatePicker placeholder="Ngày bắt đầu" style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item name="EndDate" style={{ flex: 1 }}>
                            <DatePicker placeholder="Ngày kết thúc" style={{ width: "100%" }} />
                        </Form.Item>
                        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddProduct}>
                            Thêm
                        </Button>
                    </Space>

                    {/* Bảng sản phẩm */}
                    <Table
                        columns={[
                            {
                                title: "Tên sản phẩm",
                                dataIndex: "ProductName",
                                key: "ProductName",
                            },
                            {
                                title: "Ngày bắt đầu",
                                dataIndex: "StartDate",
                                key: "StartDate",
                            },
                            {
                                title: "Ngày kết thúc",
                                dataIndex: "EndDate",
                                key: "EndDate",
                            },
                            {
                                title: "Thao tác",
                                key: "action",
                                render: (_, record) => (
                                    <Button
                                        type="link"
                                        danger
                                        icon={<DeleteOutlined />}
                                        onClick={() => handleRemoveProduct(record.key)}
                                    >
                                        Xóa
                                    </Button>
                                ),
                            },
                        ]}
                        dataSource={selectedProducts}
                        pagination={false}
                        rowKey="key"
                        bordered
                    />
                </Form>
            </Modal>

        </div>
    );
};

export default ViewSupplier;
