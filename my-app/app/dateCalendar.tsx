// components/HolidayCalendarMock.tsx
import { useState } from 'react'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import {PickersDay, PickersDayProps} from '@mui/x-date-pickers/PickersDay'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Badge, Box, Typography } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import isSameDay from 'dayjs'
import { v4 as uuidv4 } from 'uuid'

dayjs.extend(isSameDay)

type Holiday = {
  id: string
  date: string // 'YYYY-MM-DD'
  name: string
}

export default function BasicDateCalendar() {
  const [holidays, setHolidays] = useState<Holiday[]>([
    {
      id: uuidv4(),
      date: dayjs().format('YYYY-MM-DD'),
      name: '今日（モック）',
    },
  ])

  const isHoliday = (date: Dayjs) =>
    holidays.find(h => dayjs(h.date).isSame(date, 'day'))

    const toggleHoliday = (date: Dayjs | null) => {
    if (!date) return // nullチェック

    const existing = isHoliday(date)
    if (existing) {
        // 削除
        setHolidays(holidays.filter(h => h.id !== existing.id))
    } else {
        // 追加
        setHolidays([
        ...holidays,
        {
            id: uuidv4(),
            date: date.format('YYYY-MM-DD'),
            name: '休日（モック）',
        },
        ])
    }
    console.log(holidays)
    }

  function CustomDay(props: PickersDayProps) {
    const { day, ...other } = props
    const holiday = isHoliday(day)

    return (
      <Badge
        key={day.toString()}
        overlap="circular"
        color={holiday ? 'error' : 'default'}
        variant={holiday ? 'dot' : 'standard'}
      >
        <PickersDay {...other} day={day} />
      </Badge>
    )
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 4, maxWidth: 400, margin: 'auto' }}>
        <Typography variant="h5" gutterBottom>📅 モック休日カレンダー</Typography>
        <DateCalendar
          onChange={toggleHoliday}
          slots={{ day: CustomDay }}
        />
        <Typography variant="body2" mt={2}>
          日付をクリックで <b>追加・削除</b>（モックデータ）します。
        </Typography>
      </Box>
    </LocalizationProvider>
  )
}
