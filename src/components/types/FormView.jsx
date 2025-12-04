import { Button, Form } from "antd";
import TextArea from "../form/input/TextArea";
import StatusRadio from "../form/radio/StatusRadio";
import ImageUpload from "../form/uploads/ImageUpload";
import SectionCard from "../view/SectionCard";

import {
  CheckSquareOutlined,
  FormOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import DatePicker from "../form/date/DatePicker";
import { Calendar } from "lucide-react";

const FormView = () => {
  const [form] = Form.useForm();

  const onFinished = (values) => {
    console.log(values);
  };

  return (
    <div className="flex flex-col gap-2">
      <Form
        form={form}
        onFinish={onFinished}
        layout="vertical"
        className="flex flex-col gap-4"
      >
        <SectionCard title="Uploads" icon={<PictureOutlined />}>
          <Form.Item name="image" label="Image Upload">
            <ImageUpload />
          </Form.Item>
        </SectionCard>

        <SectionCard title="Radio" icon={<CheckSquareOutlined />}>
          <Form.Item name="status" label="Select Status">
            <StatusRadio />
          </Form.Item>
        </SectionCard>

        <SectionCard title="Inputs" icon={<FormOutlined />}>
          <Form.Item name="textArea" label="Text Area">
            <TextArea />
          </Form.Item>
        </SectionCard>

        <SectionCard title="Dates" icon={<Calendar />}>
          <Form.Item name="date" label="Text Area">
            <DatePicker.DateTime className="w-full" />
          </Form.Item>
        </SectionCard>
      </Form>

      <Button type="primary" onClick={() => form.submit()}>
        Submit
      </Button>
    </div>
  );
};

export default FormView;
