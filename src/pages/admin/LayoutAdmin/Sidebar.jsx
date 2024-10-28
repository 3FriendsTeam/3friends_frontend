import { useState } from 'react';
import chat from "../../../assets/admin/chat.png";
import logout from "../../../assets/admin/logout.png";
import orders from "../../../assets/admin/orders.png";
import products from "../../../assets/admin/products.png";
import shop from "../../../assets/admin/shop.png";
import PropTypes from 'prop-types';


const Sidebar = ({ onSectionClick }) => {
    // State to track which sections are expanded
    const [expandedSections, setExpandedSections] = useState({
        orders: false,
        products: false,
        customers: false,
        shop: false,
    });

    // Toggle function to handle opening and closing of sections
    const toggleSection = (section) => {
        setExpandedSections((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    return (
        <aside className="bg-white p-3 shadow-md w-64">
            <ul className="list-none">
                {/* Quản lý đơn hàng */}
                <li className="mb-4">
                    <h5
                        onClick={() => toggleSection('orders')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <img
                            src={orders}
                            alt="Orders Icon"
                            className="h-6 w-6 mr-2"
                        />
                        Quản lý đơn hàng
                    </h5>
                    {expandedSections.orders && (
                        <ul className="ml-6 mt-2 space-y-1 text-gray-600">
                            <li onClick={() => onSectionClick('Danh sách đơn hàng')} className="cursor-pointer">Danh sách đơn hàng</li>
                            <li onClick={() => onSectionClick('Thêm mới đơn hàng')} className="cursor-pointer">Thêm mới đơn hàng</li>
                            <li onClick={() => onSectionClick('Đơn hàng chờ xử lý')} className="cursor-pointer">Đơn hàng chờ xử lý</li>
                        </ul>
                    )}
                </li>

                {/* Quản lý sản phẩm */}
                <li className="mb-4">
                    <h5
                        onClick={() => toggleSection('products')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <img
                            src={products}
                            alt="Products Icon"
                            className="h-6 w-6 mr-2"
                        />
                        Quản lý sản phẩm
                    </h5>
                    {expandedSections.products && (
                        <ul className="ml-6 mt-2 space-y-1 text-gray-600">
                            <li onClick={() => onSectionClick('Danh sách sản phẩm')} className="cursor-pointer">Danh sách sản phẩm</li>
                            <li onClick={() => onSectionClick('Thêm mới sản phẩm')} className="cursor-pointer">Thêm mới sản phẩm</li>
                        </ul>
                    )}
                </li>

                {/* Chăm sóc khách hàng */}
                <li className="mb-4">
                    <h5
                        onClick={() => toggleSection('customers')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <img
                            src={chat}
                            alt="Customers Icon"
                            className="h-6 w-6 mr-2"
                        />
                        Quản lý thông tin
                    </h5>
                    {expandedSections.customers && (
                        <ul className="ml-6 mt-2 space-y-1 text-gray-600">
                            <li onClick={() => onSectionClick('Khách hàng')} className="cursor-pointer">Khách hàng</li>
                            <li onClick={() => onSectionClick('Nhân viên')} className="cursor-pointer">Nhân viên</li>
                        </ul>
                    )}
                </li>

                {/* Quản lý shop */}
                <li>
                    <h5
                        onClick={() => toggleSection('shop')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <img
                            src={shop}
                            alt="Shop Icon"
                            className="h-6 w-6 mr-2"
                        />
                        Quản lý shop
                    </h5>
                    {expandedSections.shop && (
                        <ul className="ml-6 mt-2 space-y-1 text-gray-600">
                            <li onClick={() => onSectionClick('Thông tin shop')} className="cursor-pointer">Thông tin shop</li>
                            <li onClick={() => onSectionClick('Báo cáo doanh thu')} className="cursor-pointer">Báo cáo doanh thu</li>
                        </ul>
                    )}
                </li>

                {/* Nút đăng xuất */}
            <li className="mt-8">
                    <h5
                        onClick={() => toggleSection('customers')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <img
                            src={logout}
                            alt="Logout Icon"
                            className="h-6 w-6 mr-2"
                        />
                        Đăng xuất
                    </h5>
            </li>
            </ul>
        </aside>
    );
}
Sidebar.propTypes = {
    onSectionClick: PropTypes.func.isRequired,
  };
  

export default Sidebar;
