import { useState } from 'react';
import ViewProduct from '../subViews/Product/viewProduct/ViewProduct';
import ViewCustomer from '../subViews/Customer/ViewCustomer';
import ViewEmployee from '../subViews/Employee/viewEmployee/ViewEmployee';
import ViewPermission from '../subViews/Employee/permission/ViewPermission';
import EmployeeSidebar from '../../../components/admin/LayoutAdmin/Sidebar';
import { Layout } from 'antd';
import DefaultPageAdmin from './DefaultPageAdmin';
import ViewOrder from '../subViews/Order/ViewOrder';
import {getEmployeeName,  getPositionName } from '../../../helper/getInfoAdmin';
import ViewPaymentMethod from '../subViews/PaymentMethod/ViewPaymentMethod';
import ViewCategory from '../subViews/Category/ViewCategory';
import ViewPromotion from '../subViews/Promotion/ViewPromotion';
import AccountInfo from '../subViews/AccountInfo/AccountInfo';
import ViewRevenue from '../subViews/Revenue/ViewRevenue';
import ViewReturnDetail from '../subViews/ReturnDetail/ViewReturnDetail';
import ViewNewOrder from '../subViews/Order/ViewNewOrder';
import ViewLowStockProduct from '../subViews/Product/lowStockProduct/ViewLowStockProduct';
import ViewPackingOrder from '../subViews/Order/ViewPackingOrder';
import ViewShippingOrder from '../subViews/Order/ViewShippingOrder';
import ViewDiscontinuedProducts from '../subViews/Product/viewProduct/ViewDiscontinuedProducts';

const { Header, Content } = Layout;

const Admin = () => {
    const [activeContent, setActiveContent] = useState('');
    const PositionName = getPositionName();
    const NameUser = getEmployeeName();
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
                    { activeContent === 'listProduct' ? (
                        <ViewProduct />
                    ) : activeContent === 'Danh sách các sản phẩm ngưng bán' ? (
                        <ViewDiscontinuedProducts />
                    ) : activeContent === 'Danh sách khách hàng' ? (
                        <ViewCustomer />
                    ) : activeContent === 'Danh sách khách hàng mới' ? (
                        <ViewNewOrder />
                    ): activeContent === 'adminAccounts' ? (
                        <ViewEmployee />
                    ) : activeContent === 'roles' ? (
                        <ViewPermission />
                    ) :activeContent === 'Danh sách đơn hàng' ? (
                        <ViewOrder />
                    ) :activeContent === 'paymentMethods' ? (
                        <ViewPaymentMethod />
                    ) :activeContent === 'productCategories' ? (
                        <ViewCategory />
                    ) :activeContent === 'promotionPrograms' ? (
                        <ViewPromotion />
                    ) :activeContent === 'accountInfo' ? (
                        <AccountInfo />
                    ) :activeContent === 'orderReports' ? (
                        <ViewRevenue />
                    ) :activeContent === 'returnsRefunds' ? (
                        <ViewReturnDetail />
                    ) :activeContent === 'lowStockProduct' ? (
                        <ViewLowStockProduct />
                    ) :activeContent === 'packingOrders' ? (
                        <ViewPackingOrder />
                    ) :activeContent === 'shippingOrder' ? (
                        <ViewShippingOrder />
                    ) :activeContent === 'completeOrder' ? (
                        <ViewCompleteOrder />
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
