import Router from './routes';
import ThemeProvider from './theme';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';

export default function App() {
  return (
    <ThemeProvider>
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
  );
}
