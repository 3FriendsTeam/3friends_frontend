import React from "react";
import PropTypes from "prop-types";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

// Chart.js và react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// MUI
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  TextField,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  CircularProgress,
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import {
  ArrowLeft as LeftOutlined,
  ArrowRight as RightOutlined,
} from "@mui/icons-material";
import axios from "axios";

// date-fns
import {
  format,
  subDays,
  addDays,
  subWeeks,
  addWeeks,
  subMonths,
  addMonths,
  subYears,
  addYears,
} from "date-fns";

// Component Demo
import GenderAndAgeStatisticsChart from "./ChartReport";

// Đăng ký các component của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Các period khả dụng và dạng hiển thị
const periodOptions = {
  date:  { dataKey: "date",  label: "Ngày",  views: ["year", "month", "day"] },
  week:  { dataKey: "week",  label: "Tuần",  views: ["year", "month", "day"] },
  month: { dataKey: "month", label: "Tháng", views: ["year", "month"] },
  year:  { dataKey: "year",  label: "Năm",   views: ["year"] },
};

// **Hàm tính startDate, endDate mặc định** khi thay đổi period.
function getDefaultDatesForPeriod(period) {
  const now = new Date();
  let start, end;

  switch (period) {
    case "date": {
      // Mặc định lấy ngày hiện tại
      start = now;
      end = now;
      break;
    }
    case "week": {
      // Lấy thứ 2 đầu tuần (theo quy ước: Monday-based)
      const dayOfWeek = now.getDay(); // 0=Chủ Nhật, 1=Thứ Hai, ...
      // Ta coi “thứ 2 đầu tuần” = now - (dayOfWeek - 1)
      // Trường hợp dayOfWeek=0 (Chủ Nhật), weekStart = now - (-1) => +1 ngày => Thứ Hai liền sau
      // Tuỳ yêu cầu mà bạn adjust logic (hoặc coi Thứ Hai trong tuần contain now)
      const weekStart = subDays(now, dayOfWeek === 0 ? 6 : dayOfWeek - 1);
      const weekEnd = addDays(weekStart, 6);
      start = weekStart;
      end = weekEnd;
      break;
    }
    case "month": {
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      start = firstDay;
      end = lastDay;
      break;
    }
    case "year": {
      const firstDay = new Date(now.getFullYear(), 0, 1);
      const lastDay = new Date(now.getFullYear(), 11, 31);
      start = firstDay;
      end = lastDay;
      break;
    }
    default: {
      start = now;
      end = now;
      break;
    }
  }

  return { start, end };
}

// PeriodSelector component
function PeriodSelector({ period, setPeriod }) {
  const handlePeriodChange = (event, newPeriod) => {
    if (newPeriod !== null && newPeriod !== period) {
      setPeriod(newPeriod);
    }
  };

  return (
    <ToggleButtonGroup
      value={period}
      exclusive
      onChange={handlePeriodChange}
      aria-label="Period"
      sx={{ marginTop: 2 }}
      color="primary"
      fullWidth
    >
      <ToggleButton value="date">Ngày</ToggleButton>
      <ToggleButton value="week">Tuần</ToggleButton>
      <ToggleButton value="month">Tháng</ToggleButton>
      <ToggleButton value="year">Năm</ToggleButton>
    </ToggleButtonGroup>
  );
}
PeriodSelector.propTypes = {
  period: PropTypes.string.isRequired,
  setPeriod: PropTypes.func.isRequired,
};

export default function RevenueChart() {
  // State
  const [period, setPeriod] = React.useState("week");
  const [dateStart, setDateStart] = React.useState(new Date());
  const [dateEnd, setDateEnd] = React.useState(new Date());

  const [data, setData] = React.useState([]);
  const [totalAmount, setTotalAmount] = React.useState(0);

  const [xAxisDataKey, setXAxisDataKey] = React.useState("week");
  const [xAxisLabel, setXAxisLabel] = React.useState("Tuần");

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // Helper: format date theo period
  const formatDateForPeriod = (date, prd) => {
    if (!date) return "";
    switch (prd) {
      case "year":  return format(date, "yyyy");
      case "month": return format(date, "yyyy-MM");
      case "date":
      case "week":
      default:
        return format(date, "yyyy-MM-dd");
    }
  };

  // Khi period thay đổi => set lại ngày mặc định
  React.useEffect(() => {
    const { start, end } = getDefaultDatesForPeriod(period);
    setDateStart(start);
    setDateEnd(end);

    // Cập nhật xAxis
    const { dataKey, label } = periodOptions[period];
    setXAxisDataKey(dataKey);
    setXAxisLabel(label);
  }, [period]);

  // Fetch data mỗi khi period/dateStart/dateEnd thay đổi
  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period, dateStart, dateEnd]);

  // Hàm fetch
  const fetchData = async () => {
    if (!dateStart || !dateEnd) return;

    // Nếu logic yêu cầu: không cho phép dateStart > dateEnd
    if (dateStart > dateEnd) {
      setError("Ngày bắt đầu không được sau ngày kết thúc.");
      setData([]);
      setTotalAmount(0);
      return;
    }
    setError(null);
    setLoading(true);

    try {
      // Endpoint theo period
      let endpoint;
      switch (period) {
        case "date":
          endpoint = `${import.meta.env.VITE_BACKEND_URL}/api/revenue-by-date`;
          break;
        case "week":
          endpoint = `${import.meta.env.VITE_BACKEND_URL}/api/revenue-by-week`;
          break;
        case "month":
          endpoint = `${import.meta.env.VITE_BACKEND_URL}/api/revenue-by-month`;
          break;
        case "year":
          endpoint = `${import.meta.env.VITE_BACKEND_URL}/api/revenue-by-year`;
          break;
        default:
          endpoint = `${import.meta.env.VITE_BACKEND_URL}/api/revenue`;
          break;
      }

      const response = await axios.get(endpoint, {
        params: {
          startDate: formatDateForPeriod(dateStart, period),
          endDate: formatDateForPeriod(dateEnd, period),
        },
      });

      const resData = response.data;
      setData(resData.orders || []);
      setTotalAmount(resData.totalAmount || 0);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(
        err.response?.data?.message || "Đã xảy ra lỗi khi tải dữ liệu."
      );
    } finally {
      setLoading(false);
    }
  };

  // Logic nút chuyển kỳ (previous / next)
  const handlePreviousPeriod = () => {
    switch (period) {
      case "date":
        setDateStart((prev) => subDays(prev, 1));
        setDateEnd((prev) => subDays(prev, 1));
        break;
      case "week":
        setDateStart((prev) => subWeeks(prev, 1));
        setDateEnd((prev) => subWeeks(prev, 1));
        break;
      case "month":
        setDateStart((prev) => subMonths(prev, 1));
        setDateEnd((prev) => subMonths(prev, 1));
        break;
      case "year":
        setDateStart((prev) => subYears(prev, 1));
        setDateEnd((prev) => subYears(prev, 1));
        break;
      default:
        break;
    }
  };

  const handleNextPeriod = () => {
    const now = new Date();
    // Chỉ cho nhảy tiếp nếu dateEnd vẫn < now (để không vượt quá thời gian hiện tại)
    if (dateEnd >= now) return;

    switch (period) {
      case "date":
        setDateStart((prev) => addDays(prev, 1));
        setDateEnd((prev) => addDays(prev, 1));
        break;
      case "week":
        setDateStart((prev) => addWeeks(prev, 1));
        setDateEnd((prev) => addWeeks(prev, 1));
        break;
      case "month":
        setDateStart((prev) => addMonths(prev, 1));
        setDateEnd((prev) => addMonths(prev, 1));
        break;
      case "year":
        setDateStart((prev) => addYears(prev, 1));
        setDateEnd((prev) => addYears(prev, 1));
        break;
      default:
        break;
    }
  };

  // Export Excel
  const exportToExcel = async () => {
    if (!data || data.length === 0) {
      setError("Không có dữ liệu để xuất Excel.");
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Revenue");

    // Merge tiêu đề
    worksheet.mergeCells("A1", "B1");
    const titleCell = worksheet.getCell("A1");
    titleCell.value = "BÁO CÁO DOANH THU";
    titleCell.font = { bold: true, size: 16, color: { argb: "FF0000" } };
    titleCell.alignment = { horizontal: "center", vertical: "middle" };

    // Ngày xuất báo cáo
    const dateCell = worksheet.getCell("A2");
    dateCell.value = `Ngày xuất báo cáo: ${format(new Date(), "dd/MM/yyyy")}`;
    dateCell.alignment = { horizontal: "left" };

    // Thêm row trống để phân cách
    worksheet.addRow([]);

    // Tạo header
    const columnHeaders = Object.keys(data[0] || {});
    const headerRow = worksheet.addRow(columnHeaders);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFF" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "0070C0" },
      };
      cell.alignment = { horizontal: "center" };
    });

    // Thêm data rows
    data.forEach((item) => {
      const rowValues = columnHeaders.map((key) => item[key]);
      const row = worksheet.addRow(rowValues);
      row.eachCell((cell) => {
        cell.alignment = { horizontal: "center" };
      });
    });

    // Xuất file Excel
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "RevenueReport.xlsx");
  };

  // Validate: dateStart <= dateEnd (đã check khi fetch)
  const handleDateStartChange = (newValue) => {
    if (newValue > dateEnd) {
      setError("Ngày bắt đầu không được sau ngày kết thúc.");
    } else {
      setDateStart(newValue);
      setError(null);
    }
  };

  const handleDateEndChange = (newValue) => {
    if (newValue < dateStart) {
      setError("Ngày kết thúc không được trước ngày bắt đầu.");
    } else {
      setDateEnd(newValue);
      setError(null);
    }
  };

  // Tạo dữ liệu cho Chart.js
  const chartData = React.useMemo(() => {
    return {
      labels: data.map((item) => item[xAxisDataKey]?.toString() || ""),
      datasets: [
        {
          label: "Doanh thu",
          data: data.map((item) => item.totalRevenue || 0),
          backgroundColor: "#42a5f5", // Màu cột
          borderColor: "#1e88e5",    // Màu viền cột
          borderWidth: 1,
        },
      ],
    };
  }, [data, xAxisDataKey]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: xAxisLabel,
        },
      },
      y: {
        title: {
          display: true,
          text: "Doanh thu (VNĐ)",
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed.y || 0;
            return `Doanh thu: ${new Intl.NumberFormat("vi-VN").format(value)} VNĐ`;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "100%" }}>
      {/* Ví dụ import thêm chart khác: */}
      <GenderAndAgeStatisticsChart />

      {/* Chọn period */}
      <PeriodSelector period={period} setPeriod={setPeriod} />

      {/* Thanh chọn ngày + nút Previous / Next */}
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        style={{ marginTop: 20 }}
      >
        {/* Previous Period Button */}
        <Grid item>
          <IconButton color="primary" onClick={handlePreviousPeriod}>
            <LeftOutlined />
          </IconButton>
        </Grid>

        {/* Start Date Picker */}
        <Grid item>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Ngày bắt đầu"
              value={dateStart}
              onChange={handleDateStartChange}
              views={periodOptions[period].views}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>

        {/* End Date Picker */}
        <Grid item>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Ngày kết thúc"
              value={dateEnd}
              onChange={handleDateEndChange}
              views={periodOptions[period].views}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>

        {/* Next Period Button */}
        <Grid item>
          <IconButton
            color="primary"
            onClick={handleNextPeriod}
            disabled={dateEnd >= new Date()}
          >
            <RightOutlined />
          </IconButton>
        </Grid>
      </Grid>

      {/* Loading / Error / Chart */}
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <CircularProgress />
        </div>
      ) : error ? (
        <div style={{ textAlign: "center", marginTop: "20px", color: "red" }}>
          {error}
        </div>
      ) : (
        <Card sx={{ marginTop: 2 }}>
          <CardContent>
            <Typography variant="h6" align="center" gutterBottom>
              Biểu đồ doanh thu
            </Typography>
            <Typography variant="h6" align="center" gutterBottom>
              Tổng doanh thu:{" "}
              {new Intl.NumberFormat("vi-VN").format(totalAmount)} VNĐ
            </Typography>
            <div className="p-4" style={{ position: "relative", height: 300 }}>
              <Bar data={chartData} options={chartOptions} />
              <Button
                variant="contained"
                color="primary"
                style={{ position: "absolute", top: 16, right: 16 }}
                onClick={exportToExcel}
              >
                Xuất Excel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
