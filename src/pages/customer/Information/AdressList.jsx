
import { Layout, Menu, Button, Input } from 'antd';
import { SearchOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
const AdressList = () => {
    return (
        <Layout className="min-h-screen">
          {/* Sidebar */}
          <Sider width={80} className="bg-gray-800 text-white p-4">
            <Menu mode="inline" theme="dark" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<MenuOutlined />} />
              {/* Add more menu items here */}
            </Menu>
          </Sider>
        
          <Layout className="site-layout">
            {/* Header */}
            <Header className="bg-white shadow-md px-4 py-2 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button className="text-xl text-gray-800 bg-transparent border-none">
                  Logo
                </Button>
                <div className="flex items-center">
                  <Input
                    prefix={<SearchOutlined />}
                    placeholder="Search"
                    className="max-w-xs"
                  />
                  <Button className="ml-4" type="primary" icon={<UserOutlined />}>
                    Profile
                  </Button>
                </div>
              </div>
            </Header>
    
            {/* Content */}
            <Content className="bg-gray-100 p-6">
              <div className="container mx-auto">
                <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-white p-6 shadow-lg rounded-lg">Card 1</div>
                  <div className="bg-white p-6 shadow-lg rounded-lg">Card 2</div>
                  <div className="bg-white p-6 shadow-lg rounded-lg">Card 3</div>
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      );
}
export default AdressList;