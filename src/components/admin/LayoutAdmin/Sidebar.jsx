import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { EmployeeAuthContext } from '../../../AuthContext/EmployeeAuthContext';
import { useNavigate } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import { FaBoxOpen, FaUsers, FaTags, FaCreditCard, FaTruck, FaUser, FaChartLine, FaHeadset, FaBell } from 'react-icons/fa6';
import { MdAssignmentTurnedIn, MdAccountCircle, MdDashboard } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import logo3friend from '../../../assets/admin/logo3friend.png';
const { Sider } = Layout;

const EmployeeSidebar = ({ onSectionClick }) => {
  const { logout } = useContext(EmployeeAuthContext);
  const [expandedSections, setExpandedSections] = useState({});
  const employee = JSON.parse(localStorage.getItem('employee')) ?? null;
  const PositionID = parseInt(employee?.data?.PositionID, 10);
  const navigate = useNavigate();

  if (!employee) {
    return null;
  }
  const siderStyle = {
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
  };
  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('employee'); // Xóa thông tin người dùng
    logout(); // Thực hiện logout trong context (nếu có)
    navigate('/employee/login'); // Điều hướng đến trang đăng nhập
  };

  // Hàm toggle mở/đóng các mục con
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Các mục menu
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
      label: 'Thông báo Hệ thống',
      icon: <FaBell className="h-6 w-6 mr-2" />,
      section: 'systemNotifications',
      subItems: [
        { label: 'Thông báo Đẩy', section: 'pushNotifications' },
        { label: 'Thiết lập Thông báo', section: 'notificationSettings' },
      ],
    },
    {
      positionIds: [1],
      label: 'Tài khoản',
      icon: <MdAccountCircle className="h-6 w-6 mr-2" />,
      section: 'accountSettings',
      subItems: [
        { label: 'Thông tin tài khoản', section: 'accountInfo' },
      ],
    },
  ];

  return (
    <Sider width={250} style={siderStyle}>
        <div className=" flex items-center justify-center h-16 rounded-sm">
          <img src={logo3friend} alt="Logo" className="h-10 w-auto object-contain" />
        </div>
      <Menu theme="dark" mode="inline">
        {menuItems
          .filter((item) => item.positionIds.includes(PositionID))
          .map((item) => (
            <Menu.SubMenu
              key={item.section}
              icon={item.icon}
              title={item.label}
              onTitleClick={() => toggleSection(item.section)}
              open={expandedSections[item.section]}
            >
              {item.subItems.map((subItem) => (
                <Menu.Item
                  key={subItem.section}
                  onClick={() => onSectionClick(subItem.section)}
                >
                  {subItem.label}
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ))}
        <Menu.Item key="logout" onClick={handleLogout} icon={<FiLogOut className="h-6 w-6 mr-2" />}>
          Đăng xuất
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

EmployeeSidebar.propTypes = {
  onSectionClick: PropTypes.func.isRequired,
};

export default EmployeeSidebar;
