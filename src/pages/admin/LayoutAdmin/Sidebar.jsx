import { useState } from 'react';
import PropTypes from 'prop-types';
import icons from "../../../utils/icons";
import { FaBoxOpen } from 'react-icons/fa6';
import { MdAssignmentTurnedIn } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa6';
import { FaTags } from 'react-icons/fa6';
import { FaCreditCard } from 'react-icons/fa6';
import { FaTruck } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa6';
import { FaChartLine } from 'react-icons/fa6';
import { FaHeadset } from 'react-icons/fa6';
import { FaHandshake } from 'react-icons/fa6';
import { FaBell } from 'react-icons/fa6';
import { FiLogOut } from 'react-icons/fi';
import { MdAccountCircle } from 'react-icons/md';
import { MdDashboard } from 'react-icons/md';

const Sidebar = ({ onSectionClick }) => {
    // State để theo dõi các mục được mở rộng
    const [expandedSections, setExpandedSections] = useState({
        dashboard: false,
        productManagement: false,
        orderManagement: false,
        customerManagement: false,
        promotionManagement: false,
        contentManagement: false,
        interfaceManagement: false,
        paymentManagement: false,
        shippingManagement: false,
        userManagement: false,
        reportStatistics: false,
        systemSettings: false,
        customerSupport: false,
        partnerManagement: false,
        reviewFeedbackManagement: false,
        marketingSEO: false,
        apiIntegrationManagement: false,
        systemNotifications: false,
        Acount: false
    });

    // Hàm để mở rộng hoặc thu gọn mục
    const toggleSection = (section) => {
        setExpandedSections((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    return (
        <aside className="bg-white p-3 shadow-md w-64 overflow-y-auto">
            <ul className="list-none">
                {/* Dashboard */}
                <li className="mb-4">
                    <h5
                        onClick={() => toggleSection('dashboard')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <MdDashboard
                            className="h-6 w-6 mr-2"
                        />
                        Bảng điều khiển
                    </h5>
                    {expandedSections.dashboard && (
                        <ul className="ml-6 mt-2 space-y-1 text-gray-600">
                            <li onClick={() => onSectionClick('Tổng quan doanh thu')} className="cursor-pointer">Tổng quan doanh thu</li>

                        </ul>
                    )}
                </li>

                {/* Quản lý Sản phẩm */}
                <li className="mb-4">
                    <h5
                        onClick={() => toggleSection('productManagement')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <FaBoxOpen
                            className="h-6 w-6 mr-2"
                        />
                        Quản lý Sản phẩm
                    </h5>
                    {expandedSections.productManagement && (
                        <ul className="ml-6 mt-2 space-y-1 text-gray-600">
                            <li onClick={() => onSectionClick('Thêm mới sản phẩm')} className="cursor-pointer">Thêm mới sản phẩm</li>
                            <li onClick={() => onSectionClick('Sửa/Xóa sản phẩm')} className="cursor-pointer">Sửa/Xóa sản phẩm</li>
                            <li onClick={() => onSectionClick('Quản lý tồn kho')} className="cursor-pointer">Quản lý tồn kho</li>
                            <li onClick={() => onSectionClick('Danh mục Sản phẩm')} className="cursor-pointer">Danh mục Sản phẩm</li>
                            <li onClick={() => onSectionClick('Thương hiệu')} className="cursor-pointer">Thương hiệu</li>
                            <li onClick={() => onSectionClick('Đánh giá và Nhận xét')} className="cursor-pointer">Đánh giá và Nhận xét</li>
                        </ul>
                    )}
                </li>

                {/* Quản lý Đơn hàng */}
                <li className="mb-4">
                    <h5
                        onClick={() => toggleSection('orderManagement')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <MdAssignmentTurnedIn
                            className="h-6 w-6 mr-2"
                        />
                        Quản lý Đơn hàng
                    </h5>
                    {expandedSections.orderManagement && (
                        <ul className="ml-6 mt-2 space-y-1 text-gray-600">
                            <li onClick={() => onSectionClick('Danh sách đơn hàng')} className="cursor-pointer">Danh sách đơn hàng</li>
                            <li onClick={() => onSectionClick('Chi tiết đơn hàng')} className="cursor-pointer">Chi tiết đơn hàng</li>
                            <li onClick={() => onSectionClick('Xác nhận/Hủy đơn hàng')} className="cursor-pointer">Xác nhận/Hủy đơn hàng</li>
                            <li onClick={() => onSectionClick('Cập nhật trạng thái giao hàng')} className="cursor-pointer">Cập nhật trạng thái giao hàng</li>
                            <li onClick={() => onSectionClick('Trả hàng và Hoàn tiền')} className="cursor-pointer">Trả hàng và Hoàn tiền</li>
                        </ul>
                    )}
                </li>

                {/* Quản lý Khách hàng */}
                <li className="mb-4">
                    <h5
                        onClick={() => toggleSection('customerManagement')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <FaUsers
                            className="h-6 w-6 mr-2"
                        />
                        Quản lý Khách hàng
                    </h5>
                    {expandedSections.customerManagement && (
                        <ul className="ml-6 mt-2 space-y-1 text-gray-600">
                            <li onClick={() => onSectionClick('Danh sách khách hàng')} className="cursor-pointer">Danh sách khách hàng</li>                        </ul>
                    )}
                </li>

                {/* Quản lý Khuyến mãi và Mã giảm giá */}
                <li className="mb-4">
                    <h5
                        onClick={() => toggleSection('promotionManagement')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <FaTags
                            className="h-6 w-6 mr-2"
                        />
                        Quản lý Khuyến mãi
                    </h5>
                    {expandedSections.promotionManagement && (
                        <ul className="ml-6 mt-2 space-y-1 text-gray-600">
                            <li onClick={() => onSectionClick('Chương trình Khuyến mãi')} className="cursor-pointer">Chương trình Khuyến mãi</li>
                            <li onClick={() => onSectionClick('Mã giảm giá')} className="cursor-pointer">Mã giảm giá</li>
                        </ul>
                    )}
                </li>

                {/* Quản lý Thanh toán */}
                <li className="mb-4">
                    <h5
                        onClick={() => toggleSection('paymentManagement')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <FaCreditCard
                            className="h-6 w-6 mr-2"
                        />
                        Quản lý Thanh toán
                    </h5>
                    {expandedSections.paymentManagement && (
                        <ul className="ml-6 mt-2 space-y-1 text-gray-600">
                            <li onClick={() => onSectionClick('Phương thức Thanh toán')} className="cursor-pointer">Phương thức Thanh toán</li>
                        </ul>
                    )}
                </li>

                {/* Quản lý Vận chuyển */}
                <li className="mb-4">
                    <h5
                        onClick={() => toggleSection('shippingManagement')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <FaTruck
                            className="h-6 w-6 mr-2"
                        />
                        Quản lý Vận chuyển
                    </h5>
                    {expandedSections.shippingManagement && (
                        <ul className="ml-6 mt-2 space-y-1 text-gray-600">
                            <li onClick={() => onSectionClick('Phương thức Vận chuyển')} className="cursor-pointer">Phương thức Vận chuyển</li>
                            <li onClick={() => onSectionClick('Theo dõi Vận chuyển')} className="cursor-pointer">Theo dõi Vận chuyển</li>
                        </ul>
                    )}
                </li>

                {/* Quản lý Người dùng và Phân quyền */}
                <li className="mb-4">
                    <h5
                        onClick={() => toggleSection('userManagement')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <FaUser
                            className="h-6 w-6 mr-2"
                        />
                        Quản lý Người dùng
                    </h5>
                    {expandedSections.userManagement && (
                        <ul className="ml-6 mt-2 space-y-1 text-gray-600">
                            <li onClick={() => onSectionClick('Tài khoản Quản trị')} className="cursor-pointer">Tài khoản quản trị</li>
                            <li onClick={() => onSectionClick('Phân quyền')} className="cursor-pointer">Phân quyền</li>
                        </ul>
                    )}
                </li>

                {/* Báo cáo và Thống kê */}
                <li className="mb-4">
                    <h5
                        onClick={() => toggleSection('reportStatistics')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <FaChartLine
                            className="h-6 w-6 mr-2"
                        />
                        Báo cáo và Thống kê
                    </h5>
                    {expandedSections.reportStatistics && (
                        <ul className="ml-6 mt-2 space-y-1 text-gray-600">
                            <li onClick={() => onSectionClick('Đơn hàng')} className="cursor-pointer">Đơn hàng</li>
                        </ul>
                    )}
                </li>

                {/* Hỗ trợ Khách hàng */}
                <li className="mb-4">
                    <h5
                        onClick={() => toggleSection('customerSupport')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <FaHeadset
                            className="h-6 w-6 mr-2"
                        />
                        Hỗ trợ Khách hàng
                    </h5>
                    {expandedSections.customerSupport && (
                        <ul className="ml-6 mt-2 space-y-1 text-gray-600">
                            <li onClick={() => onSectionClick('Chat Trực tuyến')} className="cursor-pointer">Chat Trực tuyến</li>
                        </ul>
                    )}
                </li>

                {/* Quản lý Đối tác và Nhà cung cấp */}
                <li className="mb-4">
                    <h5
                        onClick={() => toggleSection('partnerManagement')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <FaHandshake
                            className="h-6 w-6 mr-2"
                        />
                        Quản lý Đối tác
                    </h5>
                    {expandedSections.partnerManagement && (
                        <ul className="ml-6 mt-2 space-y-1 text-gray-600">
                            <li onClick={() => onSectionClick('Nhà cung cấp')} className="cursor-pointer">Nhà cung cấp</li>
                        </ul>
                    )}
                </li>

                {/* Thông báo Hệ thống */}
                <li className="mb-4">
                    <h5
                        onClick={() => toggleSection('systemNotifications')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <FaBell
                            className="h-6 w-6 mr-2"
                        />
                        Thông báo Hệ thống
                    </h5>
                    {expandedSections.systemNotifications && (
                        <ul className="ml-6 mt-2 space-y-1 text-gray-600">
                            <li onClick={() => onSectionClick('Thông báo Đẩy')} className="cursor-pointer">Thông báo Đẩy</li>
                            <li onClick={() => onSectionClick('Thiết lập Thông báo')} className="cursor-pointer">Thiết lập Thông báo</li>
                        </ul>
                    )}
                </li>
                {/* cài đặt tài khoản */}
                <li className="mb-4">
                    <h5
                        onClick={() => toggleSection('systemNotifications')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <MdAccountCircle
                            className="h-6 w-6 mr-2"
                        />
                        Tài khoản
                    </h5>
                    {expandedSections.Acount && (
                        <ul className="ml-6 mt-2 space-y-1 text-gray-600">
                            <li onClick={() => onSectionClick('Thông tin tài khoản')} className="cursor-pointer">Thông tin tài khoản</li>
                            <li onClick={() => onSectionClick('Đổi mật khẩu')} className="cursor-pointer">Đổi mật khẩu</li>
                        </ul>
                    )}
                </li>

                {/* Nút đăng xuất */}
                <li className="mb-4">
                    <h5
                        onClick={() => onSectionClick('Đăng xuất')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <FiLogOut
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