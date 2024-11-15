import { useState } from 'react';
import Header from './Header';
import EmployeeSidebar from './Sidebar';
import AddProduct from '../subViews/Product/addProduct/AddProduct';
import ViewProduct from '../subViews/Product/viewProduct/ViewProduct';
import ViewCustomer from '../subViews/Customer/ViewCustomer';
import ViewEmployee from '../subViews/Employee/viewEmployee/ViewEmployee';
import ViewPermission from '../subViews/Employee/permission/ViewPermission';

const Admin = () => {
    const [activeContent, setActiveContent] = useState(''); // Theo dõi nội dung hiện tại

    // Hàm xử lý khi nhấn vào các mục trong sidebar
    const handleSectionClick = (sectionName) => {
        setActiveContent(sectionName); // Cập nhật nội dung tương ứng
    };

    return (
        <div className="admin-container flex flex-col min-h-screen">
            {/* Header */}
            <Header />

            {/* Main Content Area */}
            <div className="flex flex-grow">
                {/* Sidebar */}
                <EmployeeSidebar onSectionClick={handleSectionClick} />

                {/* Nội dung chính */}
                <div className="flex-grow p-6 bg-gray-100">
                    {/* Hiển thị nội dung tương ứng với activeContent */}
                    {activeContent === 'Thêm mới sản phẩm' ? (
                        <AddProduct />
                    ) : activeContent === 'Danh sách sản phẩm' ? (
                        <ViewProduct />
                    ) : activeContent === 'Danh sách khách hàng' ? (
                        <ViewCustomer />
                    ) : activeContent === 'Tài khoản Quản trị' ? (
                        <ViewEmployee />
                    ) : activeContent === 'Phân quyền' ? (
                        <ViewPermission />
                    ) : activeContent ? (
                        <div>
                            <h1 className="text-xl font-bold">{activeContent}</h1>
                            <p>Đây là nội dung cho phần {activeContent}.</p>
                        </div>
                    ) : (
                        <div>
                            <h1 className="flex justify-center text-3xl font-bold">Chào mừng đến với trang quản trị!</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;
