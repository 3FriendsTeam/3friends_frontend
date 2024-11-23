import { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Popconfirm,
  message,
  Spin,
  Modal,
  Form,
  Radio,
  Select,
  DatePicker,
} from "antd";
import axios from "axios";
import { getEmployeeName, validateAge } from "../../../../../helper/getInfoAdmin";

const ViewEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [positions, setPositions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false); // Modal thêm nhân viên
  const [form] = Form.useForm();
  const [value4, setValue4] = useState("Apple");
  const nameAdmin = getEmployeeName()

  // Lọc danh sách nhân viên theo từ khóa tìm kiếm
  const filteredEmployees = employees.filter((employees) =>
    employees.FullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fetch danh sách nhân viên
  useEffect(() => {
    const fetchEmployeeData = async () => {
      setLoading(true);
      try {
        reloadEmployee();
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        message.error(
          "Không thể tải danh sách nhân viên. Vui lòng thử lại sau."
        );
      } finally {
        setLoading(false);
      }
    };

    const fetchPositionData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/positions`
        );
        // Chuyển đổi dữ liệu thành định dạng cần cho Select
        const positionOptions = response.data.map((position) => ({
          value: position.id,
          label: position.PositionName,
        }));
        setPositions(positionOptions);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu Position:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPositionData();
    fetchEmployeeData();
  }, []);

  const reloadEmployee = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/employees`)
      setEmployees(response.data.map((employees, index) => ({ key: index, ...employees })))
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error)
      message.error("Không thể tải danh sách nhân viên. Vui lòng thử lại sau.")
    } finally {
      setLoading(false)
    }
  };
  // Hàm tìm tên chức vụ dựa trên PositionID
  const getPositionName = (PositionID) => {
    const position = positions.find((p) => p.id === parseInt(PositionID));
    return position ? position.PositionName : "Chưa xác định";
  };

  // Hàm xử lý xóa nhân viên
  const handleDelete = async (key) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/delete-employee-by-id`, { data: { key } }
      );
      reloadEmployee();
      message.success("Xóa nhân viên thành công.");
    } catch {
      message.error("Không thể xóa nhân viên. Vui lòng thử lại.");
    }
  };

  const handleLock = async (key) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/lock-employee`,
        { key }
      );
      reloadEmployee();
      console.log(response.data);
      message.success(response.data.message);
    } catch (error) {
      console.error("Lỗi khi khóa tài khoản", error);
      message.error("Không thể khóa tài khoản! Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };
  const handleUnlock = async (key) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/unlock-employee`, { key });
      reloadEmployee();
      message.success(response.data.message);
    } catch (error) {
      console.error("Lỗi khi mở khóa tài khoản", error);
      message.error("Không thể mở khóa tài khoản! Vui lòng thử lại.");
    }
  };


  // Mở modal thêm nhân viên
  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const onChange4 = ({ target: { value } }) => {
    console.log("radio4 checked", value);
    setValue4(value);
  };

  const gender = [
    { label: "Nam", value: "Nam" },
    { label: "Nữ", value: "Nữ" },
  ];

  /*const handleChange = (value) => {
    console.log(`selected ${value}`);
  };*/

  // Đóng modal thêm nhân viên
  const handleAddCancel = () => {
    setIsAddModalVisible(false);
    form.resetFields();
  };

  // Lưu thêm nhân viên
  const handleAddSave = async () => {
    try {
      const values = form.getFieldsValue();
      const newEmployee = {
        ...values,
        DateOfBirth: values.DateOfBirth ? values.DateOfBirth.toISOString() : null, // Chuyển đổi DatePicker thành ISO string
      };

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/create-employee`,
        { newEmployee, nameAdmin }
      );
      reloadEmployee();
      message.success("Thêm nhân viên thành công.");
      handleAddCancel();
    } catch {
      message.error("Không thể thêm nhân viên. Vui lòng thử lại.");
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
      title: "Tên nhân viên",
      dataIndex: "FullName",
      key: "FullName",
      render: (FullName) => FullName || "Chưa cập nhật",
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
      title: "Chức vụ",
      dataIndex: "PositionID",
      key: "PositionID",
      render: (PositionID) => getPositionName(PositionID),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) =>
        createdAt ? new Date(createdAt).toLocaleDateString() : "Chưa cập nhật",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (text, employees) => (
        <>
          <>
            {employees.IsActive ? (
              <Popconfirm
                title="Bạn có chắc chắn muốn khóa tài khoản này không?"
                onConfirm={() => handleLock(employees.id)}
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
                onConfirm={() => handleUnlock(employees.id)}
                okText="Có"
                cancelText="Không"
              >
                <Button type="link" className="text-red-600 font-bold mx-1">
                  Mở khóa tài khoản
                </Button>
              </Popconfirm>
            )}
          </>

          <Popconfirm
            title="Bạn có chắc chắn muốn xóa nhân viên này không?"
            onConfirm={() => handleDelete(employees.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="link" className="text-red-600 font-bold mx-1">
              Xóa
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-5">Danh sách nhân viên</h1>
      <Input
        placeholder="Tìm kiếm nhân viên..."
        className="mb-4"
        style={{ width: "300px", height: "40px" }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button type="primary" onClick={showAddModal} className="ml-10">
        Thêm nhân viên
      </Button>
      {loading ? (
        <div className="flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredEmployees}
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
          }}
        />
      )}

      {/* Modal thêm nhân viên */}
      <Modal
        title="Thêm nhân viên"
        centered
        visible={isAddModalVisible}
        onOk={handleAddSave}
        onCancel={handleAddCancel}
        width={700}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="FullName"
            label="Tên nhân viên"
            rules={[
              { required: true, message: "Vui lòng nhập tên nhân viên!" },
            ]}
          >
            <Input placeholder="" />
          </Form.Item>
          <Form.Item
            name="DateOfBirth"
            label="Ngày sinh"
            rules={[
              {
                validator: (_, value) => validateAge(value),
              },
            ]}
          >
            <DatePicker
              style={{ width: "100%" }}
              format="DD/MM/YYYY"
              placeholder="Chọn ngày sinh"
            />
          </Form.Item>
          <Form.Item
            name="Gender"
            label="Giới tính"
            rules={[
              { required: true, message: "Vui lòng nhập tên nhân viên!" },
            ]}
          >
            <Radio.Group
              options={gender}
              onChange={onChange4}
              value={value4}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
          <Form.Item
            name="Address"
            label="Địa chỉ"
            rules={[
              { type: "address", message: "Vui lòng nhập địa chỉ hợp lệ!" },
            ]}
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
          <Form.Item
            name="PositionID"
            label="Chức vụ"
            rules={[{ required: true, message: "Vui lòng chọn chức vụ!" }]}
          >
            <Select
              loading={loading}
              options={positions}
              placeholder="Chọn chức vụ"
            />
          </Form.Item>
          <Form.Item
            name="Username"
            label="Tên tài khoản"
            rules={[
              { required: true, message: "Vui lòng nhập tên nhân viên!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Password"
            label="Mật khẩu"
            rules={[
              { required: true, message: "Mật khẩu không được để trống!" },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ViewEmployee;
