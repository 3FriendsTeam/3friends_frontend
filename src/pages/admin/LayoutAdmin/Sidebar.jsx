import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { EmployeeAuthContext } from '../../../AuthContext/EmployeeAuthContext';
import { useNavigate } from 'react-router-dom';

// Import các icon cần thiết
import { FaBoxOpen } from 'react-icons/fa6';
import { MdAssignmentTurnedIn, MdAccountCircle, MdDashboard } from 'react-icons/md';
import { FaUsers, FaTags, FaCreditCard, FaTruck, FaUser, FaChartLine, FaHeadset, FaHandshake, FaBell, FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import { FiLogOut } from 'react-icons/fi';

const EmployeeSidebar = ({ onSectionClick }) => {
  const { logout } = useContext(EmployeeAuthContext);
  const [expandedSections, setExpandedSections] = useState({});
  const employee = JSON.parse(localStorage.getItem('employee')) ?? null;
  const PositionID = parseInt(employee.data.PositionID, 10);
  const navigate = useNavigate();

  if (!employee) {
    return null;
  }

  const handleLogout = () => {
    // Xóa dữ liệu người dùng khỏi localStorage hoặc sessionStorage
    localStorage.removeItem('employee');  // Hoặc dữ liệu liên quan đến đăng nhập

    // Thực hiện logout trong context (nếu có)
    logout(); // Nếu bạn đang sử dụng context để quản lý đăng nhập

    // Điều hướng tới trang đăng nhập
    navigate('/employee/login');
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Định nghĩa các mục menu
  const menuItems = [
    {
      positionIds: [1, 2, 3],
      label: 'Bảng điều khiển',
      icon: <MdDashboard className="h-6 w-6 mr-2" />,
      section: 'dashboard',
      subItems: [
        { label: 'Tổng quan doanh thu', section: 'revenue' },
      ],
    },
    {
      positionIds: [1, 2],
      label: 'Quản lý Sản phẩm',
      icon: <FaBoxOpen className="h-6 w-6 mr-2" />,
      section: 'productManagement',
      subItems: [
        { label: 'Thêm mới sản phẩm', section: 'addProduct' },
        { label: 'Danh sách sản phẩm', section: 'listProduct' },
        { label: 'Quản lý tồn kho', section: 'manageStock' },
        { label: 'Danh mục Sản phẩm', section: 'productCategories' },
        { label: 'Thương hiệu', section: 'brands' },
        { label: 'Đánh giá và Nhận xét', section: 'reviews' },
      ],
    },
    {
      positionIds: [1, 3],
      label: 'Quản lý Đơn hàng',
      icon: <MdAssignmentTurnedIn className="h-6 w-6 mr-2" />,
      section: 'orderManagement',
      subItems: [
        { label: 'Danh sách đơn hàng', section: 'orderList' },
        { label: 'Chi tiết đơn hàng', section: 'orderDetails' },
        { label: 'Xác nhận/Hủy đơn hàng', section: 'confirmCancel' },
        { label: 'Cập nhật trạng thái giao hàng', section: 'updateDeliveryStatus' },
        { label: 'Trả hàng và Hoàn tiền', section: 'returnsRefunds' },
      ],
    },
    {
      positionIds: [1],
      label: 'Quản lý Khách hàng',
      icon: <FaUsers className="h-6 w-6 mr-2" />,
      section: 'customerManagement',
      subItems: [
        { label: 'Danh sách khách hàng', section: 'customerList' },
      ],
    },
    {
      positionIds: [1],
      label: 'Quản lý Khuyến mãi',
      icon: <FaTags className="h-6 w-6 mr-2" />,
      section: 'promotionManagement',
      subItems: [
        { label: 'Chương trình Khuyến mãi', section: 'promotionPrograms' },
        { label: 'Mã giảm giá', section: 'coupons' },
      ],
    },
    {
      positionIds: [1],
      label: 'Quản lý Thanh toán',
      icon: <FaCreditCard className="h-6 w-6 mr-2" />,
      section: 'paymentManagement',
      subItems: [
        { label: 'Phương thức Thanh toán', section: 'paymentMethods' },
      ],
    },
    {
      positionIds: [1],
      label: 'Quản lý Vận chuyển',
      icon: <FaTruck className="h-6 w-6 mr-2" />,
      section: 'shippingManagement',
      subItems: [
        { label: 'Phương thức Vận chuyển', section: 'shippingMethods' },
        { label: 'Theo dõi Vận chuyển', section: 'tracking' },
      ],
    },
    {
      positionIds: [1],
      label: 'Quản lý Người dùng',
      icon: <FaUser className="h-6 w-6 mr-2" />,
      section: 'userManagement',
      subItems: [
        { label: 'Tài khoản Quản trị', section: 'adminAccounts' },
        { label: 'Phân quyền', section: 'roles' },
      ],
    },
    {
      positionIds: [1],
      label: 'Báo cáo và Thống kê',
      icon: <FaChartLine className="h-6 w-6 mr-2" />,
      section: 'reportStatistics',
      subItems: [
        { label: 'Đơn hàng', section: 'orderReports' },
      ],
    },
    {
      positionIds: [1],
      label: 'Hỗ trợ Khách hàng',
      icon: <FaHeadset className="h-6 w-6 mr-2" />,
      section: 'customerSupport',
      subItems: [
        { label: 'Chat Trực tuyến', section: 'onlineChat' },
      ],
    },
    {
      positionIds: [1],
      label: 'Quản lý Đối tác',
      icon: <FaHandshake className="h-6 w-6 mr-2" />,
      section: 'partnerManagement',
      subItems: [
        { label: 'Nhà cung cấp', section: 'suppliers' },
      ],
    },
    {
      positionIds: [1],
      label: 'Thông báo Hệ thống',
      icon: <FaBell className="h-6 w-6 mr-2" />,
      section: 'systemNotifications',
      subItems: [
        { label: 'Thông báo Đẩy', section: 'pushNotifications' },
        { label: 'Thiết lập Thông báo', section: 'notificationSettings' },
      ],
    },
    {
      positionIds: [1, 2, 3, 4],
      label: 'Tài khoản',
      icon: <MdAccountCircle className="h-6 w-6 mr-2" />,
      section: 'accountSettings',
      subItems: [
        { label: 'Thông tin tài khoản', section: 'accountInfo' },
        { label: 'Đổi mật khẩu', section: 'changePassword' },
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
                <span className="ml-auto">
                  {expandedSections[item.section] ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </h5>
              {expandedSections[item.section] && (
                <ul className="ml-6 mt-2 space-y-1 text-gray-600">
                  {item.subItems.map((subItem) => (
                    <li
                      key={subItem.section}
                      onClick={() => onSectionClick(subItem.label)}
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
  onSectionClick: PropTypes.func.isRequired,
};

export default EmployeeSidebar;
