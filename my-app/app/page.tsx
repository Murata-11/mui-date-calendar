"use client";

import * as React from "react";
import BasicDateCalendar from "./dateCalendar";
import { IProps } from "./dateCalendar";
import { Dayjs } from "dayjs";
import { Box, Card, Typography, Skeleton } from "@mui/material";
import { useState, useEffect } from "react";

const datas: IProps = {
  datas: [
    {
      date: "2025-04-30",
      updated_at: "2023-10-01",
    },
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
  const handleMonthChange = (date: Dayjs) => {
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
  const handleYearChange = (date: Dayjs) => {
    // ここでAPI呼び出し
    // 例: await fetch(`/api/holidays?year=${date.format('YYYY')}`);
    console.log("年が変わりました:", date.format("YYYY-MM"));
    const start = date.subtract(2, "month");
    const end = date.add(2, "month");
    console.log(
      `2カ月前: ${start.format("YYYY-MM")}, 2カ月後: ${end.format("YYYY-MM")}`
    );
  };

  const handleChangeCeate = (date: Dayjs) => {
    // ここでAPI呼び出し
    // 例: await fetch(`/api/holidays?date=${date.format('YYYY-MM-DD')}`);
    console.log("休日が追加されました:", date.format("YYYY-MM-DD"));
  };

  const handleChangeDelete = (date: Dayjs) => {
    // ここでAPI呼び出し
    // 例: await fetch(`/api/holidays?date=${date.format('YYYY-MM-DD')}`);
    console.log("休日が削除されました:", date.format("YYYY-MM-DD"));
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
        ></Card>
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
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="div" sx={{ mb: 8 }}>
            カレンダー
          </Typography>
          <Box sx={{ transform: "scale(1.3)" }}>
            <BasicDateCalendar
              datas={datas.datas}
              onMonthChange={handleMonthChange}
              onYearChange={handleYearChange}
              onChangeCeate={handleChangeCeate}
              onChangeDelete={handleChangeDelete}
            />
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
