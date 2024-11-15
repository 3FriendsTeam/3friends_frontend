import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { EmployeeAuthContext } from '../../../AuthContext/EmployeeAuthContext';

// Import các icon cần thiết
import { FaBoxOpen } from 'react-icons/fa6';
import { MdAssignmentTurnedIn, MdAccountCircle, MdDashboard } from 'react-icons/md';
import { FaUsers, FaTags, FaCreditCard, FaTruck, FaUser, FaChartLine, FaHeadset, FaHandshake, FaBell } from 'react-icons/fa6';
import { FiLogOut } from 'react-icons/fi';

const EmployeeSidebar = () => {
  const { logout } = useContext(EmployeeAuthContext);
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({});
  const employee = JSON.parse(localStorage.getItem('employee')) ?? null;
  const PositionID = parseInt(employee.data.PositionID, 10);

  if (!employee) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/employee/login');
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Định nghĩa các mục menu với chức năng tương tự như file trên
  const menuItems = [
    {
      positionIds: [1, 2, 3],
      label: 'Bảng điều khiển',
      icon: <MdDashboard className="h-6 w-6 mr-2" />,
      section: 'dashboard',
      subItems: [
        { label: 'Tổng quan doanh thu', path: '/admin/dashboard/revenue' },
      ],
    },
    {
      positionIds: [1, 2],
      label: 'Quản lý Sản phẩm',
      icon: <FaBoxOpen className="h-6 w-6 mr-2" />,
      section: 'productManagement',
      subItems: [
        { label: 'Thêm mới sản phẩm', path: '/admin/products/add' },
        { label: 'Sửa/Xóa sản phẩm', path: '/admin/products/edit-delete' },
        { label: 'Quản lý tồn kho', path: '/admin/products/stock' },
        { label: 'Danh mục Sản phẩm', path: '/admin/products/categories' },
        { label: 'Thương hiệu', path: '/admin/products/brands' },
        { label: 'Đánh giá và Nhận xét', path: '/admin/products/reviews' },
      ],
    },
    {
      positionIds: [1, 3],
      label: 'Quản lý Đơn hàng',
      icon: <MdAssignmentTurnedIn className="h-6 w-6 mr-2" />,
      section: 'orderManagement',
      subItems: [
        { label: 'Danh sách đơn hàng', path: '/admin/orders/list' },
        { label: 'Chi tiết đơn hàng', path: '/admin/orders/details' },
        { label: 'Xác nhận/Hủy đơn hàng', path: '/admin/orders/confirm-cancel' },
        { label: 'Cập nhật trạng thái giao hàng', path: '/admin/orders/update-status' },
        { label: 'Trả hàng và Hoàn tiền', path: '/admin/orders/returns-refunds' },
      ],
    },
    {
      positionIds: [1],
      label: 'Quản lý Khách hàng',
      icon: <FaUsers className="h-6 w-6 mr-2" />,
      section: 'customerManagement',
      subItems: [
        { label: 'Danh sách khách hàng', path: '/admin/customers/list' },
      ],
    },
    {
      positionIds: [1],
      label: 'Quản lý Khuyến mãi',
      icon: <FaTags className="h-6 w-6 mr-2" />,
      section: 'promotionManagement',
      subItems: [
        { label: 'Chương trình Khuyến mãi', path: '/admin/promotions/programs' },
        { label: 'Mã giảm giá', path: '/admin/promotions/coupons' },
      ],
    },
    {
      positionIds: [1],
      label: 'Quản lý Thanh toán',
      icon: <FaCreditCard className="h-6 w-6 mr-2" />,
      section: 'paymentManagement',
      subItems: [
        { label: 'Phương thức Thanh toán', path: '/admin/payments/methods' },
      ],
    },
    {
      positionIds: [1],
      label: 'Quản lý Vận chuyển',
      icon: <FaTruck className="h-6 w-6 mr-2" />,
      section: 'shippingManagement',
      subItems: [
        { label: 'Phương thức Vận chuyển', path: '/admin/shipping/methods' },
        { label: 'Theo dõi Vận chuyển', path: '/admin/shipping/tracking' },
      ],
    },
    {
      positionIds: [1],
      label: 'Quản lý Người dùng',
      icon: <FaUser className="h-6 w-6 mr-2" />,
      section: 'userManagement',
      subItems: [
        { label: 'Tài khoản Quản trị', path: '/admin/users/accounts' },
        { label: 'Phân quyền', path: '/admin/users/roles' },
      ],
    },
    {
      positionIds: [1],
      label: 'Báo cáo và Thống kê',
      icon: <FaChartLine className="h-6 w-6 mr-2" />,
      section: 'reportStatistics',
      subItems: [
        { label: 'Đơn hàng', path: '/admin/reports/orders' },
      ],
    },
    {
      positionIds: [1],
      label: 'Hỗ trợ Khách hàng',
      icon: <FaHeadset className="h-6 w-6 mr-2" />,
      section: 'customerSupport',
      subItems: [
        { label: 'Chat Trực tuyến', path: '/admin/support/chat' },
      ],
    },
    {
      positionIds: [1],
      label: 'Quản lý Đối tác',
      icon: <FaHandshake className="h-6 w-6 mr-2" />,
      section: 'partnerManagement',
      subItems: [
        { label: 'Nhà cung cấp', path: '/admin/partners/suppliers' },
      ],
    },
    {
      positionIds: [1],
      label: 'Thông báo Hệ thống',
      icon: <FaBell className="h-6 w-6 mr-2" />,
      section: 'systemNotifications',
      subItems: [
        { label: 'Thông báo Đẩy', path: '/admin/notifications/push' },
        { label: 'Thiết lập Thông báo', path: '/admin/notifications/settings' },
      ],
    },
    {
      positionIds: [1, 2, 3, 4],
      label: 'Tài khoản',
      icon: <MdAccountCircle className="h-6 w-6 mr-2" />,
      section: 'accountSettings',
      subItems: [
        { label: 'Thông tin tài khoản', path: '/account/info' },
        { label: 'Đổi mật khẩu', path: '/account/change-password' },
      ],
    },
  ];

  return (
    <aside className="bg-white p-3 shadow-md w-64 overflow-y-auto">
      <ul className="list-none">
        {menuItems
          .filter((item) => item.positionIds.includes(PositionID))
          .map((item) => (
            <li key={item.section} className="mb-4">
              <h5
                onClick={() => toggleSection(item.section)}
                className="flex items-center cursor-pointer font-semibold text-gray-700"
              >
                {item.icon}
                {item.label}
              </h5>
              {expandedSections[item.section] && (
                <ul className="ml-6 mt-2 space-y-1 text-gray-600">
                  {item.subItems.map((subItem) => (
                    <li
                      key={subItem.path}
                      onClick={() => navigate(subItem.path)}
                      className="cursor-pointer hover:text-gray-800"
                    >
                      {subItem.label}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        <li
          onClick={handleLogout}
          className="cursor-pointer text-red-600 hover:text-red-800 flex items-center font-semibold text-gray-700"
        >
          <FiLogOut className="h-6 w-6 mr-2" />
          Đăng xuất
        </li>
      </ul>
    </aside>
  );
};

EmployeeSidebar.propTypes = {
  onSectionClick: PropTypes.func,
};

export default EmployeeSidebar;
