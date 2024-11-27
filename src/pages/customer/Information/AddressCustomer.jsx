import { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, List, message, Row, Col } from 'antd';
import api from "../../../middlewares/tokenMiddleware";
const AddressCustomer = () => {
  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);

  // Fetch addresses when component mounts
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/get-address-by-id-customer`
        );
        console.log("Dữ liệu addresses:", response.data);
        setAddresses(response.data);
      } catch {
        message.error('Lỗi khi tải danh sách địa chỉ');
      }
    };
    fetchAddresses();
  }, []);

  // Open the modal for adding or editing an address
  const openModal = (address = null) => {
    setCurrentAddress(address);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentAddress(null);
  };

  // Save new or updated address
  const saveAddress = async (values) => {
    try {
      if (currentAddress) {
        await api.put(`/api/addresses/${currentAddress.id}`, values);  // API PUT request to update address
        setAddresses(addresses.map((addr) =>
          addr.id === currentAddress.id ? { ...addr, ...values } : addr
        ));
        message.success('Địa chỉ đã được cập nhật!');
      } else {
        await api.post('/api/addresses', values); 
        setAddresses([...addresses, { ...values, id: Date.now() }]);
        message.success('Địa chỉ đã được thêm!');
      }
      closeModal();
    } catch {
      message.error('Lỗi khi lưu địa chỉ');
    }
  };

  // Delete an address
  const deleteAddress = async (id) => {
    try {
      await api.delete(`/api/addresses/${id}`);  // API DELETE request to remove address
      setAddresses(addresses.filter((addr) => addr.id !== id));
      message.success('Địa chỉ đã bị xóa!');
    } catch {
      message.error('Lỗi khi xóa địa chỉ');
    }
  };

  return (
    <div className="p-6">
      <Row justify="space-between" align="middle">
        <Col>
          <h2 className="text-left font-bold text-xl">Danh sách Địa chỉ</h2>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={() => openModal()}
            className="float-right mb-4"
          >
            Thêm địa chỉ mới
          </Button>
        </Col>
      </Row>

      {/* Address List */}
      <List
        bordered
        dataSource={addresses}
        renderItem={(address) => (
          <List.Item
            key={address.id}
            actions={[
              <Button key="edit" type="primary" onClick={() => openModal(address)}>
                Sửa
              </Button>,
              <Button key="delete" type="danger" onClick={() => deleteAddress(address.id)}>
                Xóa
              </Button>,
            ]}
            className="mb-4 rounded-lg shadow-lg p-4"
          >
            <div>
              <div className="font-semibold">{address.RecipientName}</div>
              <div>{address.SpecificAddress}</div>
              <div>{address.District}, {address.City}</div>
              <div>Mã bưu điện: {address.PostalCode}</div>
            </div>
          </List.Item>
        )}
        className="mt-4"
      />

      {/* Modal for adding or editing address */}
      <Modal
        title={currentAddress ? 'Sửa địa chỉ' : 'Thêm địa chỉ mới'}
        visible={isModalOpen}
        onCancel={closeModal}
        footer={null}
        destroyOnClose
      >
        <Form
          initialValues={currentAddress}
          onFinish={saveAddress}
          layout="vertical"
        >
          <Form.Item
            label="Họ và Tên"
            name="RecipientName"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="PhoneNumber"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Địa chỉ cụ thể"
            name="SpecificAddress"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ cụ thể!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Quận/Huyện"
            name="District"
            rules={[{ required: true, message: 'Vui lòng nhập quận/huyện!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Thành phố"
            name="City"
            rules={[{ required: true, message: 'Vui lòng nhập thành phố!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mã bưu điện"
            name="PostalCode"
            rules={[{ required: true, message: 'Vui lòng nhập mã bưu điện!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item className="text-center">
            <Button type="default" onClick={closeModal} className="mr-4">
              Hủy
            </Button>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddressCustomer;
