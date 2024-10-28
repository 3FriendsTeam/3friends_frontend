import PropTypes from 'prop-types';
import { useState } from 'react';

function UploadImgEmployee({ onThumbnailChange }) {
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);

    // Xử lý khi thay đổi ảnh đại diện
    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        setThumbnail(file);
        const reader = new FileReader();
        reader.onload = () => {
            setThumbnailPreview(reader.result);
        };
        reader.readAsDataURL(file);
        onThumbnailChange(file); // Gửi file ảnh đại diện lên component cha
    };

    // Xóa ảnh đại diện
    const handleRemoveThumbnail = () => {
        setThumbnail(null);
        setThumbnailPreview(null);
        onThumbnailChange(null); // Gửi thông báo ảnh đại diện đã bị xóa lên component cha
    };

    return (
        <div className="p-4 border rounded bg-white shadow-md mb-4">
            <h3 className="text-lg font-semibold mb-2">Chọn ảnh đại diện cho nhân viên</h3>

            {/* Ảnh đại diện */}
            <label className="block text-sm font-medium">Ảnh đại diện</label>
            <input
                type="file"
                onChange={handleThumbnailChange}
                className="w-full mb-2"
                disabled={thumbnail !== null} // Vô hiệu hóa nếu đã chọn ảnh đại diện
            />
            {thumbnailPreview && (
                <div className="mb-2 relative">
                    <p>Ảnh đại diện đã chọn: {thumbnail.name}</p>
                    <img
                        src={thumbnailPreview}
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
        </div>
    );
}

UploadImgEmployee.propTypes = {
    onThumbnailChange: PropTypes.func.isRequired,
};
export default UploadImgEmployee;

