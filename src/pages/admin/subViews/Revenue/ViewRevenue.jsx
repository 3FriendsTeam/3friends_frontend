// Import necessary libraries
import * as React from 'react';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import PropTypes from 'prop-types';
import * as XLSX from 'xlsx';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

// PeriodSelector component
function PeriodSelector({ period, setPeriod }) {
  return (
    <div>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Button
          variant={period === 'date' ? 'contained' : 'outlined'}
          onClick={() => setPeriod('date')}
        >
          Ngày
        </Button>
        <Button
          variant={period === 'week' ? 'contained' : 'outlined'}
          onClick={() => setPeriod('week')}
        >
          Tuần
        </Button>
        <Button
          variant={period === 'month' ? 'contained' : 'outlined'}
          onClick={() => setPeriod('month')}
        >
          Tháng
        </Button>
        <Button
          variant={period === 'year' ? 'contained' : 'outlined'}
          onClick={() => setPeriod('year')}
        >
          Năm
        </Button>
      </Stack>
    </div>
  );
}
PeriodSelector.propTypes = {
  period: PropTypes.string.isRequired,
  setPeriod: PropTypes.func.isRequired,
};

// Chart settings
const chartSetting = {
  yAxis: [
    {
      label: 'Doanh thu (VNĐ)',
    },
  ],
  series: [{ dataKey: 'totalRevenue', label: 'Doanh thu' }],
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

export default function RevenueChart() {
  // State variables
  const [period, setPeriod] = React.useState('week');
  const [dateStart, setDateStart] = React.useState(new Date());
  const [dateEnd, setDateEnd] = React.useState(new Date());
  const [data, setData] = React.useState([]);
  const [xAxisDataKey, setXAxisDataKey] = React.useState('date');
  const [xAxisLabel, setXAxisLabel] = React.useState('Ngày');

  // Function to fetch data from the backend
  const fetchData = async () => {
    try {
      // Determine the endpoint based on period
      let endpoint;
      switch (period) {
        case 'date':
          endpoint = `${import.meta.env.VITE_BACKEND_URL}/api/revenue-by-date`;
          break;
        case 'week':
          endpoint = `${import.meta.env.VITE_BACKEND_URL}/api/revenue-by-week`;
          break;
        case 'month':
          endpoint = `${import.meta.env.VITE_BACKEND_URL}/api/revenue-by-month`;
          break;
        case 'year':
          endpoint = `${import.meta.env.VITE_BACKEND_URL}/api/revenue-by-year`;
          break;
        default:
          endpoint = `${import.meta.env.VITE_BACKEND_URL}/api/custom-range-revenue`;
      }

      const response = await axios.get(endpoint, {
        params: {
          startDate: dateStart.toISOString().split('T')[0],
          endDate: dateEnd.toISOString().split('T')[0],
        },
      });

      // Process data if necessary
      setData(response.data.orders);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  // useEffect to fetch data whenever period or dates change
  React.useEffect(() => {
    // Update xAxisDataKey and xAxisLabel based on period
    if (period === 'date') {
      setXAxisDataKey('date');
      setXAxisLabel('Ngày');
    } else if (period === 'week') {
      setXAxisDataKey('week');
      setXAxisLabel('Tuần');
    } else if (period === 'month') {
      setXAxisDataKey('month');
      setXAxisLabel('Tháng');
    } else if (period === 'year') {
      setXAxisDataKey('year');
      setXAxisLabel('Năm');
    }

    fetchData();
  }, [period, dateStart, dateEnd]);

  // Function to export data to Excel
  const exportToExcel = () => {
    const exportData = data.map((item) => {
      return {
        [xAxisLabel]: item[xAxisDataKey],
        'Doanh thu': item.totalRevenue,
      };
    });
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Revenue');
    XLSX.writeFile(workbook, 'RevenueReport.xlsx');
  };

  // Render the component
  return (
    <div style={{ width: '100%' }}>
      <PeriodSelector period={period} setPeriod={setPeriod} />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
          <DatePicker
            label="Ngày bắt đầu"
            views={
              period === 'year'
                ? ['year']
                : period === 'month'
                ? ['year', 'month']
                : ['year', 'month', 'day']
            }
            value={dateStart}
            onChange={(newValue) => setDateStart(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="Ngày kết thúc"
            views={
              period === 'year'
                ? ['year']
                : period === 'month'
                ? ['year', 'month']
                : ['year', 'month', 'day']
            }
            value={dateEnd}
            onChange={(newValue) => setDateEnd(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
      <div style={{ position: 'relative', marginTop: '20px' }}>
        <BarChart
          dataset={data}
          xAxis={[
            {
              scaleType: 'band',
              dataKey: xAxisDataKey,
              label: xAxisLabel,
              tickPlacement: 'middle',
              tickLabelPlacement: 'middle',
            },
          ]}
          {...chartSetting}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ position: 'absolute', top: 0, right: 0 }}
          onClick={exportToExcel}
        >
          Xuất Excel
        </Button>
      </div>
    </div>
  );
}
