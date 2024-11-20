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
  Select,
  Upload,
  Space,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const ViewProduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [specifications, setSpecifications] = useState([]);
  const [colorInput, setColorInput] = useState("");
  const [colors, setColors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Thêm state để lưu danh sách file ảnh đại diện và ảnh minh họa
  const [representativeImageFile, setRepresentativeImageFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);

  // Lọc danh sách sản phẩm theo từ khóa tìm kiếm
  const filteredProducts = products.filter((product) =>
    product.ProductName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fetch danh sách sản phẩm, loại sản phẩm và nhà sản xuất
  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products`
        );
        setProducts(
          response.data.map((product) => ({ key: product.id, ...product }))
        );
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        message.error(
          "Không thể tải danh sách sản phẩm. Vui lòng thử lại sau."
        );
      } finally {
        setLoading(false);
      }
    };

    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/categories`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        message.error(
          "Không thể tải danh sách loại sản phẩm. Vui lòng thử lại sau."
        );
      }
    };

    const fetchManufacturerData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/manufacturers`
        );
        setManufacturers(response.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        message.error(
          "Không thể tải danh sách nhà sản xuất. Vui lòng thử lại sau."
        );
      }
    };

    fetchManufacturerData();
    fetchCategoryData();
    fetchProductData();
  }, []);

  // Hàm tìm tên loại sp dựa trên CategoryID
  const getCategoryName = (CategoryID) => {
    const category = categories.find((p) => p.id === parseInt(CategoryID));
    return category ? category.CategoryName : "Chưa xác định";
  };

  // Hàm tìm tên NSX dựa trên ManufacturerID
  const getManufacturerName = (ManufacturerID) => {
    const manufacturer = manufacturers.find(
      (p) => p.id === parseInt(ManufacturerID)
    );
    return manufacturer ? manufacturer.ManufacturerName : "Chưa xác định";
  };

  // Hàm xử lý xóa sản phẩm
  const handleDelete = async (key) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`
      );
      setProducts(products.filter((product) => product.key !== key));
      message.success("Xóa sản phẩm thành công.");
    } catch {
      message.error("Không thể xóa sản phẩm. Vui lòng thử lại.");
    }
  };

  // Mở modal chỉnh sửa
  const showEditModal = (product) => {
    setEditingProduct(product);
    setIsEditModalVisible(true);
    form.setFieldsValue(product);

    // Set màu sắc và thông số kỹ thuật khi chỉnh sửa
    setColors(product.colors || []);
    setSpecifications(product.specifications || []);
  };

  // Đóng modal chỉnh sửa
  const handleEditCancel = () => {
    setEditingProduct(null);
    setIsEditModalVisible(false);
    form.resetFields();
    setColors([]);
    setSpecifications([]);
  };
  // Hàm mở modal thêm sản phẩm
  const showAddModal = () => {
    setIsAddModalVisible(true);
    form.resetFields();
    setColors([]);
    setSpecifications([]);
    setRepresentativeImageFile(null);
    setGalleryFiles([]);
  };

  // Hàm đóng modal thêm sản phẩm
  const handleAddCancel = () => {
    setIsAddModalVisible(false);
    form.resetFields();
    setColors([]);
    setSpecifications([]);
    setRepresentativeImageFile(null);
    setGalleryFiles([]);
  };

  const handleRemoveColor = (index) => {
    const newColors = colors.filter((_, idx) => idx !== index);
    setColors(newColors);
    message.success("Đã xóa màu!");
  };

  const handleAddColor = () => {
    if (colorInput.trim() !== "") {
      setColors([...colors, colorInput.trim()]);
      setColorInput("");
      message.success("Đã thêm màu!");
    } else {
      message.error("Vui lòng nhập màu hợp lệ!");
    }
  };

  // Lưu chỉnh sửa sản phẩm
  const handleEditSave = async (values) => {
    try {
      const updatedProduct = {
        ...values,
        colors,
        specifications,
      };

      // Xử lý upload ảnh nếu có
      const formData = new FormData();
      if (representativeImageFile) {
        formData.append("representativeImage", representativeImageFile);
      }
      galleryFiles.forEach((file) => {
        formData.append("galleryImages", file);
      });

      formData.append("productData", JSON.stringify(updatedProduct));

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${editingProduct.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProducts((prev) =>
        prev.map((product) =>
          product.key === editingProduct.key
            ? { ...product, ...updatedProduct }
            : product
        )
      );
      message.success("Cập nhật thông tin sản phẩm thành công.");
      handleEditCancel();
    } catch (error) {
      console.error(error);
      message.error("Không thể cập nhật sản phẩm. Vui lòng thử lại.");
    }
  };

  const handleRemoveSpecification = (key) => {
    setSpecifications(specifications.filter((item) => item.key !== key));
  };

  const handleCreateProduct = async (values) => {
    try {
      const newProduct = {
        ...values,
        colors,
        specifications,
      };

      // Tạo FormData để gửi dữ liệu bao gồm file và thông tin sản phẩm
      const formData = new FormData();
      if (representativeImageFile) {
        formData.append("representativeImage", representativeImageFile);
      }
      galleryFiles.forEach((file) => {
        formData.append("galleryImages", file);
      });

      formData.append("productData", JSON.stringify(newProduct));

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/products`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProducts((prev) => [
        ...prev,
        { key: response.data.id, ...response.data },
      ]);
      message.success("Thêm sản phẩm thành công!");
      handleAddCancel();
    } catch (error) {
      console.error(error);
      message.error("Không thể thêm sản phẩm. Vui lòng thử lại.");
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
      title: "Ảnh đại diện",
      dataIndex: "RepresentativeImage",
      key: "RepresentativeImage",
      render: (RepresentativeImage) =>
        RepresentativeImage ? (
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/assets/${RepresentativeImage}`}
            alt="Ảnh đại diện"
            style={{ width: 50, height: 50 }}
          />
        ) : (
          "Chưa có ảnh"
        ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "ProductName",
      key: "ProductName",
      render: (ProductName) => ProductName || "Chưa cập nhật",
    },
    {
      title: "Số lượng",
      dataIndex: "Stock",
      key: "Stock",
      render: (Stock) => Stock || "Chưa cập nhật",
    },
    {
      title: "NSX",
      dataIndex: "ManufacturerID",
      key: "ManufacturerID",
      render: (ManufacturerID) =>
        getManufacturerName(ManufacturerID) || "Chưa cập nhật",
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "CategoryID",
      key: "CategoryID",
      render: (CategoryID) =>
        getCategoryName(CategoryID) || "Chưa cập nhật",
    },
    {
      title: "Giá (VND)",
      dataIndex: "ListedPrice",
      key: "ListedPrice",
      render: (ListedPrice) =>
        ListedPrice !== null && ListedPrice !== undefined
          ? ListedPrice.toLocaleString()
          : "Chưa cập nhật",
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
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa sản phẩm này không?"
            onConfirm={() => handleDelete(record.key)}
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

  const handleAddSpecification = () => {
    const values = form.getFieldsValue(["specName", "specValue"]);
    if (values.specName && values.specValue) {
      const newSpecification = {
        key: Date.now(),
        name: values.specName,
        value: values.specValue,
      };
      setSpecifications([...specifications, newSpecification]);
      form.resetFields(["specName", "specValue"]);
    } else {
      message.error("Vui lòng nhập đầy đủ thông số kỹ thuật!");
    }
  };

  const columnsSpecifications = [
    {
      title: "Tên thông số",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá trị",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Button
          type="link"
          danger
          onClick={() => handleRemoveSpecification(record.key)}
        >
          Xóa
        </Button>
      ),
    },
  ];
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-5">Danh sách sản phẩm</h1>
      <Input
        placeholder="Tìm kiếm sản phẩm..."
        className="mb-4"
        style={{ width: "300px", height: "40px" }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button type="primary" className="mb-4" onClick={showAddModal}>
        Thêm sản phẩm
      </Button>
      {loading ? (
        <div className="flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredProducts}
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
          }}
        />
      )}
      {/* Modal thêm sản phẩm */}
      <Modal
        title="Thêm sản phẩm"
        open={isAddModalVisible}
        onCancel={handleAddCancel}
        footer={null}
        centered
        width={700}
      >
        <div className="container mx-auto p-6">
          <h1 className="text-blue-800 text-3xl font-bold mb-5 flex justify-center">
            Thêm sản phẩm
          </h1>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleCreateProduct}
            initialValues={{
              Promotion: 0,
              PromotionalPrice: 0,
            }}
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Cột trái */}
              <div>
                <Form.Item
                  name="ProductName"
                  label="Tên sản phẩm"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên sản phẩm!" },
                  ]}
                >
                  <Input placeholder="Nhập tên sản phẩm" />
                </Form.Item>

                <Form.Item
                  name="ManufacturerID"
                  label="Hãng sản xuất"
                  rules={[
                    { required: true, message: "Vui lòng chọn hãng sản xuất!" },
                  ]}
                >
                  <Select placeholder="Chọn hãng sản xuất">
                    {manufacturers.map((manufacturer) => (
                      <Select.Option key={manufacturer.id} value={manufacturer.id}>
                        {manufacturer.ManufacturerName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="CategoryID"
                  label="Loại sản phẩm"
                  rules={[
                    { required: true, message: "Vui lòng chọn loại sản phẩm!" },
                  ]}
                >
                  <Select placeholder="Chọn loại sản phẩm">
                    {categories.map((category) => (
                      <Select.Option key={category.id} value={category.id}>
                        {category.CategoryName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="ListedPrice"
                  label="Giá gốc (VND)"
                  rules={[
                    { required: true, message: "Vui lòng nhập giá gốc!" },
                  ]}
                >
                  <Input
                    type="number"
                    placeholder="Nhập giá gốc"
                    onChange={(e) => {
                      const promotion = form.getFieldValue("Promotion") || 0;
                      const promotionalPrice =
                        e.target.value - (e.target.value * promotion) / 100;
                      form.setFieldsValue({ PromotionalPrice: promotionalPrice });
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="Promotion"
                  label="Khuyến mãi (%)"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập phần trăm khuyến mãi!",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    placeholder="Nhập phần trăm khuyến mãi"
                    onChange={(e) => {
                      const basePrice = form.getFieldValue("ListedPrice") || 0;
                      const promotionalPrice =
                        basePrice - (basePrice * e.target.value) / 100;
                      form.setFieldsValue({ PromotionalPrice: promotionalPrice });
                    }}
                  />
                </Form.Item>

                <Form.Item name="PromotionalPrice" label="Giá khuyến mãi (VND)">
                  <Input type="number" disabled />
                </Form.Item>
              </div>

              {/* Cột phải */}
              <div>
                <Form.Item
                  name="Origin"
                  label="Xuất xứ"
                  rules={[
                    { required: true, message: "Vui lòng nhập xuất xứ!" },
                  ]}
                >
                  <Input placeholder="Nhập xuất xứ" />
                </Form.Item>

                <Form.Item
                  name="Description"
                  label="Mô tả sản phẩm"
                  rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
                >
                  <Input.TextArea rows={6} placeholder="Nhập mô tả chi tiết" />
                </Form.Item>

                <Form.Item
                  name="WarrantyPolicyID"
                  label="Chọn loại bảo hành"
                  rules={[
                    { required: true, message: "Vui lòng chọn loại bảo hành!" },
                  ]}
                >
                  <Select placeholder="Chọn loại bảo hành">
                    <Select.Option value="1">12 tháng</Select.Option>
                    <Select.Option value="2">24 tháng</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Màu sắc">
                  <Space
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Input
                      placeholder="Nhập màu (VD: Đỏ, Xanh...)"
                      value={colorInput}
                      onChange={(e) => setColorInput(e.target.value)}
                    />
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => handleAddColor()}
                    >
                      Thêm màu
                    </Button>
                  </Space>

                  {/* Danh sách màu đã thêm */}
                  <ul>
                    {colors.map((color, index) => (
                      <li
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span>{color}</span>
                        <Button
                          type="link"
                          danger
                          onClick={() => handleRemoveColor(index)}
                        >
                          Xóa
                        </Button>
                      </li>
                    ))}
                  </ul>
                </Form.Item>
              </div>
            </div>

            {/* Chọn ảnh sản phẩm */}
            <h3 className="text-lg font-bold mt-5 mb-3">Chọn ảnh sản phẩm</h3>
            <Form.Item
              name="RepresentativeImage"
              label="Ảnh đại diện"
              rules={[
                { required: true, message: "Vui lòng tải lên ảnh đại diện!" },
              ]}
            >
              <Upload
                name="representativeImage"
                listType="picture-card"
                maxCount={1}
                beforeUpload={(file) => {
                  setRepresentativeImageFile(file);
                  return false; // Ngăn không cho upload ngay lập tức
                }}
                onRemove={() => {
                  setRepresentativeImageFile(null);
                }}
              >
                {representativeImageFile ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Tải lên</div>
                  </div>
                )}
              </Upload>
            </Form.Item>

            <Form.Item
              name="Gallery"
              label="Ảnh minh họa"
              rules={[
                { required: true, message: "Vui lòng tải lên ảnh minh họa!" },
              ]}
            >
              <Upload
                name="galleryImages"
                listType="picture-card"
                multiple
                beforeUpload={(file) => {
                  setGalleryFiles([...galleryFiles, file]);
                  return false; // Ngăn không cho upload ngay lập tức
                }}
                onRemove={(file) => {
                  setGalleryFiles((prev) =>
                    prev.filter((item) => item.uid !== file.uid)
                  );
                }}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Tải lên</div>
                </div>
              </Upload>
            </Form.Item>

            {/* Thông số sản phẩm */}
            <h3 className="text-lg font-bold mt-5 mb-3">Thông số sản phẩm</h3>
            <Space
              style={{ display: "flex", marginBottom: 8 }}
              align="baseline"
            >
              <Form.Item name="specName" label="Tên thông số">
                <Input placeholder="Nhập tên thông số" />
              </Form.Item>
              <Form.Item name="specValue" label="Giá trị">
                <Input placeholder="Nhập giá trị" />
              </Form.Item>
              <Button type="primary" onClick={handleAddSpecification}>
                Thêm thông số
              </Button>
            </Space>
            <Table
              columns={columnsSpecifications}
              dataSource={specifications}
              pagination={false}
              bordered
              rowKey="key"
            />

            {/* Nút Lưu */}
            <div className="flex justify-center mt-5">
              <Button type="primary" htmlType="submit">
                Thêm sản phẩm
              </Button>
            </div>
          </Form>
        </div>
      </Modal>

      {/* Modal sửa thông tin sản phẩm */}
      <Modal
        title="Sửa thông tin sản phẩm"
        centered
        open={isEditModalVisible}
        onCancel={handleEditCancel}
        width={700}
        footer={[
          <Button key="back" onClick={handleEditCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={form.submit}>
            Lưu
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleEditSave}
          initialValues={editingProduct}
        >
          {/* Tên sản phẩm */}
          <Form.Item
            name="ProductName"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>

          {/* Giá niêm yết */}
          <Form.Item
            name="ListedPrice"
            label="Giá niêm yết (VND)"
            rules={[
              { required: true, message: "Vui lòng nhập giá niêm yết!" },
            ]}
          >
            <Input type="number" placeholder="Nhập giá niêm yết" />
          </Form.Item>

          {/* Giá khuyến mãi */}
          <Form.Item name="PromotionalPrice" label="Giá khuyến mãi (VND)">
            <Input type="number" placeholder="Nhập giá khuyến mãi (nếu có)" />
          </Form.Item>

          {/* Số lượng */}
          <Form.Item
            name="Stock"
            label="Số lượng tồn kho"
            rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
          >
            <Input type="number" placeholder="Nhập số lượng sản phẩm" />
          </Form.Item>

          {/* Trạng thái */}
          <Form.Item
            name="Status"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
          >
            <Select placeholder="Chọn trạng thái">
              <Select.Option value="1">Hoạt động</Select.Option>
              <Select.Option value="0">Ngừng hoạt động</Select.Option>
            </Select>
          </Form.Item>

          {/* Ảnh đại diện */}
          <Form.Item
            name="RepresentativeImage"
            label="Ảnh đại diện"
            rules={[
              { required: false, message: "Vui lòng tải lên ảnh đại diện!" },
            ]}
          >
            <Upload
              name="representativeImage"
              listType="picture-card"
              maxCount={1}
              beforeUpload={(file) => {
                setRepresentativeImageFile(file);
                return false;
              }}
              onRemove={() => {
                setRepresentativeImageFile(null);
              }}
            >
              {form.getFieldValue("RepresentativeImage") &&
              !representativeImageFile ? (
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/assets/${form.getFieldValue(
                    "RepresentativeImage"
                  )}`}
                  alt="Ảnh đại diện"
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

          {/* Mô tả */}
          <Form.Item
            name="Description"
            label="Mô tả sản phẩm"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả sản phẩm!" },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Nhập mô tả chi tiết" />
          </Form.Item>

          {/* Loại sản phẩm */}
          <Form.Item
            name="CategoryID"
            label="Loại sản phẩm"
            rules={[
              { required: true, message: "Vui lòng chọn loại sản phẩm!" },
            ]}
          >
            <Select loading={loading} placeholder="Chọn loại sản phẩm">
              {categories.map((category) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.CategoryName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* Nhà sản xuất */}
          <Form.Item
            name="ManufacturerID"
            label="Nhà sản xuất"
            rules={[
              { required: true, message: "Vui lòng chọn nhà sản xuất!" },
            ]}
          >
            <Select loading={loading} placeholder="Chọn nhà sản xuất">
              {manufacturers.map((manufacturer) => (
                <Select.Option key={manufacturer.id} value={manufacturer.id}>
                  {manufacturer.ManufacturerName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* Quốc gia sản xuất */}
          <Form.Item name="Origin" label="Xuất xứ">
            <Input placeholder="Nhập quốc gia sản xuất (nếu có)" />
          </Form.Item>

          {/* Chính sách bảo hành */}
          <Form.Item name="WarrantyPolicyID" label="Chính sách bảo hành">
            <Select placeholder="Chọn chính sách bảo hành">
              <Select.Option value="1">12 tháng</Select.Option>
              <Select.Option value="2">24 tháng</Select.Option>
            </Select>
          </Form.Item>

          {/* Màu sắc */}
          <Form.Item label="Màu sắc">
            <Space
              style={{ display: "flex", marginBottom: 8 }}
              align="baseline"
            >
              <Input
                placeholder="Nhập màu (VD: Đỏ, Xanh...)"
                value={colorInput}
                onChange={(e) => setColorInput(e.target.value)}
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => handleAddColor()}
              >
                Thêm màu
              </Button>
            </Space>

            {/* Danh sách màu đã thêm */}
            <ul>
              {colors.map((color, index) => (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{color}</span>
                  <Button
                    type="link"
                    danger
                    onClick={() => handleRemoveColor(index)}
                  >
                    Xóa
                  </Button>
                </li>
              ))}
            </ul>
          </Form.Item>

          {/* Thông số sản phẩm */}
          <h3 className="text-lg font-bold mt-5 mb-3">Thông số sản phẩm</h3>
          <Space
            style={{ display: "flex", marginBottom: 8 }}
            align="baseline"
          >
            <Form.Item name="specName" label="Tên thông số">
              <Input placeholder="Nhập tên thông số" />
            </Form.Item>
            <Form.Item name="specValue" label="Giá trị">
              <Input placeholder="Nhập giá trị" />
            </Form.Item>
            <Button type="primary" onClick={handleAddSpecification}>
              Thêm thông số
            </Button>
          </Space>
          <Table
            columns={columnsSpecifications}
            dataSource={specifications}
            pagination={false}
            bordered
            rowKey="key"
          />
        </Form>
      </Modal>
    </div>
  );
};

export default ViewProduct;
