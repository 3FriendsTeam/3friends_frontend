import Header from '../../../components/Client/Header';
import Footer from '../../../components/Client/Footer';

const LookOrders = () => {
    return (
        <div>
        <Header/>
         <div className="flex p-5 bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 mr-5 ml-[183px] mt-8">
          <ul className="space-y-2">
            <li><a href="/" className="text-gray-700 hover:text-blue-500">Những câu hỏi thường gặp</a></li>
            <li><a href="/" className="text-gray-700 hover:text-blue-500">Phương thức thanh toán</a></li>
            <li><a href="/" className="text-blue-500 font-bold">Tra cứu đơn hàng trực tuyến</a></li>
            <li><a href="/" className="text-gray-700 hover:text-blue-500">Tìm trung tâm bảo hành</a></li>
          </ul>
        </div>
  
        {/* Lookup Form */}
        <div className="flex flex-col w-80 space-y-4 mt-8 ml-[300px]">
          <input
            type="text"
            placeholder="Nhập mã đơn hàng để tra cứu"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Nhập số điện thoại"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
  
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Nhập mã bảo mật"
              className="p-3 border border-gray-300 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-center ml-2">
              <img src="captcha.png" alt="" className="w-24 h-10" />
              <button className="ml-2 text-red-500 hover:text-red-700">🔄</button>
            </div>
          </div>
  
          <button className="py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300">
            TRA CỨU
          </button>
          <p className="text-red-600">Vui lòng nhập mã đơn hàng</p>
        </div>
      </div>
      <Footer/>
        </div>
       
    );
};

export default LookOrders;