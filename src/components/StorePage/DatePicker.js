// import * as React from 'react';
// import dayjs from 'dayjs';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

// export default function ResponsiveDatePickers() {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer
//         components={[
//           'DatePicker',
//           'MobileDatePicker',
//           'DesktopDatePicker',
//           'StaticDatePicker',
//         ]}
//       >
//         {/* <DemoItem label="Desktop variant">
//           <DesktopDatePicker defaultValue={dayjs('2022-04-17')} />
//         </DemoItem>
//         <DemoItem label="Mobile variant">
//           <MobileDatePicker defaultValue={dayjs('2022-04-17')} />
//         </DemoItem>
//         <DemoItem label="Responsive variant">
//           <DatePicker defaultValue={dayjs('2022-04-17')} />
//         </DemoItem> */}
//         <DemoItem label="">
//           <StaticDatePicker defaultValue={dayjs('2022-04-17')} />
//         </DemoItem>
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }

import * as React from 'react';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';

const today = dayjs();
const twoPM = dayjs().set('hour', 14).startOf('hour');
const threePM = dayjs().set('hour', 15).startOf('hour');

export default function ValidationBehaviorView() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid
        container
        columns={{ xs: 1, lg: 2 }}
        spacing={4}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <DateCalendar defaultValue={today} disableFuture />
        </Grid>
        <Grid item>
          <TimeClock defaultValue={today} maxTime={threePM} />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}