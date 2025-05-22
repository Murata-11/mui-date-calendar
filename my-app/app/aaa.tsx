"use client";

import * as React from "react";
import BasicDateCalendar from "./dateCalendar";
import { IProps } from "./dateCalendar";
import { Dayjs } from "dayjs";
import { Box, Card } from "@mui/material";

const datas: IProps = {
  datas: [
    {
      date: "2025-05-01",
      updated_at: "2023-10-01",
    },
    {
      date: "2025-05-02",
      updated_at: "2023-10-01",
    },
  ],
};

export default function Home() {
  // 月が変わったときのAPI呼び出し例
  const handleMonthChange = async (date: Dayjs) => {
    // ここでAPI呼び出し
    // 例: await fetch(`/api/holidays?month=${date.format('YYYY-MM')}`);
    console.log("月が変わりました:", date.format("YYYY-MM"));
    const start = date.subtract(2, "month");
    const end = date.add(2, "month");
    console.log(
      `2カ月前: ${start.format("YYYY-MM")}, 2カ月後: ${end.format("YYYY-MM")}`
    );
  };

  // 年が変わったときのAPI呼び出し例
  const handleYearChange = async (date: Dayjs) => {
    // ここでAPI呼び出し
    // 例: await fetch(`/api/holidays?year=${date.format('YYYY')}`);
    console.log("年が変わりました:", date.format("YYYY-MM"));
    const start = date.subtract(2, "month");
    const end = date.add(2, "month");
    console.log(
      `2カ月前: ${start.format("YYYY-MM")}, 2カ月後: ${end.format("YYYY-MM")}`
    );
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      width="100vw"
      position="fixed"
      top={0}
      left={0}
      // gap={} // カード間のスペースを追加
    >
      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Card
          sx={{
            width: 550,
            height: 650,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <a>aa</a>
        </Card>
      </Box>
      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Card
          sx={{
            width: 550,
            height: 650,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ transform: "scale(1.5)" }}>
            <BasicDateCalendar
              datas={datas.datas}
              onMonthChange={handleMonthChange}
              onYearChange={handleYearChange}
            />
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
