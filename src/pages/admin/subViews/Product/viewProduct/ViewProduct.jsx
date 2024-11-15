import { useState, useEffect } from 'react';
import api from "../../../../../middlewares/tokenMiddleware";


const ViewProduct = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [manufacturers, setManufacturers] = useState([]);

    const handleDelete = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    const handleEdit = (id) => {
        console.log(`Sửa sản phẩm với ID: ${id}`);
    };

    // State để lưu giá trị tìm kiếm người dùng nhập
    const [searchTerm, setSearchTerm] = useState('');

    // Lọc danh sách sản phẩm theo từ khóa tìm kiếm
    const filteredProducts = products.filter(product =>
        product.ProductName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        // Lấy danh sách sản phẩm
        const fetchProductData = async () => {
            try {
                const response = await api.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
                setProducts(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchCategoryData = async () => {
            try {
                const response = await api.get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`);
                setCategories(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchManufacturerData = async () => {
            try {
                const response = await api.get(`${import.meta.env.VITE_BACKEND_URL}/api/manufacturers`);
                setManufacturers(response.data);
            } catch (error) {
                console.log(error);
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


    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-5">Danh sách sản phẩm</h1>
            {/* Ô tìm kiếm */}
            <div className="mb-4 flex">
                <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    className="p-2 border border-gray-300 rounded mr-2"
                    value={searchTerm} // Dùng searchTerm thay vì searchInput
                    onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật searchTerm khi người dùng nhập
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border">Mã</th>
                            <th className="py-2 px-4 border">Ảnh đại diện</th>
                            <th className="py-2 px-4 border">Tên sản phẩm</th>
                            <th className="py-2 px-4 border">Số lượng</th>
                            <th className="py-2 px-4 border">NSX</th>
                            <th className="py-2 px-4 border">Loại sản phẩm</th>
                            <th className="py-2 px-4 border">Giá</th>
                            <th className="py-2 px-4 border">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.id} className="text-center hover:bg-gray-100">
                                <td className="py-2 px-4 border">{product.id}</td>
                                <td className="py-2 px-4 border">
                                    {product.RepresentativeImage ? (
                                        <img
                                            src={`/assets/admin/${product.RepresentativeImage}`}
                                            alt={product.ProductName}
                                            className="w-20 h-20 object-cover mx-auto"
                                        />
                                    ) : (
                                        <span className="text-gray-500">Chưa có hình ảnh</span>
                                    )}
                                </td>
                                <td className="py-2 px-4 border">{product.ProductName}</td>
                                <td className="py-2 px-4 border">{product.Stock}</td>
                                <td className="py-2 px-4 border">{getManufacturerName(product.ManufacturerID)}</td>
                                <td className="py-2 px-4 border">{getCategoryName(product.ProductTypeID)}</td>
                                <td className="py-2 px-4 border">{product.ListedPrice.toLocaleString()} VND</td>
                                <td className="py-2 px-4 border">
                                    <button
                                        className="bg-blue-200 hover:bg-blue-700 hover:text-white text-blue-700 font-bold py-1 px-2 rounded mx-1"
                                        onClick={() => handleEdit(product.id)}
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        className="hover:text-white hover:bg-red-700 text-red-400 font-bold py-1 px-2 rounded mx-1"
                                        onClick={() => handleDelete(product.id)}
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

export default ViewProduct;
