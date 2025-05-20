// import { useEffect, useState } from 'react'
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
// import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { Badge, Box, Typography, CircularProgress } from '@mui/material'
// import dayjs, { Dayjs } from 'dayjs'

// type Holiday = {
//   id: string
//   date: string
//   name: string
// }

// export default function HolidayCalendar() {
//   const [holidays, setHolidays] = useState<Holiday[]>([])
//   const [loading, setLoading] = useState(true)

//   // APIから休日取得
//   useEffect(() => {
//     fetch('/api/holidays')
//       .then(res => res.json())
//       .then(data => {
//         setHolidays(data)
//         setLoading(false)
//       })
//   }, [])

//   // 休日判定
//   const isHoliday = (date: Dayjs) =>
//     holidays.some(h => dayjs(h.date).isSame(date, 'day'))

//   // 休日追加・削除API呼び出し
//   const toggleHoliday = async (date: Dayjs) => {
//     const dateStr = date.format('YYYY-MM-DD')
//     if (isHoliday(date)) {
//       // 削除
//       await fetch('/api/holidays', {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ date: dateStr }),
//       })
//       setHolidays(holidays.filter(h => h.date !== dateStr))
//     } else {
//       // 追加
//       const res = await fetch('/api/holidays', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ date: dateStr }),
//       })
//       const newHoliday = await res.json()
//       setHolidays([...holidays, newHoliday])
//     }
//   }

//   // カスタムDayコンポーネント
//   function CustomDay(props: PickersDayProps) {
//     const { day, ...other } = props
//     const holiday = isHoliday(day)

//     return (
//       <Badge
//         key={day.toString()}
//         overlap="circular"
//         color={holiday ? 'error' : 'default'}
//         variant={holiday ? 'dot' : 'standard'}
//       >
//         <PickersDay {...other} day={day} />
//       </Badge>
//     )
//   }

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
//         <CircularProgress />
//       </Box>
//     )
//   }

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Box sx={{ p: 4, maxWidth: 400, mx: 'auto' }}>
//         <Typography variant="h5" gutterBottom>
//           📅 休日カレンダー (API連携モック)
//         </Typography>
//         <DateCalendar onChange={toggleHoliday} slots={{ day: CustomDay }} />
//         <Typography variant="body2" mt={2}>
//           日付クリックで <b>追加・削除</b> できます。
//         </Typography>
//       </Box>
//     </LocalizationProvider>
//   )
// }
