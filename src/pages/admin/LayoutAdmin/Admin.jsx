import { useState } from 'react';
import AddProduct from '../subViews/Product/addProduct/AddProduct';
import ViewProduct from '../subViews/Product/viewProduct/ViewProduct';
import ViewCustomer from '../subViews/Customer/ViewCustomer';
import ViewEmployee from '../subViews/Employee/viewEmployee/ViewEmployee';
import ViewPermission from '../subViews/Employee/permission/ViewPermission';
import EmployeeSidebar from '../../../components/admin/LayoutAdmin/Sidebar';
import { Layout } from 'antd';
import DefaultPageAdmin from './DefaultPageAdmin';

const { Header, Content } = Layout;

const Admin = () => {
    const [activeContent, setActiveContent] = useState('');
    const employee = JSON.parse(localStorage.getItem('employee'));
    const PositionName = localStorage.getItem('Position');
    const NameUser = employee?.data?.FullName ? employee.data.FullName : "admin";

    const handleSectionClick = (sectionName) => {
        setActiveContent(sectionName); 
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            
                <EmployeeSidebar onSectionClick={handleSectionClick} />
            

            <Layout style={{ marginInlineStart: 250 }}>
                <Header
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0 16px',
                        background: '#fff',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                        zIndex: 1000,
                        position: 'relative',
                    }}
                >
                    <div className="flex items-center">
                        <h3 className="font-bold text-lg text-gray-800">{PositionName || "Chức danh"}</h3>
                    </div>
                    <div className="flex items-center">
                        <span className="text-gray-500">
                            <b>Xin chào, {NameUser}</b>
                        </span>
                    </div>
                </Header>

                <Content
                    style={{
                        margin: '24px 16px 0',
                        overflow: 'initial',
                        padding: 24,
                        background: '#f0f2f5',
                    }}
                >
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
                        <DefaultPageAdmin />
                    )}
                </Content>
            </Layout>
        </Layout>
    );
};

export default Admin;
