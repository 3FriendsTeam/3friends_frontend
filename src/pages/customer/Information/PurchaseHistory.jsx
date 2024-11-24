import { useEffect } from "react";
import api from "../../../middlewares/tokenMiddleware";


const PurchaseHistory = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  useEffect(async () => {
    const response = await api.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/get-orders-by-id-customer`
  );
  }, []);

  return (
    <div className="p-6 bg-gray-100">
      {/* Filter and Date Range */}
      <div className="flex items-center justify-between mb-6 flex-wrap">
        <input
          type="date"
          className="border border-gray-300 p-2 rounded mr-4 mb-2"
          placeholder="Từ ngày"
        />
        <input
          type="date"
          className="border border-gray-300 p-2 rounded mr-4 mb-2"
          placeholder="Đến ngày"
        />
        <div className="flex flex-wrap gap-2">
          <button className="bg-red-500 text-white px-4 py-2 rounded mb-2">Tất cả</button>
          <button className="bg-gray-200 px-4 py-2 rounded mb-2">Chờ xác nhận</button>
          <button className="bg-gray-200 px-4 py-2 rounded mb-2">Đã xác nhận</button>
          <button className="bg-gray-200 px-4 py-2 rounded mb-2">Đang vận chuyển</button>
          <button className="bg-gray-200 px-4 py-2 rounded mb-2">Đã giao hàng</button>
          <button className="bg-gray-200 px-4 py-2 rounded mb-2">Đã hủy</button>
        </div>
      </div>
      {/* Order List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow rounded-lg flex items-center p-4 gap-4"
          >
            <img
              src={order.image}
              alt={order.name}
              className="w-20 h-20 object-cover rounded-md border"
            />
            <div className="flex-1">
              <p className="text-lg font-semibold">{order.name}</p>
              <p className="text-red-500 font-bold text-lg">{order.price}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-gray-200 px-2 py-1 text-sm rounded">
                  {order.status}
                </span>
                {order.additionalStatus && (
                  <span className="bg-red-100 text-red-500 px-2 py-1 text-sm rounded">
                    {order.additionalStatus}
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-2">{order.date}</p>
              <div className="flex flex-wrap gap-2">
                {order.actions.map((action, index) => (
                  <button
                    key={index}
                    className="text-red-500 border border-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseHistory;
