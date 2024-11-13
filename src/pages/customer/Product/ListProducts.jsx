import ProductCard from './ProductCard';
import sp1 from '../../../assets/client/sp1.jpg'
import km1 from '../../../assets/client/km1.png'
import km2 from '../../../assets/client/km2.png'
import Header from '../../../components/Client/Header';
import Footer from '../../../components/Client/Footer';
import NavigationBar from '../../../pages/customer/Animations/NavigationBar';
import Animation from '../../../pages/customer/Animations/Animation';
import ProductClassification from './ProductClassification';
import { NavLink } from 'react-router-dom';
import {path} from '../../../utils/constant'
const ListProducts = () => {
    const products =[
        {
          sp1: sp1,  
          km1: km1, 
          km2: km2,  
          productName: 'iPhone 16 Pro 128GB',
          productPrice: '28.990.000 ₫',
          promoText: 'Tặng voucher giảm giá lên đến 6,000,000₫ cho khách hàng đổi điểm Viettel++ trên ứng dụng ...',
        },
        {
            sp1: sp1,  
            km1: km1, 
            km2: km2,  
            productName: 'iPhone 16 Pro 128GB',
            productPrice: '28.990.000 ₫',
            promoText: 'Tặng voucher giảm giá lên đến 6,000,000₫ cho khách hàng đổi điểm Viettel++ trên ứng dụng ...',
          },
          {
            sp1: sp1,  
            km1: km1, 
            km2: km2,  
            productName: 'iPhone 16 Pro 128GB',
            productPrice: '28.990.000 ₫',
            promoText: 'Tặng voucher giảm giá lên đến 6,000,000₫ cho khách hàng đổi điểm Viettel++ trên ứng dụng ...',
          },
          {
            sp1: sp1,  
            km1: km1, 
            km2: km2,  
            productName: 'iPhone 16 Pro 128GB',
            productPrice: '28.990.000 ₫',
            promoText: 'Tặng voucher giảm giá lên đến 6,000,000₫ cho khách hàng đổi điểm Viettel++ trên ứng dụng ...',
          },
          {
            sp1: sp1,  
            km1: km1, 
            km2: km2,  
            productName: 'iPhone 16 Pro 128GB',
            productPrice: '28.990.000 ₫',
            promoText: 'Tặng voucher giảm giá lên đến 6,000,000₫ cho khách hàng đổi điểm Viettel++ trên ứng dụng ...',
          },
          {
            sp1: sp1,  
            km1: km1, 
            km2: km2,  
            productName: 'iPhone 16 Pro 128GB',
            productPrice: '28.990.000 ₫',
            promoText: 'Tặng voucher giảm giá lên đến 6,000,000₫ cho khách hàng đổi điểm Viettel++ trên ứng dụng ...',
          },
          {
            sp1: sp1,  
            km1: km1, 
            km2: km2,  
            productName: 'iPhone 16 Pro 128GB',
            productPrice: '28.990.000 ₫',
            promoText: 'Tặng voucher giảm giá lên đến 6,000,000₫ cho khách hàng đổi điểm Viettel++ trên ứng dụng ...',
          },
          
          {
            sp1: sp1,  
            km1: km1, 
            km2: km2,  
            productName: 'iPhone 16 Pro 128GB',
            productPrice: '28.990.000 ₫',
            promoText: 'Tặng voucher giảm giá lên đến 6,000,000₫ cho khách hàng đổi điểm Viettel++ trên ứng dụng ...',
          },
          
          {
            sp1: sp1,  
            km1: km1, 
            km2: km2,  
            productName: 'iPhone 16 Pro 128GB',
            productPrice: '28.990.000 ₫',
            promoText: 'Tặng voucher giảm giá lên đến 6,000,000₫ cho khách hàng đổi điểm Viettel++ trên ứng dụng ...',
          },
          
          {
            sp1: sp1,  
            km1: km1, 
            km2: km2,  
            productName: 'iPhone 16 Pro 128GB',
            productPrice: '28.990.000 ₫',
            promoText: 'Tặng voucher giảm giá lên đến 6,000,000₫ cho khách hàng đổi điểm Viettel++ trên ứng dụng ...',
          },
          
          
    ];

    return (
        <div className='flex flex-wrap flex-row w-full '>
        <div className='w-[1536px]'>
        <Header/>
        </div>
        <div className='bg-[#F2F2F2] w-[1536px] '>
        <NavigationBar current="Sản phẩm" />
        <Animation/>
        <ProductClassification/>
        <NavLink 
        to={path.PRODUCTSDETAILS}
        className=' ml-[183px] w-[1170px]  flex flex-wrap rounded-lg bg-white mt-3 '>
        {products.map((product,index)=>(
                <ProductCard
                    key={index}
                    sp1={product.sp1}
                    km1={product.km1}
                    km2={product.km2}
                    productName={product.productName}
                    productPrice={product.productPrice}
                    promoText={product.promoText}

                />
            ))}
        </NavLink>   
        </div>

        <Footer/>
        </div>
    );
};

export default ListProducts;