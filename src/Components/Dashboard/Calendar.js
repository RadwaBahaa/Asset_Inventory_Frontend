// import React, { useState, useEffect } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Typography } from '@mui/material';
// import { getWeek, startOfWeek, format } from 'date-fns';

// const events = [
//   { date: new Date(2015, 10, 16), title: 'VAT MEETING', priority: 'High', department: 'CARDIOLOGY' },
//   { date: new Date(2015, 10, 16), title: 'BUSINESS REVIEW', priority: 'Medium', department: 'CARDIOLOGY' },
//   { date: new Date(2015, 10, 16), title: 'REQUEST', priority: '', department: 'CARDIOLOGY' },
//   { date: new Date(2015, 10, 16), title: 'REQUEST', priority: '', department: 'CARDIOLOGY' },
//   { date: new Date(2015, 10, 16), title: 'REQUEST', priority: 'Low', department: 'CAPITAL' },
// ];

// const Calendar = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   useEffect(() => {
//     setSelectedDate(startOfWeek(selectedDate));
//   }, []);

//   const handleClickDate = (date) => {
//     setSelectedDate(date);
//   };

//   const getWeekEvents = (weekStart) => {
//     return events.filter((event) => getWeek(event.date) === getWeek(weekStart));
//   };

//   const renderWeek = () => {
//     const weekStart = startOfWeek(selectedDate);
//     const days = Array.from({ length: 7 }, (_, i) => new Date(weekStart.getTime() + i * 24 * 60 * 60 * 1000));

//     return (
//       <TableHead>
//         <TableRow>
//           <TableCell>Sun</TableCell>
//           <TableCell>Mon</TableCell>
//           <TableCell>Tue</TableCell>
//           <TableCell>Wed</TableCell>
//           <TableCell>Thu</TableCell>
//           <TableCell>Fri</TableCell>
//           <TableCell>Sat</TableCell>
//         </TableRow>
//         <TableRow>
//           {days.map((date) => (
//             <TableCell key={date.toString()} onClick={() => handleClickDate(date)}>
//               {date.getDate()}
//             </TableCell>
//           ))}
//         </TableRow>
//       </TableHead>
//     );
//   };

//   const renderEvents = () => {
//     const weekEvents = getWeekEvents(selectedDate);

//     return (
//       <TableBody>
//         {weekEvents.map((event) => (
//           <TableRow key={event.title}>
//             <TableCell>{format(event.date, 'yyyy-MM-dd')}</TableCell>
//             <TableCell>{event.title}</TableCell>
//             <TableCell>{event.priority}</TableCell>
//             <TableCell>{event.department}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     );
//   };

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Typography variant="h5" gutterBottom>
//         Activity Calendar
//       </Typography>
//       <TableContainer>
//         <Table>
//           {renderWeek()}
//           <TableBody>
//             <TableRow>
//               <TableCell colSpan={7}>This Week</TableCell>
//             </TableRow>
//           </TableBody>
//           {renderEvents()}
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default Calendar;
