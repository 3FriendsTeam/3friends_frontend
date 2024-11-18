import { useState, useEffect } from "react";
import { Table, Input, Button, Popconfirm, message, Spin } from "antd";
import axios from "axios";

const ViewCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Lọc danh sách khách hàng theo từ khóa tìm kiếm
  const filteredCustomers = customers.filter((customer) =>
    customer.CustomerName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fetch danh sách khách hàng
  useEffect(() => {
    const fetchCustomerData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/get-all-customer`
        );
        setCustomers(
          response.data.map((customer, index) => ({ key: index, ...customer }))
        );
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        message.error(
          "Không thể tải danh sách khách hàng. Vui lòng thử lại sau."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchCustomerData();
  }, []);

  const reloadCustomerList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/get-all-customer`
      );
      setCustomers(
        response.data.map((customer, index) => ({ key: index, ...customer }))
      );
    } catch {
      message.error("vui lòng thử lại sau");
    } finally{
        setLoading(false);
    }
  };
  // Khoá khách hàng
  const handleLock = async (key) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/lock-customer`,
        { key }
      );
      reloadCustomerList();
      console.log(response.data);
      message.success(response.data.message);
    } catch (error) {
      console.error("Lỗi khi khóa tài khoản", error);
      message.error("Không thể khóa tài khoản! Vui lòng thử lại.");
    } finally{
        setLoading(false);
    }
  };
  const handleUnlock = async (key) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/unlock-customer`,{ key });
      reloadCustomerList();
      message.success(response.data.message);
    } catch (error) {
      console.error("Lỗi khi mở khóa tài khoản", error);
      message.error("Không thể mở khóa tài khoản! Vui lòng thử lại.");
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },

    {
      title: "Tên khách hàng",
      dataIndex: "CustomerName",
      key: "CustomerName",
      render: (CustomerName) => CustomerName || "Chưa cập nhật",
    },
    {
      title: "Giới tính",
      dataIndex: "Gender",
      key: "Gender",
      render: (Gender) => Gender || "Chưa cập nhật",
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      render: (Email) => Email || "Chưa cập nhật",
    },
    {
      title: "Số điện thoại",
      dataIndex: "PhoneNumber",
      key: "PhoneNumber",
      render: (phoneNumber) => phoneNumber || "Chưa cập nhật",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (text, record) => (
        <>
<<<<<<< HEAD
<<<<<<< HEAD
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa mục này không?"
            onConfirm={() => handleLock(record.key)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="link" className="text-red-600 font-bold mx-1">
              Khóa tài khoản
            </Button>
          </Popconfirm>
=======
=======
>>>>>>> ee572d9e8f41402cccb0dfefe0336a7ba8ae2eaa
          {record.IsActive ? (
            <Popconfirm
              title="Bạn có chắc chắn muốn khóa tài khoản này không?"
              onConfirm={() => handleLock(record.id)}
              okText="Có"
              cancelText="Không"
            >
              <Button type="link" className="text-red-600 font-bold mx-1">
                Khóa tài khoản
              </Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Bạn có chắc chắn muốn mở khóa tài khoản này không?"
              onConfirm={() => handleUnlock(record.id)}
              okText="Có"
              cancelText="Không"
            >
              <Button type="link" className="text-red-600 font-bold mx-1">
                Mở khóa tài khoản
              </Button>
            </Popconfirm>
          )}
<<<<<<< HEAD
>>>>>>> 4099f53978a71c6c5960b85faabc5fb56f77b212
=======
>>>>>>> ee572d9e8f41402cccb0dfefe0336a7ba8ae2eaa
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-5">Danh sách khách hàng</h1>
      <Input
        placeholder="Tìm kiếm khách hàng..."
        className="mb-4"
        style={{ width: "300px", height: "40px" }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading ? (
        <div className="flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredCustomers}
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
          }}
        />
      )}
      <div className="text-sm mt-2">{filteredCustomers.length} khách hàng</div>
    </div>
  );
};

export default ViewCustomer;
