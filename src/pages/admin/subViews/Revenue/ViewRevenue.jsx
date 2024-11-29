// Import necessary libraries
import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import PropTypes from "prop-types";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
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

// Define period options for cleaner code
const periodOptions = {
  date: { dataKey: "date", label: "Ngày", views: ["year", "month", "day"] },
  week: { dataKey: "week", label: "Tuần", views: ["year", "month", "day"] },
  month: { dataKey: "month", label: "Tháng", views: ["year", "month"] },
  year: { dataKey: "year", label: "Năm", views: ["year"] },
};

// PeriodSelector component using ToggleButtonGroup for better UI
function PeriodSelector({ period, setPeriod }) {
  const handlePeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
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

// Chart settings with improved styling
const chartSetting = {
  series: [{ dataKey: "totalRevenue", label: "Doanh thu" }],
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: "translateX(-10px)",
    },
  },
};

export default function RevenueChart() {
  // State variables
  const [totalAmount, setTotalAmount] = React.useState(0);
  const [period, setPeriod] = React.useState("week");
  const [dateStart, setDateStart] = React.useState(new Date());
  const [dateEnd, setDateEnd] = React.useState(new Date());
  const [data, setData] = React.useState([]);
  const [xAxisDataKey, setXAxisDataKey] = React.useState("date");
  const [xAxisLabel, setXAxisLabel] = React.useState("Ngày");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // Helper function to format dates based on period
  const formatDateForPeriod = (date, period) => {
    switch (period) {
      case "year":
        return format(date, "yyyy");
      case "month":
        return format(date, "yyyy-MM");
      case "date":
      case "week":
      default:
        return format(date, "yyyy-MM-dd");
    }
  };

  // Function to fetch data from the backend with error handling
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Determine the endpoint based on period
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
      }

      const response = await axios.get(endpoint, {
        params: {
          startDate: formatDateForPeriod(dateStart, period),
          endDate: formatDateForPeriod(dateEnd, period),
        },
      });

      // Process data if necessary
      setData(response.data.orders || response.data);
      setTotalAmount(response.data.totalAmount);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(
        error.response?.data?.message || "Đã xảy ra lỗi khi tải dữ liệu."
      );
    } finally {
      setLoading(false);
    }
  };

  // Update xAxis settings and fetch data when period or dates change
  React.useEffect(() => {
    const { dataKey, label } = periodOptions[period];
    setXAxisDataKey(dataKey);
    setXAxisLabel(label);

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period, dateStart, dateEnd]);

  // Adjust dateStart and dateEnd when period changes
  React.useEffect(() => {
    const now = new Date();
    switch (period) {
      case "date":
        setDateStart(now);
        setDateEnd(now);
        break;
      case "week": {
        const weekStart = subDays(now, now.getDay() - 1);
        const weekEnd = addDays(weekStart, 6);
        setDateStart(weekStart);
        setDateEnd(weekEnd);
        break;
      }
      case "month": {
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDayOfMonth = new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          0
        );
        setDateStart(firstDayOfMonth);
        setDateEnd(lastDayOfMonth);
        break;
      }
      case "year": {
        const firstDayOfYear = new Date(now.getFullYear(), 0, 1);
        const lastDayOfYear = new Date(now.getFullYear(), 11, 31);
        setDateStart(firstDayOfYear);
        setDateEnd(lastDayOfYear);
        break;
      }
      default:
        break;
    }
  }, [period]);

  // Function to adjust the date range to the previous period
  const handlePreviousPeriod = () => {
    switch (period) {
      case "date":
        setDateStart(subDays(dateStart, 1));
        setDateEnd(subDays(dateEnd, 1));
        break;
      case "week":
        setDateStart(subWeeks(dateStart, 1));
        setDateEnd(subWeeks(dateEnd, 1));
        break;
      case "month":
        setDateStart(subMonths(dateStart, 1));
        setDateEnd(subMonths(dateEnd, 1));
        break;
      case "year":
        setDateStart(subYears(dateStart, 1));
        setDateEnd(subYears(dateEnd, 1));
        break;
      default:
        break;
    }
  };

  // Function to adjust the date range to the next period
  const handleNextPeriod = () => {
    const now = new Date();
    switch (period) {
      case "date":
        if (dateEnd < now) {
          setDateStart(addDays(dateStart, 1));
          setDateEnd(addDays(dateEnd, 1));
        }
        break;
      case "week":
        if (dateEnd < now) {
          setDateStart(addWeeks(dateStart, 1));
          setDateEnd(addWeeks(dateEnd, 1));
        }
        break;
      case "month":
        if (dateEnd < now) {
          setDateStart(addMonths(dateStart, 1));
          setDateEnd(addMonths(dateEnd, 1));
        }
        break;
      case "year":
        if (dateEnd < now) {
          setDateStart(addYears(dateStart, 1));
          setDateEnd(addYears(dateEnd, 1));
        }
        break;
      default:
        break;
    }
  };

  // Function to export data to Excel with improved formatting
  const exportToExcel = async () => {
    if (data.length === 0) {
      setError("Không có dữ liệu để xuất.");
      return;
    }
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Revenue");

    // Add main title
    worksheet.mergeCells("A1", "B1");
    const titleCell = worksheet.getCell("A1");
    titleCell.value = "BÁO CÁO DOANH THU";
    titleCell.font = { bold: true, size: 16, color: { argb: "FF0000" } };
    titleCell.alignment = { horizontal: "center", vertical: "middle" };

    // Add report generation date
    const dateCell = worksheet.getCell("A2");
    dateCell.value = `Ngày xuất báo cáo: ${format(new Date(), "dd/MM/yyyy")}`;
    dateCell.alignment = { horizontal: "left" };

    // Add column headers
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

    // Add data rows
    data.forEach((item) => {
      const rowValues = columnHeaders.map((key) => item[key]);
      const row = worksheet.addRow(rowValues);
      row.eachCell((cell) => {
        cell.alignment = { horizontal: "center" };
      });
    });

    // Export Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "RevenueReport.xlsx");
  };

  // Validation to ensure dateStart is not after dateEnd
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

  // Render the component with improved UI
  return (
    <div style={{ width: "100%" }}>
      <PeriodSelector period={period} setPeriod={setPeriod} />
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
              format="dd-MM-yyyy"
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
              format="dd-MM-yyyy"
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
            <div
            className="p-4" style={{ position: "relative" }}>
              <BarChart
                dataset={data}
                xAxis={[
                  {
                    scaleType: "band",
                    dataKey: xAxisDataKey,
                    label: xAxisLabel,
                    tickPlacement: "middle",
                    tickLabelPlacement: "middle",
                  },
                ]}
                {...chartSetting}
                margin={{ left: 78 }}
              />
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
