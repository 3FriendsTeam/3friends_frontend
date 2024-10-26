import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import AddProduct from '../subViews/Product/addProduct/AddProduct';
//import ViewProduct from './subViews/Product/viewProduct/ViewProduct';
//import ViewCustomer from './subViews/Customer/ViewCustomer';
//import ViewEmployee from './subViews/Employee/viewEmployee/ViewEmployee';


const Admin = () => {
    const [activeContent, setActiveContent] = useState(''); // State để theo dõi nội dung hiển thị

    // Hàm xử lý sự kiện click vào các mục trong sidebar
    const handleSectionClick = (sectionName) => {
        setActiveContent(sectionName); // Cập nhật nội dung đang active
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
                    {/* Kiểm tra activeContent để hiển thị nội dung phù hợp */}
                    {activeContent === 'Thêm mới sản phẩm' ? (
                        <>
                            {/* Hiển thị form "Thêm sản phẩm" */}
                            <AddProduct />
                        </>
                    ) : activeContent === 'Danh sách sản phẩm' ? (
                        <ViewProduct />
                    ) : activeContent === 'Khách hàng' ? (
                        <ViewCustomer />
                    ) : activeContent === 'Nhân viên' ? (
                        <ViewEmployee />
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
}


export default Admin;
