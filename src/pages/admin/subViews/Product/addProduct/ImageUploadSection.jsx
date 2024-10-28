import { useState } from 'react';
import PropTypes from 'prop-types';
const ImageUploadSection = ({ onThumbnailChange, onGalleryChange, onSpecImageChange }) => {
    const [thumbnail, setThumbnail] = useState(null);
    const [gallery, setGallery] = useState([]);
    const [specImage, setSpecImage] = useState(null); // Quản lý ảnh thông số

    // Xử lý khi thay đổi ảnh đại diện
    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        setThumbnail(file);
        onThumbnailChange(file); // Gửi file ảnh đại diện lên component cha
    };

    // Xử lý khi thay đổi ảnh minh họa
    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files);
        setGallery((prevGallery) => [...prevGallery, ...files]); // Thêm các ảnh mới vào gallery
        onGalleryChange([...gallery, ...files]); // Gửi danh sách ảnh mới lên component cha
    };

    // Xử lý khi thay đổi ảnh thông số
    const handleSpecImageChange = (e) => {
        const file = e.target.files[0];
        setSpecImage(file);
        onSpecImageChange(file); // Gửi file ảnh thông số lên component cha
    };

    // Xóa ảnh đại diện
    const handleRemoveThumbnail = () => {
        setThumbnail(null);
        onThumbnailChange(null); // Gửi thông báo ảnh đại diện đã bị xóa lên component cha
    };

    // Xóa ảnh khỏi gallery
    const handleRemoveImage = (indexToRemove) => {
        const updatedGallery = gallery.filter((_, index) => index !== indexToRemove);
        setGallery(updatedGallery);
        onGalleryChange(updatedGallery); // Cập nhật danh sách ảnh sau khi xóa lên component cha
    };

    // Xóa ảnh thông số
    const handleRemoveSpecImage = () => {
        setSpecImage(null);
        onSpecImageChange(null); // Gửi thông báo ảnh thông số đã bị xóa lên component cha
    };

    return (
        <div className="p-4 border rounded bg-white shadow-md mb-4">
            <h3 className="text-lg font-semibold mb-2">Chọn ảnh sản phẩm</h3>

            {/* Ảnh đại diện */}
            <label className="block text-sm font-medium">Ảnh đại diện</label>
            <input
                type="file"
                onChange={handleThumbnailChange}
                className="w-full mb-2"
                disabled={thumbnail !== null} // Vô hiệu hóa nếu đã chọn ảnh đại diện
            />
            {thumbnail && (
                <div className="mb-2 relative">
                    <p>Ảnh đại diện đã chọn: {thumbnail.name}</p>
                    <img
                        src={URL.createObjectURL(thumbnail)}
                        alt="Ảnh đại diện"
                        className="w-full h-32 object-cover rounded mb-2"
                    />
                    <button
                        onClick={handleRemoveThumbnail}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full">
                        X
                    </button>
                </div>
            )}

            {/* Ảnh minh họa */}
            <label className="block text-sm font-medium">Ảnh minh họa</label>
            <input
                type="file"
                onChange={handleGalleryChange}
                className="w-full mb-2"
                multiple
            />

            {/* Hiển thị danh sách ảnh minh họa đã chọn */}
            {gallery.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mt-2">
                    {gallery.map((file, index) => (
                        <div key={index} className="relative">
                            <img
                                src={URL.createObjectURL(file)}
                                alt={`Ảnh minh họa ${index + 1}`}
                                className="w-full h-32 object-cover rounded"
                            />
                            <button
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full">
                                X
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Ảnh thông số */}
            <label className="block text-sm font-medium">Ảnh thông số</label>
            <input
                type="file"
                onChange={handleSpecImageChange}
                className="w-full mb-2"
                disabled={specImage !== null} // Vô hiệu hóa nếu đã chọn ảnh thông số
            />
            {specImage && (
                <div className="mb-2 relative">
                    <p>Ảnh thông số đã chọn: {specImage.name}</p>
                    <img
                        src={URL.createObjectURL(specImage)}
                        alt="Ảnh thông số"
                        className="w-full h-32 object-cover rounded mb-2"
                    />
                    <button
                        onClick={handleRemoveSpecImage}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full">
                        X
                    </button>
                </div>
            )}
        </div>
    );
}
ImageUploadSection.propTypes = {
    onThumbnailChange: PropTypes.func.isRequired,
    onGalleryChange: PropTypes.func.isRequired,
    onSpecImageChange: PropTypes.func.isRequired,
  };

export default ImageUploadSection;
