const getEmployeeName = () => {
    const employeeData = localStorage.getItem('employee');
    if (employeeData) {
        const employee = JSON.parse(employeeData);
        const NameUser = employee?.data?.FullName ? employee.data.FullName : "admin";
        return NameUser;
    }
    return "Error";
}

export default getEmployeeName