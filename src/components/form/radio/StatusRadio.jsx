import { Radio } from "antd";

const StatusRadio = ({
  value,
  onChange,
  options = [
    { value: 0, label: "ACTIVE", activeBg: "#dcf7c5", activeColor: "#399e0c" },
    { value: 1, label: "DELETED", activeBg: "#fed1cf", activeColor: "#ce1323" },
  ],
}) => {
  return (
    <Radio.Group
      buttonStyle="solid"
      className="flex w-full"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ width: "100%" }}
    >
      {options.map((opt) => {
        const isActive = value === opt.value;
        return (
          <Radio.Button
            key={opt.value}
            value={opt.value}
            style={{
              width: `${100 / options.length}%`,
              backgroundColor: isActive ? opt.activeBg : "#e5e7eb",
              color: isActive ? opt.activeColor : "#000",
              border: "none",
            }}
          >
            {opt.label}
          </Radio.Button>
        );
      })}
    </Radio.Group>
  );
};

export default StatusRadio;
