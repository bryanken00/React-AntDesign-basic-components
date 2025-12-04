import { Card, Typography } from "antd";

const { Title } = Typography;

const SectionCard = ({
  title,
  icon,
  extra,
  children,
  className = "",
  titleLevel = 4,
  padding = 20,
  divider = true,
  ...rest
}) => {
  return (
    <Card
      className={`mb-6 shadow-sm border-0 ${className}`}
      styles={{
        body: { padding },
      }}
      {...rest}
    >
      <div
        className={`flex items-center justify-between mb-4 pb-2 ${
          divider ? "border-b border-gray-100" : ""
        }`}
      >
        <div className="flex items-center">
          {icon && <div className="mr-2 text-blue-600">{icon}</div>}
          <Title level={titleLevel} className="m-0 text-gray-800">
            {title}
          </Title>
        </div>

        {/* Optional extra (buttons, switch, etc.) */}
        {extra && <div>{extra}</div>}
      </div>

      {children}
    </Card>
  );
};

export default SectionCard;
