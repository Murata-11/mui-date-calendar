// components/HolidayCalendarMock.tsx
import { useState } from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Badge, Box, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import isSameDay from "dayjs";
// 日本語ロケールをインポート
import "dayjs/locale/ja";

// 日本語ロケールを設定
dayjs.locale("ja");

dayjs.extend(isSameDay);

export type IProps = {
  datas: Datas[];
  onMonthChange?: (date: Dayjs) => void;
  onYearChange?: (date: Dayjs) => void;
  onChangeCeate?: (date: Dayjs) => void;
  onChangeDelete?: (date: Dayjs) => void;
};
type Datas = {
  date: string; // 'YYYY-MM-DD'
  updated_at: string; // 'YYYY-MM-DD'
};

export default function BasicDateCalendar(props: IProps) {
  const [datas, setDatas] = useState<Datas[]>(props.datas ?? []);

  const isHoliday = (date: Dayjs) =>
    datas.find((h) => dayjs(h.date).isSame(date, "day"));

  const toggleHoliday = (date: Dayjs | null) => {
    if (!date) return; // nullチェック

    const existing = isHoliday(date);
    if (existing) {
      // 削除
      if (props.onChangeDelete) props.onChangeDelete(date);
      setDatas(datas.filter((h) => h.date !== existing.date));
    } else {
      // 追加
      if (props.onChangeCeate) props.onChangeCeate(date);
      setDatas([
        ...datas,
        {
          date: date.format("YYYY-MM-DD"),
          updated_at: dayjs().format("YYYY-MM-DD"),
        },
      ]);
    }
    console.log(datas);
  };

  // 月が変わったときのAPI呼び出し例
  const handleMonthChange = (date: Dayjs) => {
    if (props.onMonthChange) props.onMonthChange(date);
  };

  // 年が変わったときのAPI呼び出し例
  const handleYearChange = (date: Dayjs) => {
    if (props.onYearChange) props.onYearChange(date);
  };

  function CustomDay(props: PickersDayProps) {
    const { day, outsideCurrentMonth, ...other } = props;
    const holiday = isHoliday(day);

    // // 前後月の日付には印を付けない
    // if (outsideCurrentMonth) {
    //   return <PickersDay {...props} />;
    // }

    return (
      <Badge
        key={day.toString()}
        overlap="circular"
        color={holiday ? "error" : "default"}
        variant={holiday ? "dot" : "standard"}
      >
        {/* <PickersDay {...props} {...other} day={day} /> */}
        <PickersDay {...props} day={day} />
      </Badge>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
      <Box sx={{ p: 4, maxWidth: 500, margin: "auto" }}>
        <DateCalendar
          onChange={toggleHoliday}
          slots={{ day: CustomDay }}
          onMonthChange={handleMonthChange}
          onYearChange={handleYearChange}
          shouldDisableDate={(date) => date.isBefore(dayjs(), "day")}
          showDaysOutsideCurrentMonth
        />
      </Box>
    </LocalizationProvider>
  );
}
