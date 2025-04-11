import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from './components/ThemeContext';
import ThemeWrapper from './components/ThemeWrapper';
import ThemeToggle from './components/ThemeToggle';
import { DOB_All } from './use-cases/DOB.jsx';
import { StartEnd_All } from './use-cases/StartEndDates.jsx';
import { Time_1 } from './use-cases/Time.jsx';
import { TimeSelect } from './use-cases/TimeSelect.jsx';
import { ThanksPage } from './Thanks.jsx';
import 'react-datepicker/dist/react-datepicker.css';
import App from './App.jsx';
import './App.css';

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <ThemeWrapper>
      <BrowserRouter>
      {/* <HashRouter> */}
        <Routes>
          <Route path="/demos" element={<App />} />
          <Route path="/demos/date-of-birth" element={<DOB_All />} />
          <Route path="/demos/date-range" element={<StartEnd_All />} />
          <Route path="/demos/time-input" element={<Time_1 />} />
          <Route path="/demos/time-select" element={<TimeSelect />} />
          <Route path='/demos/thanks' element={<ThanksPage/>} />
          {/* <Route path="/" element={<App />} />
          <Route path="/date-of-birth" element={<DOB_All />} />
          <Route path="/date-range" element={<StartEnd_All />} />
          <Route path="/time-input" element={<Time_1 />} />
          <Route path="/time-select" element={<TimeSelect />} />
          <Route path='/thanks' element={<ThanksPage/>} /> */}
        </Routes>
      </BrowserRouter>
      {/* </HashRouter> */}
      <ThemeToggle/>
    </ThemeWrapper>
  </ThemeProvider>,
)
