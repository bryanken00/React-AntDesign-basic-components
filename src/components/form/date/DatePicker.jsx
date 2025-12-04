import React from "react";
import { DatePicker as AntDatePicker, TimePicker as AntTimePicker } from "antd";

const createPicker = (Component, defaultProps = {}) =>
  React.memo(({ className, style, ...props }) => (
    <Component
      {...defaultProps}
      {...props}
      className={`w-full ${className || ""}`}
      style={{ width: "100%", ...style }}
    />
  ));

const DatePicker = {
  Date: createPicker(AntDatePicker, { format: "MM-DD-YYYY" }),
  DateTime: createPicker(AntDatePicker, {
    format: "MM-DD-YYYY HH:mm",
    showTime: true,
  }),
  Month: createPicker(AntDatePicker, { picker: "month" }),
  Year: createPicker(AntDatePicker, { picker: "year" }),
  Week: createPicker(AntDatePicker, { picker: "week" }),
  Range: createPicker(AntDatePicker.RangePicker, { format: "MM-DD-YYYY" }),
  DateTimeRange: createPicker(AntDatePicker.RangePicker, {
    format: "MM-DD-YYYY HH:mm",
    showTime: true,
  }),
  MonthRange: createPicker(AntDatePicker.RangePicker, { picker: "month" }),
  YearRange: createPicker(AntDatePicker.RangePicker, { picker: "year" }),
  Time: createPicker(AntTimePicker),
};

export default DatePicker;
