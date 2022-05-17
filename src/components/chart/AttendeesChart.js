import { Box, Card, CardHeader } from '@mui/material';
import merge from 'lodash/merge';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import { BaseOptionChart } from '.';
import { fNumber } from '../../utils/formatNumber';

AttendeesChart.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
};

export default function AttendeesChart({ title, subheader, chartData, ...other }) {
  const chartLabels = chartData.map((i) => i.label);

  const chartSeries = chartData.map((i) => i.value);

  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: () => '',
        },
      },
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '50%', borderRadius: 5 },
    },
    xaxis: {
      categories: chartLabels,
      show: false,
      labels: {
        formatter: (val) => val.toFixed(0),
      },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={[{ data: chartSeries }]} options={chartOptions} height={500} />
      </Box>
    </Card>
  );
}
