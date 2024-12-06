import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  message,
  Tag,
} from "antd";
import axios from "axios";
import moment from "moment";
import { getEmployeeLogin } from "../../../../helper/getInfoAdmin";

const { TextArea } = Input;
const { Option } = Select;

const ViewDeliveryReceipt = () => {
  const [receipts, setReceipts] = useState([]); // List of delivery receipts
  const [suppliers, setSuppliers] = useState([]); // List of suppliers
  const [products, setProducts] = useState([]); // Products from the supplier
  const [selectedProducts, setSelectedProducts] = useState([]); // Products to be delivered
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReceipt, setEditingReceipt] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [supplierDetails, setSupplierDetails] = useState(null); // Selected supplier details
  const [supplierMap, setSupplierMap] = useState({});
  const employee = getEmployeeLogin();
  const [form] = Form.useForm();

  // Fetch delivery receipts
  const fetchReceipts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/get-delivery-receipt`
      );
      setReceipts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      message.error("Error fetching delivery receipts!");
    } finally {
      setLoading(false);
    }
  };

  // Fetch suppliers
  const fetchSuppliers = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/suppliers`
      );
      if (Array.isArray(data)) {
        setSuppliers(data);
        // Tạo đối tượng ánh xạ SupplierID -> SupplierName
        const map = {};
        data.forEach((supplier) => {
          map[supplier.SupplierID] = supplier.SupplierName;
        });
        setSupplierMap(map);
      } else {
        setSuppliers([]);
        setSupplierMap({});
      }
    } catch (error) {
      console.error(error);
      message.error("Error fetching suppliers!");
    }
  };

  // Fetch products by supplier
  const fetchProductsBySupplier = async (supplierId) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/get-supplier-by-id`,
        {
          params: { supplierId },
        }
      );

      if (data) {
        setSupplierDetails({
          SupplierID: data.SupplierID,
          SupplierName: data.SupplierName,
          Address: data.Address,
          PhoneNumber: data.PhoneNumber,
          Email: data.Email,
          Status: data.Status,
        });

        setProducts(Array.isArray(data.Products) ? data.Products : []);
      } else {
        setSupplierDetails(null);
        setProducts([]);
      }
    } catch (error) {
      console.error(error);
      message.error("Error fetching supplier details and products!");
    }
  };

  // Add product to selected list
  const addProductToList = (productId) => {
    const existingProduct = selectedProducts.find(
      (item) => item.ProductID === productId
    );
    if (existingProduct) {
      message.warning("Product already added to the list!");
      return;
    }

    const product = products.find((item) => item.ProductID === productId);
    if (!product) return;

    setSelectedProducts((prev) => [
      ...prev,
      {
        ...product,
        Quantity: 1,
        UnitPrice: product.PromotionalPrice || product.ListedPrice || 0,
        TotalPrice: (product.PromotionalPrice || product.ListedPrice || 0) * 1,
      },
    ]);
  };

  // Remove product from selected list
  const removeProductFromList = (productId) => {
    setSelectedProducts((prev) =>
      prev.filter((item) => item.ProductID !== productId)
    );
  };

  // Update product quantity
  const updateProductQuantity = (productId, quantity) => {
    if (quantity < 1) {
      message.warning("Quantity must be at least 1!");
      return;
    }

    setSelectedProducts((prev) =>
      prev.map((item) =>
        item.ProductID === productId
          ? {
              ...item,
              Quantity: quantity,
              TotalPrice: item.UnitPrice * quantity,
            }
          : item
      )
    );
  };

  // Update product unit price
  const updateProductUnitPrice = (productId, unitPrice) => {
    const parsedUnitPrice = parseFloat(unitPrice);
    if (isNaN(parsedUnitPrice) || parsedUnitPrice < 0) {
      message.warning("Unit price must be a valid non-negative number!");
      return;
    }

    setSelectedProducts((prev) =>
      prev.map((item) =>
        item.ProductID === productId
          ? {
              ...item,
              UnitPrice: parsedUnitPrice,
              TotalPrice: parsedUnitPrice * item.Quantity,
            }
          : item
      )
    );
  };

  // Calculate total price
  const calculateTotalPrice = () =>
    selectedProducts.reduce((sum, item) => sum + item.TotalPrice, 0);

  // Open add/edit modal
  const openModal = async (record = null) => {
    if (record) {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api//get-delivery-receipt-by-id`,
          { params: { id: record.id } }
        );
        setEditingReceipt(data.data);
        form.setFieldsValue({
          ...data.data,
          DeliveryDate: moment(data.data.DeliveryDate),
        });
        setSelectedProducts(
          Array.isArray(data.data.DeliveryReceiptDetails)
            ? data.data.DeliveryReceiptDetails.map((prod) => ({
                ...prod,
                ProductName: prod.Product ? prod.Product.ProductName : "",
                UnitPrice: prod.UnitPrice,
                Quantity: prod.Quantity,
                Notes: prod.Notes,
                TotalPrice: (prod.UnitPrice || 0) * (prod.Quantity || 0),
              }))
            : []
        );
        // Fetch supplier details and products
        fetchProductsBySupplier(data.data.SupplierID);
      } catch (error) {
        console.error(error);
        message.error("Error fetching receipt details!");
      } finally {
        setLoading(false);
      }
    } else {
      form.resetFields();
      setEditingReceipt(null);
      setSelectedProducts([]);
      setSupplierDetails(null);
      setProducts([]);
    }
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    form.resetFields();
    setEditingReceipt(null);
    setSelectedProducts([]);
    setSupplierDetails(null);
    setProducts([]);
    setIsModalOpen(false);
  };

  // Handle supplier selection
  const handleSelectSupplier = (supplierId) => {
    form.setFieldsValue({ SupplierID: supplierId });
    setSelectedProducts([]); // Reset selected products
    fetchProductsBySupplier(supplierId);
  };

  // Add or update delivery receipt
  const handleSubmit = async (values) => {
    if (selectedProducts.length === 0) {
      message.warning("Please add at least one product to the receipt!");
      return;
    }

    setSubmitLoading(true);
    const totalPrice = calculateTotalPrice();
    const requestData = {
      ...values,
      DeliveryDate: values.DeliveryDate.format("YYYY-MM-DD"),
      Products: selectedProducts.map((product) => ({
        ProductID: product.ProductID,
        Quantity: product.Quantity,
        UnitPrice: product.UnitPrice,
      })),
      TotalPrice: totalPrice,
      EmployeeID: employee.data.id,
    };

    try {
      if (editingReceipt) {
        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/update-delivery-receipt`,
          {
            DeliveryDate: requestData.DeliveryDate,
            Notes: requestData.Notes,
            Details: requestData.Details,
          },
          { params: { id: editingReceipt.id } }
        );
        message.success("Receipt updated successfully!");
      } else {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/create-delivery-receipt`,
          requestData
        );
        message.success("Receipt added successfully!");
      }
      fetchReceipts();
      closeModal();
    } catch (error) {
      console.error(error);
      message.error("Error saving delivery receipt!");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleCompleteDeliveryreceipt = async (id) => {
    try {
      await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/update-status-delivery-receipt`,
        { status: "Hoàn thành" },
        { params: { id } }
      );
      fetchReceipts();
      message.success("Receipt completed successfully!");
    } catch (error) {
      console.error(error);
      message.error("Error completing receipt!");
    }
  };
  const handleCancelDeliveryreceipt = async (id) => {
    try {
      await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/update-status-delivery-receipt`,
        { status: "Hủy đơn" },
        { params: { id } }
      );
      fetchReceipts();
      message.success("Receipt cancel successfully!");
    } catch (error) {
      console.error(error);
      message.error("Error cancel receipt!");
    }
  };

  useEffect(() => {
    fetchReceipts();
    fetchSuppliers();
  }, []);

  // Columns for receipts table
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Ngày nhập hàng",
      dataIndex: "DeliveryDate",
      key: "DeliveryDate",
      render: (date) => moment(date).format("YYYY-MM-DD"),
    },
    { title: "Ghi chú", dataIndex: "Notes", key: "Notes" },
    {
      title: "Nhà cung cấp",
      dataIndex: "SupplierID",
      key: "SupplierID",
      render: (supplierId) => supplierMap[supplierId] || "Không rõ",
    },
    {
      title: "Tổng tiền",
      dataIndex: "TotalPrice",
      key: "TotalPrice",
      render: (price) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(price),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => openModal(record)}>
            Sửa
          </Button>
          {record.Status === "Chờ xử lý" ? (
            <Select
              value={record.Status}
              style={{ width: 120 }}
              onChange={(value) => {
                if (value === "Hoàn thành") {
                  handleCompleteDeliveryreceipt(record.id);
                } else if (value === "Hủy") {
                  handleCancelDeliveryreceipt(record.id);
                }
              }}
            >
              <Select.Option value="Hoàn thành">
                hoàn thành đơn hàng
              </Select.Option>
              <Select.Option value="Hủy">hủy đơn hàng</Select.Option>
            </Select>
          ) : (
            <Tag color={record.Status === "Hoàn thành" ? "green" : "red"}>
              {record.Status}
            </Tag>
          )}
        </>
      ),
    },
  ];

  // Columns for selected products table in modal
  const selectedProductColumns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "ProductName",
      key: "ProductName",
    },
    {
      title: "Giá (VND)",
      dataIndex: "UnitPrice",
      key: "UnitPrice",
      render: (_, record) => (
        <Input
          type="number"
          value={record.UnitPrice}
          min={0}
          step={0.01}
          onChange={(e) =>
            updateProductUnitPrice(
              record.ProductID,
              parseFloat(e.target.value) || 0
            )
          }
        />
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "Quantity",
      key: "Quantity",
      render: (_, record) => (
        <Input
          type="number"
          value={record.Quantity}
          min={1}
          onChange={(e) =>
            updateProductQuantity(
              record.ProductID,
              parseInt(e.target.value, 10) || 1
            )
          }
        />
      ),
    },
    {
      title: "Tổng tiền (VND)",
      dataIndex: "TotalPrice",
      key: "TotalPrice",
      render: (price) =>
        Number(price).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <Button
          type="link"
          danger
          onClick={() => removeProductFromList(record.ProductID)}
        >
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2>Danh sách phiếu nhập hàng</h2>
      <Button type="primary" onClick={() => openModal()}>
        Thêm phiếu nhập hàng
      </Button>
      <Table
        columns={columns}
        dataSource={receipts}
        loading={loading}
        rowKey="ReceiptID"
        style={{ marginTop: 20 }}
      />

      {/* Add/Edit Modal */}
      <Modal
        title={editingReceipt ? "Sửa phiếu nhập hàng" : "Thêm phiếu nhập hàng"}
        open={isModalOpen}
        onCancel={closeModal}
        confirmLoading={submitLoading}
        onOk={() => form.submit()}
        width={800}
        okText="Lưu"
        cancelText="Đóng"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ SupplierID: "", Notes: "" }}
        >
          <Form.Item
            name="DeliveryDate"
            label="Ngày nhập hàng"
            rules={[
              { required: true, message: "Vui lòng chọn ngày nhập hàng!" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="SupplierID"
            label="Nhà cung cấp"
            rules={[{ required: true, message: "Vui lòng chọn nhà cung cấp!" }]}
          >
            <Select
              placeholder="Chọn nhà cung cấp"
              onChange={handleSelectSupplier}
              showSearch
              optionFilterProp="children"
            >
              {suppliers.map((supplier) => (
                <Option key={supplier.SupplierID} value={supplier.SupplierID}>
                  {supplier.SupplierName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Supplier details */}
          {supplierDetails && (
            <div style={{ marginBottom: 20 }}>
              <p>
                <b>Địa chỉ:</b> {supplierDetails.Address}
              </p>
              <p>
                <b>Số điện thoại:</b> {supplierDetails.PhoneNumber}
              </p>
              <p>
                <b>Email:</b> {supplierDetails.Email}
              </p>
            </div>
          )}

          {/* Product selection */}
          <Form.Item label="Chọn sản phẩm">
            <Select
              placeholder="Chọn sản phẩm"
              onChange={addProductToList}
              disabled={!supplierDetails}
              showSearch
              optionFilterProp="children"
            >
              {products.map((product) => (
                <Option key={product.ProductID} value={product.ProductID}>
                  #{product.ProductID} - {product.ProductName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Selected products table */}
          <Table
            columns={selectedProductColumns}
            dataSource={selectedProducts}
            rowKey="ProductID"
            pagination={false}
            style={{ marginTop: 20 }}
          />

          <div style={{ marginTop: 20, textAlign: "right" }}>
            <b>Tổng tiền:</b>{" "}
            {calculateTotalPrice().toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </div>

          <Form.Item name="Notes" label="Ghi chú" style={{ marginTop: 20 }}>
            <TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ViewDeliveryReceipt;
