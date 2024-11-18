import { useState, useEffect } from "react";
import { Table, Input, Button, Popconfirm, message, Spin, Modal, Form, Select, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
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
        } catch {
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
        } catch {
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

            {/* Modal sửa thông tin sản phẩm */}
            <Modal
                title="Sửa thông tin sản phẩm"
                centered
                visible={isEditModalVisible}
                onOk={handleEditSave}
                onCancel={handleEditCancel}
                width={700}
            >
                <Form form={form} layout="vertical">
                    {/* Tên sản phẩm */}
                    <Form.Item
                        name="ProductName"
                        label="Tên sản phẩm"
                        rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
                    >
                        <Input placeholder="Nhập tên sản phẩm" />
                    </Form.Item>

                    {/* Giá niêm yết */}
                    <Form.Item
                        name="ListedPrice"
                        label="Giá niêm yết (VND)"
                        rules={[
                            { required: true, message: "Vui lòng nhập giá niêm yết!" },
                            { type: "number", message: "Giá phải là số hợp lệ!" },
                        ]}
                    >
                        <Input type="number" placeholder="Nhập giá niêm yết" />
                    </Form.Item>

                    {/* Giá khuyến mãi */}
                    <Form.Item
                        name="PromotionalPrice"
                        label="Giá khuyến mãi (VND)"
                        rules={[
                            { type: "number", message: "Giá phải là số hợp lệ!" },
                        ]}
                    >
                        <Input type="number" placeholder="Nhập giá khuyến mãi (nếu có)" />
                    </Form.Item>

                    {/* Số lượng */}
                    <Form.Item
                        name="Stock"
                        label="Số lượng tồn kho"
                        rules={[
                            { required: true, message: "Vui lòng nhập số lượng!" },
                            { type: "number", message: "Số lượng phải là số hợp lệ!" },
                        ]}
                    >
                        <Input type="number" placeholder="Nhập số lượng sản phẩm" />
                    </Form.Item>

                    {/* Trạng thái */}
                    <Form.Item
                        name="Status"
                        label="Trạng thái"
                        rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
                    >
                        <Select placeholder="Chọn trạng thái">
                            <Select.Option value="hoạt động">Hoạt động</Select.Option>
                            <Select.Option value="ngừng hoạt động">Ngừng hoạt động</Select.Option>
                        </Select>
                    </Form.Item>

                    {/* Ảnh đại diện */}
                    <Form.Item
                        name="RepresentativeImage"
                        label="Ảnh đại diện"
                        rules={[{ required: true, message: "Vui lòng tải lên ảnh đại diện!" }]}
                    >
                        <Upload
                            name="image"
                            listType="picture-card"
                            showUploadList={false} // Không hiển thị danh sách file đã tải lên
                            action={`${import.meta.env.VITE_BACKEND_URL}/api/upload-image`}
                            maxCount={1} // Chỉ cho phép tải lên 1 ảnh
                            onChange={(info) => {
                                if (info.file.status === "done") {
                                    // Lấy URL ảnh từ phản hồi của server và gán vào form
                                    form.setFieldsValue({
                                        RepresentativeImage: info.file.response.url,
                                    });
                                    message.success("Tải ảnh lên thành công!");
                                } else if (info.file.status === "error") {
                                    message.error("Tải ảnh lên thất bại. Vui lòng thử lại.");
                                }
                            }}
                        >
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Tải lên</div>
                            </div>
                        </Upload>
                    </Form.Item>



                    {/* Mô tả */}
                    <Form.Item
                        name="Description"
                        label="Mô tả sản phẩm"
                        rules={[{ required: true, message: "Vui lòng nhập mô tả sản phẩm!" }]}
                    >
                        <Input.TextArea rows={4} placeholder="Nhập mô tả chi tiết" />
                    </Form.Item>

                    {/* Loại sản phẩm */}
                    <Form.Item
                        name="CategoryID"
                        label="Loại sản phẩm"
                        rules={[{ required: true, message: "Vui lòng chọn loại sản phẩm!" }]}
                    >
                        <Select
                            loading={loading}
                            placeholder="Chọn loại sản phẩm"
                        >
                            {categories.map((category) => (
                                <Select.Option key={category.id} value={category.id}>
                                    {category.CategoryName}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {/* Nhà sản xuất */}
                    <Form.Item
                        name="ManufacturerID"
                        label="Nhà sản xuất"
                        rules={[{ required: true, message: "Vui lòng chọn nhà sản xuất!" }]}
                    >
                        <Select
                            loading={loading}
                            placeholder="Chọn nhà sản xuất"
                        >
                            {manufacturers.map((manufacturer) => (
                                <Select.Option key={manufacturer.id} value={manufacturer.id}>
                                    {manufacturer.ManufacturerName}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {/* Quốc gia sản xuất */}
                    <Form.Item
                        name="CountryID"
                        label="Quốc gia sản xuất"
                    >
                        <Input placeholder="Nhập quốc gia sản xuất (nếu có)" />
                    </Form.Item>

                    {/* Chính sách bảo hành */}
                    <Form.Item
                        name="WarrantyPolicyID"
                        label="Chính sách bảo hành"
                    >
                        <Input placeholder="Nhập mã chính sách bảo hành (nếu có)" />
                    </Form.Item>
                </Form>
            </Modal>

        </div>
    );
};

export default ViewProduct;
