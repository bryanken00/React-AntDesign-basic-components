import { Input } from "antd";

const { TextArea: ANTTextArea } = Input;

const TextArea = ({ height = 100, autoResize = false, style, ...rest }) => {
  return (
    <ANTTextArea
      {...rest}
      autoSize={autoResize ? { minRows: Math.ceil(height / 24) } : false}
      style={{
        width: "100%",
        minHeight: height,
        resize: autoResize ? "none" : "vertical",
        ...style,
      }}
    />
  );
};

export default TextArea;
