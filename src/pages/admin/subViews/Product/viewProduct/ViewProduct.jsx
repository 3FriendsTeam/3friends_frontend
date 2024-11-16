import { useState, useEffect } from "react";
import { Table, Input, Button, Popconfirm, message, Spin, Modal, Form, Radio, Select } from "antd";
import axios from "axios";

const ViewProduct = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [manufacturers, setManufacturers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingProduct, setEditingProduct] = useState(null);

    // State để lưu giá trị tìm kiếm người dùng nhập
    const [searchTerm, setSearchTerm] = useState('');

    // Lọc danh sách sản phẩm theo từ khóa tìm kiếm
    const filteredProducts = products.filter(product =>
        product.ProductName.toLowerCase().includes(searchTerm.toLowerCase())
    );


    // Fetch danh sách nhân viên
    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/products`
                );
                setProducts(
                    response.data.map((product, index) => ({ key: index, ...product }))
                );
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
                message.error("Không thể tải danh sách nhân viên. Vui lòng thử lại sau.");
            } finally {
                setLoading(false);
            }
        };

        const fetchCategoryData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/categories`
                );
                setCategories(
                    response.data.map((categories, index) => ({ key: index, ...categories }))
                );
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
                message.error("Không thể tải danh sách nhân viên. Vui lòng thử lại sau.");
            } finally {
                setLoading(false);
            }
        };

        const fetchManufacturerData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/manufacturers`
                );
                setManufacturers(
                    response.data.map((manufacturer, index) => ({ key: index, ...manufacturer }))
                );
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
                message.error("Không thể tải danh sách nhân viên. Vui bạn thử được sau.");
            } finally {
                setLoading(false);
            }
        };

        fetchManufacturerData();
        fetchCategoryData();
        fetchProductData();
    }, []);

    // Hàm tìm tên loai sp dựa trên CategoryID
    const getCategoryName = (ProductTypeID) => {
        const categoryname = categories.find(p => p.id === parseInt(ProductTypeID));
        return categoryname ? categoryname.CategoryName : 'Chưa xác định';
    };

    // Hàm tìm tên NSX dựa trên ManufacturerID
    const getManufacturerName = (ManufacturerID) => {
        const manufacturername = manufacturers.find(p => p.id === parseInt(ManufacturerID));
        return manufacturername ? manufacturername.ManufacturerName : 'Chưa xác định';
    };


    // Hàm xử lý xóa nhân viên
    const handleDelete = async (key) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/delete-employee/${key}`);
            setProducts(products.filter((product) => product.key !== key));
            message.success("Xóa nhân viên thành công.");
        } catch (error) {
            message.error("Không thể xóa nhân viên. Vui lòng thử lại.");
        }
    };

    // Mở modal chỉnh sửa
    const showEditModal = (employee) => {
        setEditingProduct(employee);
        setIsEditModalVisible(true);
        form.setFieldsValue(employee);
    };

    // Đóng modal chỉnh sửa
    const handleEditCancel = () => {
        setEditingProduct(null);
        setIsEditModalVisible(false);
        form.resetFields();
    };

    // Lưu chỉnh sửa
    const handleEditSave = async () => {
        try {
            const updatedProduct = form.getFieldsValue();
            setProducts((prev) =>
                prev.map((product) =>
                    product.key === editingProduct.key ? { ...product, ...updatedProduct } : product
                )
            );
            message.success("Cập nhật thông tin nhân viên thành công.");
            handleEditCancel();
        } catch (error) {
            message.error("Không thể cập nhật nhân viên. Vui lòng thử lại.");
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
            title: "Ảnh đại diện",
            dataIndex: "RepresentImage",
            key: "RepresentImage",
            render: (RepresentImage) => RepresentImage || "Chưa có ảnh",
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "ProductName",
            key: "ProductName",
            render: (ProductName) => ProductName || "Chưa cập nhật",
        },
        {
            title: "Số lượng",
            dataIndex: "Stock",
            key: "Stock",
            render: (Stock) => Stock || "Chưa cập nhật",
        },
        {
            title: "NSX",
            dataIndex: "ManufacturerID",
            key: "ManufacturerID",
            render: (ManufacturerID) => getManufacturerName(ManufacturerID) || "Chưa cập nhật",
        },
        {
            title: "Loại sản phẩm",
            dataIndex: "ProductTypeID",
            key: "ProductTypeID",
            render: (ProductTypeID) => getCategoryName(ProductTypeID) || "Chưa cập nhật",
        },
        {
            title: "Giá (VND)",
            dataIndex: "ListedPrice",
            key: "ListedPrice",
            render: (ListedPrice) =>
                ListedPrice !== null && ListedPrice !== undefined
                    ? ListedPrice.toLocaleString()
                    : "Chưa cập nhật",

        },
        {
            title: "Thao tác",
            key: "action",
            render: (text, record) => (
                <>
                    <Button type="primary"
                        onClick={showEditModal.bind(this, record)}
                        className="text-blue-600 font-bold mx-1 bg-blue-100">
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa nhân viên này không?"
                        onConfirm={() => handleDelete(record.key)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button type="link" className="text-red-600 font-bold mx-1">
                            Xóa
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-5">Danh sách sản phẩm</h1>
            <Input
                placeholder="Tìm kiếm sản phẩm..."
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
                    dataSource={filteredProducts}
                    pagination={{
                        pageSize: 5,
                        showSizeChanger: false,
                    }}
                />
            )}

            {/* Modal thêm nhân viên */}
            <Modal
                title="Sửa thông tin sản phẩm"
                centered
                visible={isEditModalVisible}
                onOk={handleEditSave}
                onCancel={handleEditCancel}
                width={700}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="FullName"
                        label="Tên nhân viên"
                        rules={[{ required: true, message: "Vui lòng nhập tên nhân viên!" }]}
                    >
                        <Input placeholder="" />
                    </Form.Item>
                    <Form.Item
                        name="DateOfBirth"
                        label="Ngày sinh"
                        rules={[{ required: true, message: "Vui lòng nhập tên nhân viên!" }]}
                    >
                        <Input placeholder="dd/mm/yyyy" />
                    </Form.Item>

                    <Form.Item
                        name="Address"
                        label="Địa chỉ"
                        rules={[{ type: "address", message: "Vui lòng nhập địa chỉ hợp lệ!" }]}
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
                    <Form.Item name="PhoneNumber" label="Số điện thoại">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="PositionID"
                        label="Chức vụ"
                        rules={[{ required: true, message: "Vui lòng chọn chức vụ!" }]}
                    >
                        <Select
                            loading={loading}

                            placeholder="Chọn chức vụ"
                        />
                    </Form.Item>
                    <Form.Item
                        name="Username"
                        label="Tên tài khoản"
                        rules={[{ required: true, message: "Vui lòng nhập tên nhân viên!" }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ViewProduct;
