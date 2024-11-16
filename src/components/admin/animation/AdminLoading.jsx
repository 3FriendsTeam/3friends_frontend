import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const AdminLoading = ({ status }) => {
  const [loadingStatus, setLoadingStatus] = useState(false);

  useEffect(() => {
    if (status) {
      setLoadingStatus(true);
    } else {
      setLoadingStatus(false);
    }
  }, [status]);

  return (
    <div>
      {loadingStatus && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-[#42b4e9] rounded-full animate-pulse"></div>
            <span className="ml-4 text-[#223861] text-xl font-semibold">
              Đang tải dữ liệu, vui lòng chờ...
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

AdminLoading.propTypes = {
    status: PropTypes.bool.isRequired,
  };

export default AdminLoading;

