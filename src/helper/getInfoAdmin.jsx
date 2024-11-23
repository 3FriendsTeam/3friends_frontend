export const getEmployeeName = () => {
    const employeeData = localStorage.getItem('employee');
    if (employeeData) {
        try {
            const employee = JSON.parse(employeeData);
            const nameUser = employee?.data?.FullName || "admin";
            return nameUser;
        } catch (error) {
            console.error('Error parsing employee data:', error);
        }
    }
    return "admin";
}

export const getPositionName = () => {
    const positionName = localStorage.getItem('Position') || "Unknown Position";     
    return positionName;
}

export const getEmployeeLogin = () => {
    const employeeData = localStorage.getItem('employee');
    if (employeeData) {
        try {
            const employee = JSON.parse(employeeData);
            return employee;
        } catch (error) {
            console.error('Error parsing employee data:', error);
        }
    }
    return null;
}

/**
 * Kiểm tra ngày sinh có hợp lệ (nhân viên trên 16 tuổi) hay không
 * @param {moment.Moment} value Ngày được chọn trong DatePicker
 * @returns {Promise<void>} Trả về Promise resolve nếu hợp lệ, reject nếu không
 */
export const validateAge = (value) => {
  if (!value) {
    return Promise.reject(new Error("Vui lòng chọn ngày sinh!"));
  }

  const currentDate = new Date();
  const selectedDate = value.toDate(); // Chuyển moment thành Date object
  const age = currentDate.getFullYear() - selectedDate.getFullYear();

  if (
    age > 16 ||
    (age === 16 &&
      currentDate >= new Date(selectedDate.setFullYear(selectedDate.getFullYear() + 16)))
  ) {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error("Nhân viên phải trên 16 tuổi!"));
  }
};
