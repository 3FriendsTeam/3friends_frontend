import { useContext } from 'react';
import PropTypes from 'prop-types';
import { EmployeeAuthContext } from '../../../AuthContext/EmployeeAuthContext';
import { useNavigate } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import { FaBoxOpen, FaUsers, FaTags, FaCreditCard, FaTruck, FaUser, FaChartLine } from 'react-icons/fa6';
import { MdAssignmentTurnedIn, MdAccountCircle } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import logo3friend from '../../../assets/admin/3friends.png';
const { Sider } = Layout;

const EmployeeSidebar = ({ onSectionClick }) => {
  const { logout } = useContext(EmployeeAuthContext);
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
  const handleLogout = () => {
    localStorage.removeItem('employee');
    logout(); 
    navigate('/employee/login');
  };

  const menuItems = [
    {
      positionIds: [1, 2],
      label: 'Quản lý Đơn hàng',
      icon: <MdAssignmentTurnedIn className="h-6 w-6 mr-2" />,
      section: 'orderManagement',
      subItems: [
        { label: 'Đơn hàng mới', section: 'Danh sách khách hàng mới' }, // xác nhận đơn chuyển qua bộ phận kho để đóng gói, hủy đơn
        { label: 'Danh sách đơn hàng', section: 'Danh sách đơn hàng' }, // hiển thị danh sách đơn hàng
        { label: 'Khiếu nại đơn hàng', section: 'returnsRefunds' },// danh sách các đơn hàng khiếu nại
      ],
    },
    {
      positionIds: [1, 2],
      label: 'Quản lý Sản phẩm',
      icon: <FaBoxOpen className="h-6 w-6 mr-2" />,
      section: 'productManagement',
      subItems: [
        { label: 'Danh mục Sản phẩm', section: 'productCategories' },// hiển thị danh mục sản phẩm
        { label: 'Danh sách sản phẩm', section: 'listProduct' },
        { label: 'Danh sách sản phẩm ngưng bán', section: 'Danh sách các sản phẩm ngưng bán' }// hiển thị danh sách sản phẩm thêm mới,sửa, xóa
      ],
    },
    
    {
      positionIds: [1,2],
      label: 'Quản lý Khách hàng',
      icon: <FaUsers className="h-6 w-6 mr-2" />,
      section: 'customerManagement',
      subItems: [
        { label: 'Danh sách khách hàng', section: 'Danh sách khách hàng' },
      ],
    },
    {
      positionIds: [1,2],
      label: 'Quản lý Khuyến mãi',
      icon: <FaTags className="h-6 w-6 mr-2" />,
      section: 'promotionManagement',
      subItems: [
        { label: 'Chương trình Khuyến mãi', section: 'promotionPrograms' },// danh sách các chương trình khuyến mãi. ngừng Khuyến mãi, sửa tên, giá, số lượng, minValue, maxDiscount, ngày bắt đầu, kết thúc
      ],
    },
    {
      positionIds: [1,2],
      label: 'Quản lý Thanh toán',
      icon: <FaCreditCard className="h-6 w-6 mr-2" />,
      section: 'paymentManagement',
      subItems: [
        { label: 'Phương thức Thanh toán', section: 'paymentMethods' },// hiển thị danh sách phương thức thanh toán. chỉnh lại hoạt động hay không
      ],
    },
    {
      positionIds: [3],
      label: 'Đơn hàng Vận chuyển',
      icon: <FaTruck className="h-6 w-6 mr-2" />,
      section: 'shippingManagement',
      subItems: [
        { label: 'Đơn hàng đang chờ được giao', section: 'shippingOrder' },// hiển thị danh sách đơn hàng đang chờ được giao
        { label: 'Đơn hàng đã hoàn thành', section: 'completeOrder' }, // hiển thị danh sách đơn hàng đã hoàn thành mà nhân viên đang giao
      ],
    },
    {
      positionIds: [1],
      label: 'Quản lý Nhân viên',
      icon: <FaUser className="h-6 w-6 mr-2" />,
      section: 'userManagement',
      subItems: [
        { label: 'Tài khoản Quản trị', section: 'adminAccounts' },// hiển thị danh sách tài khoản quản trị, thao tác khóa, xóa tài khoản, thêm nhân viên mới
        { label: 'Phân quyền', section: 'roles' },
      ],
    },
    {
      positionIds: [1,2],
      label: 'Báo cáo và Thống kê',
      icon: <FaChartLine className="h-6 w-6 mr-2" />,
      section: 'reportStatistics',
      subItems: [
        { label: 'Bảng thống kê doanh thu', section: 'orderReports' }, // hiển thị bảng thống kê doanh thu xuất file báo cáo
      ],
    },
    {
      positionIds: [4],
      label: 'Danh sách đơn hàng',
      icon: <MdAssignmentTurnedIn className="h-6 w-6 mr-2" />,
      section: 'OrderManagement',
      subItems: [
        { label: 'Danh sách đơn hàng xử lý', section: 'packingOrders' }, // hiển thị danh sách các đơn hàng cần đóng gói. nếu hết hàng thì hủy đơn
      ],
    },
    {
      positionIds: [4],
      label: 'Kho hàng',
      icon: <FaBoxOpen className="h-6 w-6 mr-2" />,
      section: 'WareHouseManagement',
      subItems: [
        { label: 'Sản phẩm sắp hết hàng', section: 'lowStockProduct' }, // hiển thị danh sách sản phẩm sắp hết hàng <10 sản phẩm xuất file báo cáo
        { label: 'Nhập hàng', section: 'accountInfo1' }, // nhập hàng, xử lý theo excel nhập hàng
      ],
    },
    {
      positionIds: [1,2,3,4],
      label: 'Tài khoản',
      icon: <MdAccountCircle className="h-6 w-6 mr-2" />,
      section: 'accountSettings',
      subItems: [
        { label: 'Thông tin tài khoản', section: 'accountInfo' }
      ],
    },

  ];

  return (
    <Sider width={250} style={siderStyle}>
        <div className="flex items-center justify-center h-16 rounded-sm">
          <img src={logo3friend} alt="Logo" className="h-50 w-auto object-contain" />
        </div>
      <Menu
        theme="dark"
        mode="inline"
        items={menuItems
          .filter((item) => item.positionIds.includes(PositionID))
          .map((item) => ({
            key: item.section,
            icon: item.icon,
            label: item.label,
            children: item.subItems?.map((subItem) => ({
              key: subItem.section,
              label: subItem.label,
              onClick: () => onSectionClick(subItem.section),
            })),
          }))
          .concat([
            {
              key: 'logout',
              icon: <FiLogOut className="h-6 w-6 mr-2" />,
              label: 'Đăng xuất',
              onClick: handleLogout,
            },
          ])}
      />
    </Sider>
);

};

EmployeeSidebar.propTypes = {
  onSectionClick: PropTypes.func.isRequired,
};

export default EmployeeSidebar;
