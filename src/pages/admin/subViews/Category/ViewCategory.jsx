import { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  message,
  Modal,
  Form,
  Upload,
  Spin,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const ViewCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // State for Edit Modal
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editForm] = Form.useForm();
  const [editingCategory, setEditingCategory] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  // Fetch danh sách danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/categories`
        );
        setCategories(
          response.data.map((category, index) => ({
            key: index,
            ...category,
          }))
        );
      } catch (error) {
        console.error("Lỗi khi tải danh sách danh mục:", error);
        message.error(
          "Không thể tải danh sách danh mục. Vui lòng thử lại sau."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Lọc danh mục theo từ khóa tìm kiếm
  const filteredCategories = categories.filter((category) =>
    category.CategoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );


  // Mở modal chỉnh sửa
  const showEditModal = (category) => {
    setEditingCategory(category);
    setIsEditModalVisible(true);
    editForm.setFieldsValue(category);
  };

  // Đóng modal chỉnh sửa
  const handleEditCancel = () => {
    setEditingCategory(null);
    setIsEditModalVisible(false);
    editForm.resetFields();
  };

  // Lưu chỉnh sửa
  const handleEditSave = async () => {
    try {
      const updatedCategory = editForm.getFieldsValue();
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/update-categories`,
        { CategoryName: updatedCategory.CategoryName,
            pathImg: updatedCategory.pathImg, },
        { params: { id: editingCategory.id } }
      );
      setCategories((prev) =>
        prev.map((category) =>
          category.id === editingCategory.id
            ? { ...category, ...updatedCategory }
            : category
        )
      );
      message.success("Cập nhật danh mục thành công.");
      handleEditCancel();
    } catch (error) {
      console.error("Lỗi khi cập nhật danh mục:", error);
      message.error("Không thể cập nhật danh mục. Vui lòng thử lại.");
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
      title: "Tên danh mục",
      dataIndex: "CategoryName",
      key: "CategoryName",
      render: (name) => name || "Chưa cập nhật",
    },
    {
      title: "Hình ảnh",
      dataIndex: "pathImg",
      key: "pathImg",
      render: (pathImg) =>
        pathImg ? (
          <img
            src={pathImg}
            alt="Hình ảnh danh mục"
            style={{ width: 50, height: 50 }}
          />
        ) : (
          "Chưa cập nhật"
        ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (text, record) => (
        <>
          <Button
            type="primary"
            onClick={() => showEditModal(record)}
            className="text-blue-600 font-bold mx-1 bg-blue-100"
          >
            Sửa
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-5">Danh sách danh mục</h1>
      <div className="flex items-center mb-4">
        <Input
          placeholder="Tìm kiếm danh mục..."
          style={{ width: "300px", height: "40px", marginRight: "10px" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {loading ? (
        <div className="flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredCategories}
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
          }}
        />
      )}

      {/* Modal sửa danh mục */}
      <Modal
        title="Sửa danh mục"
        centered
        open={isEditModalVisible}
        onOk={handleEditSave}
        onCancel={handleEditCancel}
        width={500}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={editForm} layout="vertical">
          <Form.Item
            name="CategoryName"
            label="Tên danh mục"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
          >
            <Input placeholder="Nhập tên danh mục" />
          </Form.Item>
          <Form.Item name="pathImg" label="Hình ảnh">
            <Upload
              name="image"
              listType="picture-card"
              showUploadList={false}
              action={`${import.meta.env.VITE_BACKEND_URL}/api/upload-category-image`}
              beforeUpload={() => true}
              onChange={(info) => {
                if (info.file.status === "done") {
                  editForm.setFieldsValue({ pathImg: info.file.response.url });
                  message.success("Tải ảnh lên thành công!");
                } else if (info.file.status === "error") {
                  message.error("Tải ảnh lên thất bại. Vui lòng thử lại.");
                }
              }}
            >
              {editForm.getFieldValue("pathImg") ? (
                <img
                  src={editForm.getFieldValue("pathImg")}
                  alt="Hình ảnh danh mục"
                  style={{ width: "100%" }}
                />
              ) : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Tải lên</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ViewCategory;
