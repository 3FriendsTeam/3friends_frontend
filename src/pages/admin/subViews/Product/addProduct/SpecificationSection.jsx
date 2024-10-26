import React, { useState } from 'react';

const SpecificationSection = ({ specifications, onAddSpecification, onRemoveSpecification }) => {
    const [specName, setSpecName] = useState('');
    const [specValue, setSpecValue] = useState('');
    const [isEditing, setIsEditing] = useState(null); // Trạng thái để chỉnh sửa
    const [manufacturer, setManufacturer] = useState('');

    const handleAddSpecification = () => {
        if (specName && specValue) {
            if (isEditing !== null) {
                // Nếu đang ở chế độ chỉnh sửa, cập nhật thông số
                const updatedSpecs = specifications.map((spec, index) =>
                    index === isEditing ? { name: specName, value: specValue } : spec
                );
                onAddSpecification(updatedSpecs);
                setIsEditing(null); // Reset chế độ chỉnh sửa
            } else {
                // Thêm thông số mới
                onAddSpecification([...specifications, { name: specName, value: specValue }]);
            }
            setSpecName('');
            setSpecValue('');
        }
    };

    const handleEditSpecification = (index) => {
        // Khi người dùng bấm chỉnh sửa, điền lại giá trị vào form để chỉnh sửa
        const spec = specifications[index];
        setSpecName(spec.name);
        setSpecValue(spec.value);
        setIsEditing(index); // Lưu lại trạng thái đang chỉnh sửa
    };

    return (
        <div className="p-4 border rounded bg-white shadow-md mb-4">
            <h3 className="text-lg font-semibold mb-2">Thông số sản phẩm</h3>

            <div className="grid grid-cols-2 gap-4 mb-2">
                {/* Select để chọn loại thông số */}
                <select
                    value={manufacturer}
                    onChange={(e) => setManufacturer(e.target.value)}
                    className="w-full border p-2 mb-2"
                >
                    <option>-- Chọn loại thông số --</option>
                    {/* Các lựa chọn có thể thêm vào đây */}
                </select>

                {/* Input nhập giá trị thông số */}
                <input
                    type="text"
                    value={specValue}
                    onChange={(e) => setSpecValue(e.target.value)}
                    placeholder="Nhập giá trị"
                    className="w-full border p-2 h-10"
                />
                
                {/* Nút thêm hoặc cập nhật thông số */}
                <button
                    type="button"
                    onClick={handleAddSpecification}
                    className="bg-blue-500 text-white p-2 rounded col-span-2"
                >
                    {isEditing !== null ? 'Cập nhật' : 'Thêm thông số'}
                </button>
            </div>

            {/* Bảng hiển thị danh sách thông số (dù có hoặc không có thông số) */}
            <table className="min-w-full bg-white mt-4 border">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border">Tên thông số</th>
                        <th className="py-2 px-4 border">Giá trị</th>
                        <th className="py-2 px-4 border">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {specifications.length > 0 ? (
                        specifications.map((spec, index) => (
                            <tr key={index} className="border-t">
                                <td className="py-2 px-4 border">{spec.name}</td>
                                <td className="py-2 px-4 border">{spec.value}</td>
                                <td className="py-2 px-4 border flex justify-around">
                                    <button
                                        type="button"
                                        onClick={() => handleEditSpecification(index)}
                                        className="text-blue-500"
                                    >
                                        Chỉnh sửa
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => onRemoveSpecification(index)}
                                        className="text-red-500"
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="py-2 px-4 text-center text-gray-500">
                                Chưa có thông số nào được thêm
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default SpecificationSection;
