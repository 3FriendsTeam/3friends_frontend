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
import { storage } from "../../../../../config/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getEmployeeName } from "../../../../../helper/getInfoAdmin";

const ViewProduct = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [warrantyPolicies, setWarrantyPolicies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [specifications, setSpecifications] = useState([]);
  const [colorInput, setColorInput] = useState("");
  const [colors, setColors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [representativeImageFile, setRepresentativeImageFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [representativeImageList, setRepresentativeImageList] = useState([]);
  const [galleryFileList, setGalleryFileList] = useState([]);
  const [countryOfOrigin, setContryOfOrigin] = useState([]);
  const nameEmployee = getEmployeeName();

  // Lọc danh sách sản phẩm theo từ khóa tìm kiếm
  const filteredProducts = products.filter((product) =>
    product.ProductName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const reloadProductList = async () => {
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
      message.error("Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

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
    const fetchContryOfOrigin = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/country-of-origin`
        );
        setContryOfOrigin(response.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        message.error(
          "Không thể tải xuất xứ sản phẩm. Vui lòng thử lại sau."
        );
      }
    }
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
    const fetchWarrantyPoliciesData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/warranty-policies`
        );
        setWarrantyPolicies(response.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        message.error(
          "Không thể tải danh sách chính sách bảo hành. Vui lòng thử lại sau."
        );
      }
    };
    fetchContryOfOrigin();
    fetchManufacturerData();
    fetchCategoryData();
    fetchProductData();
    fetchWarrantyPoliciesData();
  }, []);

  // Hàm tìm tên loại sản phẩm dựa trên CategoryID
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
        `${import.meta.env.VITE_BACKEND_URL}/api/delete-product`,
        {
          params: { key },
        }
      );
      setProducts(products.filter((product) => product.key !== key));
      message.success("Xóa sản phẩm thành công.");
    } catch {
      message.error("Không thể xóa sản phẩm. Vui lòng thử lại.");
    }
  };

  const showEditModal = async (product) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/get-product-by-id`,
        {
          params: { id: product.id }
        }
      );
      console.log(response.data);
      const productDetails = response.data;
      form.setFieldsValue({
        ProductName: productDetails.ProductName,
        ManufacturerID: productDetails.ManufacturerID,
        CategoryID: productDetails.CategoryID,
        ListedPrice: productDetails.ListedPrice,
        Promotion: productDetails.Promotion || 0,
        PromotionalPrice: productDetails.PromotionalPrice,
        CountryID: productDetails.CountryID,
        Description: productDetails.Description,
        WarrantyPolicyID: productDetails.WarrantyPolicyID,
      });

      setEditingProduct(productDetails);
      // Map colors
      setColors(
        productDetails.Colors
          ? productDetails.Colors.map((color) => color.ColorName)
          : []
      );
      // Map specifications
      setSpecifications(
        productDetails.ProductAttributeDetails
          ? productDetails.ProductAttributeDetails.map((attr) => ({
            key: attr.id,
            name: attr.ProductAttribute.AttributeName, 
            value: attr.AttributeValue,
          }))
          : []
      );

      // Set images
      setRepresentativeImageList([
        {
          uid: "-1",
          name: "RepresentativeImage",
          status: "done",
          url: productDetails.RepresentativeImage,
        },
      ]);

      setGalleryFileList(
        productDetails.Images
          ? productDetails.Images.map((image, index) => ({
            uid: index.toString(),
            name: `GalleryImage${index}`,
            status: "done",
            url: image.FilePath,
          }))
          : []
      );

      // Reset files
      setRepresentativeImageFile(null);
      setGalleryFiles([]);
      setColorInput("");

      setIsEditModalVisible(true);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
      message.error("Không thể tải chi tiết sản phẩm. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // Đóng modal chỉnh sửa
  const handleEditCancel = () => {
    setEditingProduct(null);
    setIsEditModalVisible(false);
    form.resetFields();
    setColors([]);
    setSpecifications([]);
    setRepresentativeImageList([]);
    setGalleryFileList([]);
    setRepresentativeImageFile(null);
    setGalleryFiles([]);
  };

  // Hàm mở modal thêm sản phẩm
  const showAddModal = () => {
    setIsAddModalVisible(true);
    form.resetFields();
    setColors([]);
    setSpecifications([]);
    setRepresentativeImageFile(null);
    setGalleryFiles([]);
    setRepresentativeImageList([]);
    setGalleryFileList([]);
    setColorInput("");
  };

  // Hàm đóng modal thêm sản phẩm
  const handleAddCancel = () => {
    setIsAddModalVisible(false);
    form.resetFields();
    setColors([]);
    setSpecifications([]);
    setRepresentativeImageFile(null);
    setGalleryFiles([]);
    setRepresentativeImageList([]);
    setGalleryFileList([]);
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
  const handleEditSave = async () => {
    try {
      setLoading(true);
      const formData = form.getFieldsValue();
      let representativeImageUrl = editingProduct.RepresentativeImage;
      if (representativeImageFile) {
        // Upload new representative image
        const repImageRef = ref(
          storage,
          `images/${Date.now()}_${representativeImageFile.name}`
        );
        await uploadBytes(repImageRef, representativeImageFile);
        representativeImageUrl = await getDownloadURL(repImageRef);
      }

      // Handle gallery images
      let galleryUrls = editingProduct.Images
        ? editingProduct.Images.map((img) => img.FilePath)
        : [];

      // Check for removed images
      const removedGalleryUrls = galleryFileList
        .filter((file) => file.status === "removed" && !file.originFileObj)
        .map((file) => file.url);

      galleryUrls = galleryUrls.filter(
        (url) => !removedGalleryUrls.includes(url)
      );

      // Upload new gallery images
      if (galleryFiles.length > 0) {
        for (let i = 0; i < galleryFiles.length; i++) {
          const file = galleryFiles[i];
          const galleryImageRef = ref(
            storage,
            `images/${Date.now()}_${file.name}`
          );
          await uploadBytes(galleryImageRef, file);
          const url = await getDownloadURL(galleryImageRef);
          galleryUrls.push(url);
        }
      }

      // Map specifications to API format
      const productAttributes = specifications.map((spec) => ({
        id: spec.key,
        AttributeName: spec.name,
        AttributeValue: spec.value,
      }));

      // Prepare colors
      const productColors = colors.map((colorName, index) => ({
        id: editingProduct.Colors && editingProduct.Colors[index]
          ? editingProduct.Colors[index].id
          : null,
        ColorName: colorName,
      }));

      const updatedProduct = {
        ...formData,
        Colors: productColors,
        ProductAttributeDetails: productAttributes,
        RepresentativeImage: representativeImageUrl,
        Images: galleryUrls.map((url, index) => ({
          id: editingProduct.Images && editingProduct.Images[index]
            ? editingProduct.Images[index].id
            : null,
          FilePath: url,
          ThuTu: index + 1,
        })),
      };
      console.log(updatedProduct, nameEmployee);
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/update-product?id=${editingProduct.id}`,
        {
          updatedProduct,
          nameEmployee,
        }
      );

      message.success("Cập nhật thông tin sản phẩm thành công.");
      handleEditCancel();
      reloadProductList();
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
      message.error("Không thể cập nhật sản phẩm. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSpecification = (key) => {
    setSpecifications(specifications.filter((item) => item.key !== key));
  };

  const handleCreateProduct = async () => {
    try {
      setLoading(true);
      setIsAddModalVisible(false);
      // Tải ảnh đại diện lên Firebase
      let representativeImageUrl = "";
      if (representativeImageFile) {
        const repImageRef = ref(
          storage,
          `images/${Date.now()}_${representativeImageFile.name}`
        );
        await uploadBytes(repImageRef, representativeImageFile);
        representativeImageUrl = await getDownloadURL(repImageRef);
      }

      // Tải ảnh minh họa lên Firebase
      const galleryUrls = [];
      for (let i = 0; i < galleryFiles.length; i++) {
        const file = galleryFiles[i];
        const galleryImageRef = ref(
          storage,
          `images/${Date.now()}_${file.name}`
        );
        await uploadBytes(galleryImageRef, file);
        const url = await getDownloadURL(galleryImageRef);
        galleryUrls.push(url);
      }

      // Map specifications to API format
      const productAttributes = specifications.map((spec) => ({
        AttributeName: spec.name,
        AttributeValue: spec.value,
      }));

      // Prepare colors
      const productColors = colors.map((colorName) => ({
        ColorName: colorName,
      }));

      // Lấy dữ liệu từ form và thêm URL ảnh
      const newProduct = {
        ...form.getFieldsValue(),
        Colors: productColors,
        ProductAttributeDetails: productAttributes,
        RepresentativeImage: representativeImageUrl,
        Images: galleryUrls.map((url, index) => ({
          FilePath: url,
          ThuTu: index + 1,
        })),
      };
      console.log(newProduct)
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/create-product`,
        { newProduct, nameEmployee }
      );

      handleAddCancel();
      reloadProductList();
      message.success("Thêm sản phẩm thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      message.error("Không thể thêm sản phẩm. Vui lòng thử lại.");
    } finally {
      setLoading(false);
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
            src={RepresentativeImage}
            alt="Ảnh đại diện"
            className="w-12 h-12 object-cover rounded"
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
      render: (CategoryID) => getCategoryName(CategoryID) || "Chưa cập nhật",
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

  const handleRepresentativeImageChange = ({ fileList }) => {
    setRepresentativeImageList(fileList);
    if (fileList.length > 0 && fileList[0].originFileObj) {
      setRepresentativeImageFile(fileList[0].originFileObj);
    } else if (fileList.length === 0) {
      setRepresentativeImageFile(null);
    }
  };

  const handleGalleryChange = ({ fileList }) => {
    setGalleryFileList(fileList);
    const newGalleryFiles = fileList
      .filter((file) => file.originFileObj)
      .map((file) => file.originFileObj);
    setGalleryFiles(newGalleryFiles);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-5">
        Danh sách sản phẩm kinh doanh
      </h1>
      <Input
        placeholder="Tìm kiếm sản phẩm..."
        className="mb-4"
        style={{ width: "300px", height: "40px" }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button type="primary" onClick={showAddModal} className="ml-10">
        + Thêm sản phẩm
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
            pageSize: 10,
            showSizeChanger: false,
          }}
        />
      )}
      {/* Modal thêm sản phẩm */}

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
              promotion: 0,
              promotionalPrice: 0,
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
                      <Select.Option
                        key={manufacturer.id}
                        value={manufacturer.id}
                      >
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
                  <Input type="number" placeholder="Nhập giá gốc" />
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
                      form.setFieldsValue({
                        PromotionalPrice: promotionalPrice,
                      });
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
                  name="CountryID"
                  label="Xuất xứ"
                  rules={[
                    { required: true, message: "Vui lòng chọn xuất xứ!" },
                  ]}
                >
                  <Select placeholder="Chọn nơi xuất xứ">
                    {countryOfOrigin.map((countryOfOrigin) => (
                      <Select.Option
                        key={countryOfOrigin.id}
                        value={countryOfOrigin.id}
                      >
                        {countryOfOrigin.CountryName}
                      </Select.Option>
                    ))}
                  </Select>
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
                    {warrantyPolicies.map((warrantyPolicies) => (
                      <Select.Option key={warrantyPolicies.id} value={warrantyPolicies.id}>
                        {warrantyPolicies.WarrantyConditions}
                      </Select.Option>
                    ))}
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
                name="image"
                listType="picture-card"
                maxCount={1}
                beforeUpload={(file) => {
                  setRepresentativeImageFile(file);
                  return false; // Ngăn chặn upload tự động
                }}
                onRemove={() => {
                  setRepresentativeImageFile(null);
                }}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Tải lên</div>
                </div>
              </Upload>
            </Form.Item>

            <Form.Item
              name="Images"
              label="Ảnh minh họa"
              rules={[
                { required: true, message: "Vui lòng tải lên ảnh minh họa!" },
              ]}
            >
              <Upload
                name="images"
                listType="picture-card"
                multiple
                beforeUpload={(file) => {
                  setGalleryFiles((prev) => [...prev, file]);
                  return false; // Ngăn chặn upload tự động
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
        title="Sửa sản phẩm"
        open={isEditModalVisible}
        onCancel={handleEditCancel}
        footer={null}
        centered
        width={700}
      >
        <div className="container mx-auto p-6">
          <h1 className="text-blue-800 text-3xl font-bold mb-5 flex justify-center">
            Sửa thông tin sản phẩm
          </h1>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleEditSave}
            initialValues={{
              promotion: 0,
              promotionalPrice: 0,
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
                      <Select.Option
                        key={manufacturer.id}
                        value={manufacturer.id}
                      >
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
                  <Input type="number" placeholder="Nhập giá gốc" />
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
                      form.setFieldsValue({
                        PromotionalPrice: promotionalPrice,
                      });
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="PromotionalPrice"
                  label="Giá khuyến mãi (VND)"
                >
                  <Input type="number" disabled />
                </Form.Item>
              </div>

              {/* Cột phải */}
              <div>
                <Form.Item
                  name="CountryID"
                  label="Xuất xứ"
                  rules={[
                    { required: true, message: "Vui lòng chọn xuất xứ!" },
                  ]}
                >
                  <Select placeholder="Chọn nơi xuất xứ">
                    {countryOfOrigin.map((countryOfOrigin) => (
                      <Select.Option
                        key={countryOfOrigin.id}
                        value={countryOfOrigin.id}
                      >
                        {countryOfOrigin.CountryName}
                      </Select.Option>
                    ))}
                  </Select>
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
                    {warrantyPolicies.map((policy) => (
                      <Select.Option key={policy.id} value={policy.id}>
                        {policy.WarrantyConditions}
                      </Select.Option>
                    ))}
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
            >
              <Upload
                name="image"
                listType="picture-card"
                maxCount={1}
                fileList={representativeImageList}
                onChange={handleRepresentativeImageChange}
                beforeUpload={() => false} // Ngăn chặn upload tự động
              >
                {representativeImageList.length >= 1 ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Tải lên</div>
                  </div>
                )}
              </Upload>
            </Form.Item>

            <Form.Item
              name="Images"
              label="Ảnh minh họa"
            >
              <Upload
                name="images"
                listType="picture-card"
                multiple
                fileList={galleryFileList}
                onChange={handleGalleryChange}
                beforeUpload={() => false} // Ngăn chặn upload tự động
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
                Lưu thay đổi
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default ViewProduct;
