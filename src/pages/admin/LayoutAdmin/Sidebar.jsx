import { useState } from 'react';
import PropTypes from 'prop-types';

// Import các icon tương ứng cho từng mục
// import dashboardIcon from "../../../assets/admin/Dashboard.png";
// import productsIcon from "../../../assets/admin/products.png";
// import ordersIcon from "../../../assets/admin/orders.png";
// import customersIcon from "../../../assets/admin/customers.png";
// import promotionsIcon from "../../../assets/admin/promotions.png";
// import contentIcon from "../../../assets/admin/content.png";
// import interfaceIcon from "../../../assets/admin/interface.png";
// import paymentIcon from "../../../assets/admin/payment.png";
// import shippingIcon from "../../../assets/admin/shipping.png";
// import userIcon from "../../../assets/admin/user.png";
// import reportsIcon from "../../../assets/admin/reports.png";
// import settingsIcon from "../../../assets/admin/settings.png";
// import supportIcon from "../../../assets/admin/support.png";
// import partnersIcon from "../../../assets/admin/partners.png";
// import reviewsIcon from "../../../assets/admin/reviews.png";
// import marketingIcon from "../../../assets/admin/marketing.png";
// import apiIcon from "../../../assets/admin/api.png";
// import notificationsIcon from "../../../assets/admin/notifications.png";
import logoutIcon from "../../../assets/admin/logout.png";

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
                        <img
                            //src={dashboardIcon}
                            alt="Dashboard Icon"
                            className="h-6 w-6 mr-2"
                        />
                        Bảng điều khiển
                    </h5>
                    {expandedSections.dashboard && (
                        <ul className="ml-6 mt-2 space-y-1 text-gray-600">
                            <li onClick={() => onSectionClick('Tổng quan doanh thu')} className="cursor-pointer">Tổng quan doanh thu</li>
                            <li onClick={() => onSectionClick('Thống kê đơn hàng')} className="cursor-pointer">Thống kê đơn hàng</li>
                            <li onClick={() => onSectionClick('Thống kê khách hàng')} className="cursor-pointer">Thống kê khách hàng</li>
                            <li onClick={() => onSectionClick('Thống kê sản phẩm')} className="cursor-pointer">Thống kê sản phẩm</li>
                            <li onClick={() => onSectionClick('Thông báo và cập nhật hệ thống')} className="cursor-pointer">Thông báo và cập nhật hệ thống</li>
                        </ul>
                    )}
                </li>

                {/* Quản lý Sản phẩm */}
                <li className="mb-4">
                    <h5
                        onClick={() => toggleSection('productManagement')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <img
                            //src={productsIcon}
                            alt="Products Icon"
                            className="h-6 w-6 mr-2"
                        />
                        Quản lý Sản phẩm
                    </h5>
                    {expandedSections.productManagement && (
                        <ul className="ml-6 mt-2 space-y-1 text-gray-600">
                            <li onClick={() => onSectionClick('Thêm mới sản phẩm')} className="cursor-pointer">Thêm mới sản phẩm</li>
                            <li onClick={() => onSectionClick('Sửa/Xóa sản phẩm')} className="cursor-pointer">Sửa/Xóa sản phẩm</li>
                            <li onClick={() => onSectionClick('Quản lý tồn kho')} className="cursor-pointer">Quản lý tồn kho</li>
                            <li onClick={() => onSectionClick('Quản lý hình ảnh sản phẩm')} className="cursor-pointer">Quản lý hình ảnh sản phẩm</li>
                            <li onClick={() => onSectionClick('Danh mục Sản phẩm')} className="cursor-pointer">Danh mục Sản phẩm</li>
                            <li onClick={() => onSectionClick('Thương hiệu')} className="cursor-pointer">Thương hiệu</li>
                            <li onClick={() => onSectionClick('Thuộc tính Sản phẩm')} className="cursor-pointer">Thuộc tính Sản phẩm</li>
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
                        <img
                            //src={ordersIcon}
                            alt="Orders Icon"
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
                        <img
                            //src={customersIcon}
                            alt="Customers Icon"
                            className="h-6 w-6 mr-2"
                        />
                        Quản lý Khách hàng
                    </h5>
                    {expandedSections.customerManagement && (
                        <ul className="ml-6 mt-2 space-y-1 text-gray-600">
                            <li onClick={() => onSectionClick('Danh sách khách hàng')} className="cursor-pointer">Danh sách khách hàng</li>
                            <li onClick={() => onSectionClick('Nhóm Khách hàng')} className="cursor-pointer">Nhóm Khách hàng</li>
                            <li onClick={() => onSectionClick('Lịch sử mua hàng')} className="cursor-pointer">Lịch sử mua hàng</li>
                        </ul>
                    )}
                </li>

                {/* Quản lý Khuyến mãi và Mã giảm giá */}
                <li className="mb-4">
                    <h5
                        onClick={() => toggleSection('promotionManagement')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <img
                            //src={promotionsIcon}
                            alt="Promotions Icon"
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

                {/* Quản lý Nội dung */}
                <li className="mb-4">
                    <h5
                        onClick={() => toggleSection('contentManagement')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <img
                            //src={contentIcon}
                            alt="Content Icon"
                            className="h-6 w-6 mr-2"
                        />
                        Quản lý Nội dung
                    </h5>
                    {expandedSections.contentManagement && (
                        <ul className="ml-6 mt-2 space-y-1 text-gray-600">
                            <li onClick={() => onSectionClick('Trang thông tin')} className="cursor-pointer">Trang thông tin</li>
                            <li onClick={() => onSectionClick('Bài viết/Blog')} className="cursor-pointer">Bài viết/Blog</li>
                            <li onClick={() => onSectionClick('Banner và Slider')} className="cursor-pointer">Banner và Slider</li>
                        </ul>
                    )}
                </li>

                {/* Quản lý Giao diện */}
                <li className="mb-4">
                    <h5
                        onClick={() => toggleSection('interfaceManagement')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <img
                            //src={interfaceIcon}
                            alt="Interface Icon"
                            className="h-6 w-6 mr-2"
                        />
                        Quản lý Giao diện
                    </h5>
                    {expandedSections.interfaceManagement && (
                        <ul className="ml-6 mt-2 space-y-1 text-gray-600">
                            <li onClick={() => onSectionClick('Chủ đề (Themes)')} className="cursor-pointer">Chủ đề (Themes)</li>
                            <li onClick={() => onSectionClick('Tùy chỉnh CSS/JS')} className="cursor-pointer">Tùy chỉnh CSS/JS</li>
                        </ul>
                    )}
                </li>

                {/* Quản lý Thanh toán */}
                <li className="mb-4">
                    <h5
                        onClick={() => toggleSection('paymentManagement')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <img
                            //src={paymentIcon}
                            alt="Payment Icon"
                            className="h-6 w-6 mr-2"
                        />
                        Quản lý Thanh toán
                    </h5>
                    {expandedSections.paymentManagement && (
                        <ul className="ml-6 mt-2 space-y-1 text-gray-600">
                            <li onClick={() => onSectionClick('Phương thức Thanh toán')} className="cursor-pointer">Phương thức Thanh toán</li>
                            <li onClick={() => onSectionClick('Giao dịch Thanh toán')} className="cursor-pointer">Giao dịch Thanh toán</li>
                        </ul>
                    )}
                </li>

                {/* Quản lý Vận chuyển */}
                <li className="mb-4">
                    <h5
                        onClick={() => toggleSection('shippingManagement')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <img
                            //src={shippingIcon}
                            alt="Shipping Icon"
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
                        <img
                            //src={userIcon}
                            alt="User Management Icon"
                            className="h-6 w-6 mr-2"
                        />
                        Quản lý Người dùng
                    </h5>
                    {expandedSections.userManagement && (
                        <ul className="ml-6 mt-2 space-y-1 text-gray-600">
                            <li onClick={() => onSectionClick('Tài khoản Quản trị')} className="cursor-pointer">Tài khoản Quản trị</li>
                            <li onClick={() => onSectionClick('Phân quyền')} className="cursor-pointer">Phân quyền</li>
                            <li onClick={() => onSectionClick('Nhật ký Hoạt động')} className="cursor-pointer">Nhật ký Hoạt động</li>
                        </ul>
                    )}
                </li>

                {/* Báo cáo và Thống kê */}
                <li className="mb-4">
                    <h5
                        onClick={() => toggleSection('reportStatistics')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <img
                            //src={reportsIcon}
                            alt="Reports Icon"
                            className="h-6 w-6 mr-2"
                        />
                        Báo cáo và Thống kê
                    </h5>
                    {expandedSections.reportStatistics && (
                        <ul className="ml-6 mt-2 space-y-1 text-gray-600">
                            <li onClick={() => onSectionClick('Doanh thu')} className="cursor-pointer">Doanh thu</li>
                            <li onClick={() => onSectionClick('Đơn hàng')} className="cursor-pointer">Đơn hàng</li>
                            <li onClick={() => onSectionClick('Khách hàng')} className="cursor-pointer">Khách hàng</li>
                            <li onClick={() => onSectionClick('Sản phẩm')} className="cursor-pointer">Sản phẩm</li>
                            <li onClick={() => onSectionClick('Xuất dữ liệu')} className="cursor-pointer">Xuất dữ liệu</li>
                        </ul>
                    )}
                </li>

                {/* Cấu hình Hệ thống */}
                <li className="mb-4">
                    <h5
                        onClick={() => toggleSection('systemSettings')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <img
                            //src={settingsIcon}
                            alt="Settings Icon"
                            className="h-6 w-6 mr-2"
                        />
                        Cấu hình Hệ thống
                    </h5>
                    {expandedSections.systemSettings && (
                        <ul className="ml-6 mt-2 space-y-1 text-gray-600">
                            <li onClick={() => onSectionClick('Thiết lập Chung')} className="cursor-pointer">Thiết lập Chung</li>
                            <li onClick={() => onSectionClick('Cấu hình Email')} className="cursor-pointer">Cấu hình Email</li>
                            <li onClick={() => onSectionClick('SEO')} className="cursor-pointer">SEO</li>
                            <li onClick={() => onSectionClick('Bảo mật')} className="cursor-pointer">Bảo mật</li>
                            <li onClick={() => onSectionClick('Sao lưu và Khôi phục')} className="cursor-pointer">Sao lưu và Khôi phục</li>
                        </ul>
                    )}
                </li>

                {/* Hỗ trợ Khách hàng */}
                <li className="mb-4">
                    <h5
                        onClick={() => toggleSection('customerSupport')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <img
                            //src={supportIcon}
                            alt="Support Icon"
                            className="h-6 w-6 mr-2"
                        />
                        Hỗ trợ Khách hàng
                    </h5>
                    {expandedSections.customerSupport && (
                        <ul className="ml-6 mt-2 space-y-1 text-gray-600">
                            <li onClick={() => onSectionClick('Ticket Hỗ trợ')} className="cursor-pointer">Ticket Hỗ trợ</li>
                            <li onClick={() => onSectionClick('Chat Trực tuyến')} className="cursor-pointer">Chat Trực tuyến</li>
                            <li onClick={() => onSectionClick('FAQ')} className="cursor-pointer">FAQ</li>
                        </ul>
                    )}
                </li>

                {/* Quản lý Đối tác và Nhà cung cấp */}
                <li className="mb-4">
                    <h5
                        onClick={() => toggleSection('partnerManagement')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <img
                            //src={partnersIcon}
                            alt="Partners Icon"
                            className="h-6 w-6 mr-2"
                        />
                        Quản lý Đối tác
                    </h5>
                    {expandedSections.partnerManagement && (
                        <ul className="ml-6 mt-2 space-y-1 text-gray-600">
                            <li onClick={() => onSectionClick('Nhà cung cấp')} className="cursor-pointer">Nhà cung cấp</li>
                            <li onClick={() => onSectionClick('Đối tác')} className="cursor-pointer">Đối tác</li>
                        </ul>
                    )}
                </li>

                {/* Quản lý Đánh giá và Phản hồi */}
                <li className="mb-4">
                    <h5
                        onClick={() => toggleSection('reviewFeedbackManagement')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <img
                            //src={reviewsIcon}
                            alt="Reviews Icon"
                            className="h-6 w-6 mr-2"
                        />
                        Đánh giá & Phản hồi
                    </h5>
                    {expandedSections.reviewFeedbackManagement && (
                        <ul className="ml-6 mt-2 space-y-1 text-gray-600">
                            <li onClick={() => onSectionClick('Đánh giá Sản phẩm')} className="cursor-pointer">Đánh giá Sản phẩm</li>
                            <li onClick={() => onSectionClick('Phản hồi Khách hàng')} className="cursor-pointer">Phản hồi Khách hàng</li>
                        </ul>
                    )}
                </li>

                {/* Marketing và SEO */}
                <li className="mb-4">
                    <h5
                        onClick={() => toggleSection('marketingSEO')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <img
                            //src={marketingIcon}
                            alt="Marketing Icon"
                            className="h-6 w-6 mr-2"
                        />
                        Marketing & SEO
                    </h5>
                    {expandedSections.marketingSEO && (
                        <ul className="ml-6 mt-2 space-y-1 text-gray-600">
                            <li onClick={() => onSectionClick('Chiến dịch Email')} className="cursor-pointer">Chiến dịch Email</li>
                            <li onClick={() => onSectionClick('Quản lý SEO')} className="cursor-pointer">Quản lý SEO</li>
                            <li onClick={() => onSectionClick('Quảng cáo')} className="cursor-pointer">Quảng cáo</li>
                        </ul>
                    )}
                </li>

                {/* Quản lý API và Tích hợp */}
                <li className="mb-4">
                    <h5
                        onClick={() => toggleSection('apiIntegrationManagement')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <img
                            //src={apiIcon}
                            alt="API Icon"
                            className="h-6 w-6 mr-2"
                        />
                        Quản lý API & Tích hợp
                    </h5>
                    {expandedSections.apiIntegrationManagement && (
                        <ul className="ml-6 mt-2 space-y-1 text-gray-600">
                            <li onClick={() => onSectionClick('API')} className="cursor-pointer">API</li>
                            <li onClick={() => onSectionClick('Tích hợp Bên thứ ba')} className="cursor-pointer">Tích hợp Bên thứ ba</li>
                        </ul>
                    )}
                </li>

                {/* Thông báo Hệ thống */}
                <li className="mb-4">
                    <h5
                        onClick={() => toggleSection('systemNotifications')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <img
                            //src={notificationsIcon}
                            alt="Notifications Icon"
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
                        <img
                            //src={Acount}
                            alt="Notifications Icon"
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
                <li className="mt-8">
                    <h5
                        onClick={() => onSectionClick('Đăng xuất')}
                        className="flex items-center cursor-pointer font-semibold text-gray-700"
                    >
                        <img
                            src={logoutIcon}
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
