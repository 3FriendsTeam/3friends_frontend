import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import AddProduct from '../subViews/Product/addProduct/AddProduct';
import ViewProduct from '../subViews/Product/viewProduct/ViewProduct';
import ViewCustomer from '../subViews/Customer/ViewCustomer';
import ViewEmployee from '../subViews/Employee/viewEmployee/ViewEmployee';
import Permission from '../subViews/Employee/permission/ViewPermission'; // Component quản lý quyền

const Admin = () => {
    const [activeContent, setActiveContent] = useState(''); // Theo dõi nội dung hiện tại
    const [activeEmployeeTab, setActiveEmployeeTab] = useState('Quản lý nhân viên'); // Theo dõi tab Nhân viên

    // Hàm xử lý khi nhấn vào các mục trong sidebar
    const handleSectionClick = (sectionName) => {
        setActiveContent(sectionName);
    };

    return (
        <div className="admin-container flex flex-col min-h-screen">
            {/* Header */}
            <Header />
            {/* Main Content Area */}
            <div className="flex flex-grow">
                {/* Sidebar */}
                <Sidebar onSectionClick={handleSectionClick} />

                {/* Nội dung chính */}
                <div className="flex-grow p-6 bg-gray-100">
                    {/* Hiển thị nội dung tương ứng với activeContent */}
                    {activeContent === 'Thêm mới sản phẩm' ? (
                        <AddProduct />
                    ) : activeContent === 'Danh sách sản phẩm' ? (
                        <ViewProduct />
                    ) : activeContent === 'Khách hàng' ? (
                        <ViewCustomer />
                    ) : activeContent === 'Nhân viên' ? (
                        <>
                            {/* Tabs Quản lý nhân viên và Quyền */}
                            <div className="flex border-b-2 mb-4">
                                <button
                                    onClick={() => setActiveEmployeeTab('Quản lý nhân viên')}
                                    className={`py-2 px-4 font-semibold ${activeEmployeeTab === 'Quản lý nhân viên' ? 'border-b-4 border-blue-500' : ''
                                        }`}
                                >
                                    Quản lý nhân viên
                                </button>
                                <button
                                    onClick={() => setActiveEmployeeTab('Quyền')}
                                    className={`py-2 px-4 font-semibold ${activeEmployeeTab === 'Quyền' ? 'border-b-4 border-blue-500' : ''
                                        }`}
                                >
                                    Quyền
                                </button>
                            </div>

                            {/* Nội dung của tab hiện tại */}
                            {activeEmployeeTab === 'Quản lý nhân viên' ? (
                                <ViewEmployee />
                            ) : (
                                <Permission />
                            )}
                        </>
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
