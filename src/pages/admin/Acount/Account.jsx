//import { useEffect, useState } from 'react';
import {  useState } from 'react';
//import axios from 'axios';
//import { Card, Avatar, Spin, message } from 'antd';
import { Card, Avatar, Spin } from 'antd';
import EditProfile from './EditProfile';
import EditProfileImage from './EditProfileImage';

function Profile() {
  const [employee, setEmployee] = useState({
    
        "ProfileImage": "https://example.com/profile.jpg",
        "Username": "johndoe",
        "Password": "hashed_password",
        "PositionID": 2,
        "FullName": "John Doe",
        "DateOfBirth": "1990-05-15T00:00:00.000Z",
        "Gender": "Male",
        "Address": "123 Main St, Hometown, USA",
        "Email": "johndoe@example.com",
        "PhoneNumber": "+1234567890",
        "DeletedAt": null,
        "CreatedBy": "admin",
        "DeletedBy": null,
        "UpdatedBy": "admin",
        "IsDeleted": false
    
  });
  //const token = localStorage.getItem('token'); // Lấy token từ localStorage

//   useEffect(() => {
//     axios
//       .get('/employee/me', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         setEmployee(response.data);
//       })
//       .catch((error) => {
//         message.error('Không thể lấy thông tin người dùng');
//         console.error(error);
//       });
//   }, [token]);

  if (!employee) {
    return <Spin tip="Đang tải thông tin..." />;
  }

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: '20px' }}>
      <Card>
        <Card.Meta
          avatar={<Avatar size={64} src={employee.ProfileImage} />}
          title={employee.FullName}
          description={`Chức vụ: ${employee.PositionID}`}
        />
        <p><strong>Username:</strong> {employee.Username}</p>
        {/* Không hiển thị Password */}
        <p><strong>Date of Birth:</strong> {employee.DateOfBirth}</p>
        <p><strong>Gender:</strong> {employee.Gender}</p>
        <p><strong>Address:</strong> {employee.Address}</p>
        <p><strong>Email:</strong> {employee.Email}</p>
        <p><strong>Phone Number:</strong> {employee.PhoneNumber}</p>
        <p><strong>Deleted At:</strong> {employee.DeletedAt}</p>
        <p><strong>Created By:</strong> {employee.CreatedBy}</p>
        <p><strong>Deleted By:</strong> {employee.DeletedBy}</p>
        <p><strong>Updated By:</strong> {employee.UpdatedBy}</p>
        <p><strong>Is Deleted:</strong> {employee.IsDeleted ? 'Yes' : 'No'}</p>
        <EditProfileImage onUpdate={setEmployee} />
      </Card>
      <EditProfile employee={employee} onUpdate={setEmployee} />
    </div>
  );
}

export default Profile;
