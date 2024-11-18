const getEmployeeName = () => {
    const employeeData = localStorage.getItem('employee');
    if (employeeData) {
        const employee = JSON.parse(employeeData);
        return employee.name || "Admin";
    }
    return "Error";
}

export default getEmployeeName