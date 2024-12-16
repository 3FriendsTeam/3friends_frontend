import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { CircularProgress } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function GenderAndAgeStatisticsChart() {
  const [genderStats, setGenderStats] = useState({});
  const [ageStats, setAgeStats] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/get-all-customer`
        );
        const customers = response.data;

        // Function to calculate age from BirthDate
        const calculateAge = (birthDate) => {
          const today = new Date();
          const birth = new Date(birthDate);
          let age = today.getFullYear() - birth.getFullYear();
          const monthDiff = today.getMonth() - birth.getMonth();
          const dayDiff = today.getDate() - birth.getDate();
          if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
          }
          return age;
        };

        // Standardize gender
        const standardizedGender = (gender) => {
          if (!gender) return "Chưa xác định";
          const lowerCaseGender = gender.toLowerCase();
          if (lowerCaseGender === "male" || lowerCaseGender === "nam") return "Nam";
          if (lowerCaseGender === "female" || lowerCaseGender === "nữ") return "Nữ";
          return "Chưa xác định";
        };

        // Calculate gender statistics
        const genderStats = customers.reduce((acc, customer) => {
          const gender = standardizedGender(customer.Gender);
          acc[gender] = (acc[gender] || 0) + 1;
          return acc;
        }, {});
        setGenderStats(genderStats);

        // Calculate age group statistics
        const getAgeGroup = (age) => {
          if (age < 18) return "Dưới 18";
          if (age < 30) return "18-29";
          if (age < 45) return "30-44";
          if (age < 60) return "45-59";
          return "60+";
        };

        const ageStats = customers.reduce((acc, customer) => {
          const age = calculateAge(customer.BirthDate);
          const ageGroup = getAgeGroup(age);
          acc[ageGroup] = (acc[ageGroup] || 0) + 1;
          return acc;
        }, {});
        setAgeStats(ageStats);

      } catch (error) {
        setError("Không thể tải dữ liệu khách hàng.");
        console.error(error);
      }
    };

    fetchCustomerData();
  }, []);

  // Gender chart data
  const genderData = {
    labels: Object.keys(genderStats),
    datasets: [
      {
        label: "Giới tính khách hàng",
        data: Object.values(genderStats),
        backgroundColor: ["#42a5f5", "#f48fb1", "#bdbdbd"],
      },
    ],
  };

  // Age chart data
  const ageData = {
    labels: Object.keys(ageStats),
    datasets: [
      {
        label: "Độ tuổi khách hàng",
        data: Object.values(ageStats),
        backgroundColor: ["#66bb6a", "#ffca28", "#29b6f6", "#ab47bc", "#ef5350"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  const totalCustomers = Object.values(genderStats).reduce(
    (sum, count) => sum + count,
    0
  );

  return (
    <div style={{ textAlign: "center" }}>
      {error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : Object.keys(genderStats).length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <CircularProgress />
        </div>
      ) : (
        <div className="flex">
          <h3 style={{ marginBottom: "20px" }}>Tổng số khách hàng: {totalCustomers}</h3>

          {/* Gender Statistics */}
          <div style={{ width: "400px", height: "400px", margin: "0 auto" }}>
            <h4>Thống kê giới tính</h4>
            <Pie data={genderData} options={options} />
          </div>

          {/* Age Statistics */}
          <div style={{ width: "400px", height: "400px", margin: "20px auto" }}>
            <h4>Thống kê độ tuổi</h4>
            <Pie data={ageData} options={options} />
          </div>
        </div>
      )}
    </div>
  );
}
