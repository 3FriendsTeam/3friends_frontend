import { useState, useEffect } from "react";
import { Table, Input, message, Spin } from "antd";
import axios from "axios";

const ViewDiscontinuedProducts = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [manufacturers, setManufacturers] = useState([]);
    const [loading, setLoading] = useState(false);

    // State để lưu giá trị tìm kiếm người dùng nhập
    const [searchTerm, setSearchTerm] = useState("");

    // Lọc danh sách sản phẩm theo từ khóa tìm kiếm
    const filteredProducts = products.filter((product) =>
        product.id?.toString().includes(searchTerm) ||
        product.ProductName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/get-discontinued-products`
                );
                
                setProducts(
                    response.data.map((product, index) => ({ key: index, ...product }))
                );
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
                message.error(
                    "Không thể tải danh sách sản phẩm ngưng kinh doanh. Vui lòng thử lại sau."
                );
            } finally {
                setLoading(false);
            }
        };

        const fetchCategoryData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/categories`
                );
                setCategories(
                    response.data.map((category, index) => ({
                        key: index,
                        ...category,
                    }))
                );
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
                message.error(
                    "Không thể tải danh sách loại sản phẩm. Vui lòng thử lại sau."
                );
            }
        };

        const fetchManufacturerData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/manufacturers`
                );
                setManufacturers(
                    response.data.map((manufacturer, index) => ({
                        key: index,
                        ...manufacturer,
                    }))
                );
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
                message.error(
                    "Không thể tải danh sách nhà sản xuất. Vui lòng thử lại sau."
                );
            }
        };
        fetchProductData();
        fetchCategoryData();
        fetchManufacturerData();
        console.log(products)
    }, []);

    // Hàm tìm tên loại sản phẩm dựa trên ProductTypeID
    const getCategoryName = (CategoryID) => {
        const category = categories.find(
            (p) => p.id === parseInt(CategoryID)
        );
        return category ? category.CategoryName : "Chưa xác định";
    };

    // Hàm tìm tên NSX dựa trên ManufacturerID
    const getManufacturerName = (ManufacturerID) => {
        const manufacturer = manufacturers.find(
            (p) => p.id === parseInt(ManufacturerID)
        );
        return manufacturer ? manufacturer.ManufacturerName : "Chưa xác định";
    };

    // Cột trong bảng
    const columns = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Mã sản phẩm",
            dataIndex: "id",
            key: "id",
            render: (id) => ("#"+id) || "Chưa cập nhật",
        },
        {
            title: "Ảnh đại diện",
            dataIndex: "RepresentativeImage",
            key: "RepresentativeImage",
            render: (RepresentativeImage) =>
                RepresentativeImage ? (
                <img
                  src={RepresentativeImage}
                  alt="Ảnh đại diện"
                  className="w-12 h-12 object-cover rounded"
                />
              ) : (
                "Chưa có ảnh"
              ),
          },
        {
            title: "Tên sản phẩm",
            dataIndex: "ProductName",
            key: "ProductName",
            render: (ProductName) => ProductName || "Chưa cập nhật",
        },
        {
            title: "Số lượng tồn kho",
            dataIndex: "Stock",
            key: "Stock"
        },
        {
            title: "NSX",
            dataIndex: "ManufacturerID",
            key: "ManufacturerID",
            render: (ManufacturerID) =>
                getManufacturerName(ManufacturerID) || "Chưa cập nhật",
        },
        {
            title: "Loại sản phẩm",
            dataIndex: "CategoryID",
            key: "CategoryID",
            render: (CategoryID) =>
                getCategoryName(CategoryID) || "Chưa cập nhật",
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
        // Loại bỏ cột thao tác
    ];

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-5">
                Danh sách sản phẩm ngưng kinh doanh
            </h1>
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
        </div>
    );
};

export default ViewDiscontinuedProducts;
