import { useState, useEffect } from "react";
import { Table, Input, Button, Popconfirm, message, Spin, Modal, Form } from "antd";
import axios from "axios";

const ViewCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingCustomer, setEditingCustomer] = useState(null);

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
        message.error("Không thể tải danh sách khách hàng. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomerData();
  }, []);

  // Khoá khách hàng
  const handleLock = async (key) => {
    try {
      setCustomers(customers.filter((customer) => customer.key !== key));
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/delete-customer/${key}`);
      message.success("Xóa khách hàng thành công.");
    } catch (error) {
      console.error("Lỗi khi xóa khách hàng:", error);
      message.error("Không thể xóa khách hàng. Vui lòng thử lại.");
    }
  };

  // Mở modal chỉnh sửa
  const showEditModal = (customer) => {
    setEditingCustomer(customer);
    setIsEditModalVisible(true);
    form.setFieldsValue(customer);
  };

  // Đóng modal chỉnh sửa
  const handleEditCancel = () => {
    setEditingCustomer(null);
    setIsEditModalVisible(false);
    form.resetFields();
  };

  // Lưu chỉnh sửa
  const handleEditSave = async () => {
    try {
      const updatedCustomer = form.getFieldsValue();
      setCustomers((prev) =>
        prev.map((customer) =>
          customer.key === editingCustomer.key ? { ...customer, ...updatedCustomer } : customer
        )
      );
      message.success("Cập nhật thông tin khách hàng thành công.");
      handleEditCancel();
    } catch (error) {
      console.error("Lỗi khi cập nhật khách hàng:", error);
      message.error("Không thể cập nhật khách hàng. Vui lòng thử lại.");
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
            pageSize:5,
            showSizeChanger: false,
          }}
        />
      )}
      <div className="text-sm mt-2">{filteredCustomers.length} khách hàng</div>

      <Modal
        title="Sửa thông tin khách hàng"
        open={isEditModalVisible}
        onOk={handleEditSave}
        onCancel={handleEditCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="CustomerName"
            label="Tên khách hàng"
            rules={[{ required: true, message: "Vui lòng nhập tên khách hàng!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Email"
            label="Email"
            rules={[{ type: "email", message: "Vui lòng nhập email hợp lệ!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="PhoneNumber" label="Số điện thoại">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ViewCustomer;
