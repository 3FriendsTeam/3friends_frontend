import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { EmployeeAuthContext } from '../../../AuthContext/EmployeeAuthContext';

const EmployeeSidebar = () => {
  const { logout } = useContext(EmployeeAuthContext);
  const PositionID = parseInt(localStorage.getItem('PositionID'), 10);
  const employee = JSON.parse(localStorage.getItem('employee'));
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({});

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

  const menuItems = [
    {
      positionId: 1,
      label: 'Quản lý Hệ thống',
      icon: '⚙️',
      section: 'systemManagement',
      subItems: [
        { label: 'Cấu hình hệ thống', path: '/admin/management/config' },
        { label: 'Quản lý người dùng', path: '/admin/management/users' },
      ],
    },
    {
      positionId: 2,
      label: 'Quản lý Sản phẩm',
      icon: '📦',
      section: 'productManagement',
      subItems: [
        { label: 'Thêm sản phẩm', path: '/admin/products/add' },
        { label: 'Sửa sản phẩm', path: '/admin/products/edit' },
        { label: 'Xóa sản phẩm', path: '/admin/products/delete' },
        { label: 'Quản lý tồn kho', path: '/admin/products/stock' },
        { label: 'Danh mục sản phẩm', path: '/admin/products/categories' },
      ],
    },
    {
      positionId: 3,
      label: 'Quản lý Khách hàng',
      icon: '👥',
      section: 'customerManagement',
      subItems: [
        { label: 'Danh sách khách hàng', path: '/admin/customers/list' },
        { label: 'Chi tiết khách hàng', path: '/admin/customers/details' },
      ],
    },
    {
      positionId: 4,
      label: 'Cài đặt Tài khoản',
      icon: '🔒',
      section: 'accountSettings',
      subItems: [
        { label: 'Thông tin tài khoản', path: '/account/info' },
        { label: 'Đổi mật khẩu', path: '/account/change-password' },
      ],
    },
  ];

  return (
    <aside className="bg-gray-100 p-4 w-64">
      <ul className="space-y-4">
        {menuItems
          .filter((item) => item.positionId === PositionID)
          .map((item) => (
            <li key={item.section} className="mb-4">
              <h5
                onClick={() => toggleSection(item.section)}
                className="flex items-center cursor-pointer font-semibold text-gray-700"
              >
                <span className="mr-2">{item.icon}</span>
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
          className="cursor-pointer text-red-600 hover:text-red-800"
        >
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
