import { Layout } from 'antd';
const { Content } = Layout;
import logo3friend from '../../../assets/admin/logo3friend.png';

const DefaultPageAdmin = () => (
    <Content style={{ padding: '20px 50px', backgroundColor: '#f0f2f5', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={{ 
            background: '#fff', 
            padding: '24px', 
            borderRadius: '8px', 
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            textAlign: 'center',
            maxWidth: '600px'
        }}>
            <h1 style={{ fontSize: '1.8rem', color: '#1890ff', marginBottom: '16px' }}>
                Chào mừng đến với trang quản trị 3Friend
            </h1>
            <p style={{ fontSize: '1rem', color: '#595959', marginBottom: '24px' }}>
                Khám phá những tính năng hỗ trợ làm việc và trao đổi hiệu quả. Chúng tôi luôn đồng hành cùng bạn để đạt hiệu suất tối ưu.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <img 
                    src={logo3friend} 
                    alt="Minh họa quản trị" 
                    style={{ width: '100%', maxWidth: '300px', marginBottom: '16px' }}
                />
                <a 
                    href="#" 
                    style={{ color: '#1890ff', fontSize: '1rem', textDecoration: 'underline' }}
                >
                    Khám phá thêm tính năng
                </a>
            </div>
        </div>
    </Content>
);

export default DefaultPageAdmin;

