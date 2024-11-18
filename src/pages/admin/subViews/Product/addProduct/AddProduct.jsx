import { useState } from 'react';
import ImageUploadSection from './ImageUploadSection'; // Import phần upload ảnh
import SpecificationSection from './SpecificationSection'; // Import phần thông số sản phẩm

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [productType, setProductType] = useState('');
    const [origin, setOrigin] = useState('');
    const [basePrice, setBasePrice] = useState('');
    const [promotion, setPromotion] = useState('');
    const [promotionalPrice, setPromotionalPrice] = useState('');
    const [warrantyPeriod, setWarrantyPeriod] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [gallery, setGallery] = useState(null);
    const [specifications, setSpecifications] = useState([]);

    // Hàm xử lý submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = {
            productName,
            manufacturer,
            productType,
            origin,
            basePrice,
            promotion,
            promotionalPrice,
            warrantyPeriod,
            description,
            thumbnail,
            gallery,
            specifications
        };
        console.log("Sản phẩm mới:", newProduct);
    };

    // Hàm để thêm thông số sản phẩm
    const handleAddSpecification = (spec) => {
        setSpecifications([...specifications, spec]);
    };

    // Hàm để xóa thông số sản phẩm
    const handleRemoveSpecification = (index) => {
        const updatedSpecs = specifications.filter((_, i) => i !== index);
        setSpecifications(updatedSpecs);
    };

    return (
        <div className="">
            <h1 className="text-blue-800 text-3xl font-bold mb-5 flex justify-center w-(1536px)">Thêm sản phẩm</h1>
            <form onSubmit={handleSubmit}>
                {/* Phần thông tin cơ bản sản phẩm */}
                <div className="p-4 border rounded bg-white shadow-md mb-4 grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium">Tên sản phẩm</label>
                        <input 
                            type="text" 
                            value={productName} 
                            onChange={(e) => setProductName(e.target.value)} 
                            className="w-full border p-2 mb-2"
                        />

                        <label className="block text-sm font-medium">Hãng sản xuất</label>
                        <select 
                            value={manufacturer} 
                            onChange={(e) => setManufacturer(e.target.value)} 
                            className="w-full border p-2 mb-2"
                        >
                            <option>-- Chọn hãng sản xuất --</option>
                        </select>

                        <label className="block text-sm font-medium">Loại sản phẩm</label>
                        <select 
                            value={productType} 
                            onChange={(e) => setProductType(e.target.value)} 
                            className="w-full border p-2 mb-2"
                        >
                            <option>-- Chọn loại sản phẩm --</option>
                        </select>

                        
                        
                        <label className="block text-sm font-medium">Giá gốc</label>
                        <input 
                            type="number" 
                            value={basePrice} 
                            onChange={(e) => setBasePrice(e.target.value)} 
                            className="w-full border p-2 mb-2"
                        />

                        <label className="block text-sm font-medium">Khuyến mãi</label>
                        <input 
                            type="number" 
                            value={promotion} 
                            onChange={(e) => setPromotion(e.target.value)} 
                            className="w-full border p-2 mb-2"
                        />

                        <label className="block text-sm font-medium">Giá khuyến mãi</label>
                        <input 
                            type="number" 
                            value={promotionalPrice} 
                            onChange={(e) => setPromotionalPrice(e.target.value)} 
                            className="w-full border p-2 mb-2"
                            disabled
                        />  

                    </div>

                    <div>
                        <label className="block text-sm font-medium">Xuất xứ</label>
                        <select 
                            value={origin} 
                            onChange={(e) => setOrigin(e.target.value)} 
                            className="w-full border p-2 mb-2"
                        >
                            <option>-- Chọn xuất xứ --</option>
                        </select>

                        <label className="block text-sm font-medium">Mô tả</label>
                        <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        className="w-full border p-2 mb-2"
                        rows="6" // Tăng chiều cao bằng cách tăng số dòng
                        ></textarea>

                        <label className="block text-sm font-medium">Thời gian bảo hành</label>
                        <select 
                            value={warrantyPeriod} 
                            onChange={(e) => setWarrantyPeriod(e.target.value)} 
                            className="w-full border p-2 mb-2"
                        >
                            <option>-- Chọn thời gian bảo hành --</option>
                        </select>

                        <label className="block text-sm font-medium">Màu sắc</label>
                        <button type='submit' className="bg-gray-100 text-black p-2 rounded mt-4 w-10"> + </button>

                    </div>
                    
                </div>

                {/* Phần chọn ảnh sản phẩm */}
                <ImageUploadSection 
                    onThumbnailChange={setThumbnail} 
                    onGalleryChange={setGallery} 
                />

                {/* Phần thông số sản phẩm */}
                <SpecificationSection 
                    specifications={specifications} 
                    onAddSpecification={handleAddSpecification} 
                    onRemoveSpecification={handleRemoveSpecification} 
                />

                <div className='flex justify-center'>
                    <button 
                        type="submit" 
                        className="bg-green-500 text-white p-2 rounded mt-4"
                    >
                        Thêm sản phẩm
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddProduct;
