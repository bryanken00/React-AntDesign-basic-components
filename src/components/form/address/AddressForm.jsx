import { Form, Select } from "antd";
import {
  refbrgyList,
  refcitymunList,
  refprovinceList,
  refregionList,
} from "./constant/dropdowns";
import { ADDRESSTYPES } from "./constant/enums";
import { onChangeAddress } from "./helper/find-address";

const AddressForm = ({ form }) => {
  const selectedRegion = Form.useWatch("region", form);
  const selectedProvince = Form.useWatch("province", form);
  const selectedCity = Form.useWatch("city", form);

  if (!form) {
    return <div className="text-red-500">No form found for address</div>;
  }

  const baseSelectProps = {
    allowClear: true,
    showSearch: true,
    size: "large",
    filterOption: (input, option) =>
      (option?.label?.toUpperCase() ?? "").includes(input?.toUpperCase()),
  };

  const filteredProvinces = refprovinceList.filter(
    (province) => province.regCode === selectedRegion
  );

  const filteredCities = refcitymunList.filter(
    (city) => city.provCode === selectedProvince
  );

  const filteredBarangays = refbrgyList.filter(
    (barangay) => barangay.citymunCode === selectedCity
  );

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Form.Item
        name="region"
        label="Region"
        rules={[{ required: true, message: "Please select region" }]}
      >
        <Select
          {...baseSelectProps}
          placeholder="Select a region"
          options={refregionList}
          onChange={() => onChangeAddress(form, ADDRESSTYPES.REGION)}
        />
      </Form.Item>

      <Form.Item
        name="province"
        label="Province"
        rules={[{ required: true, message: "Please select province" }]}
      >
        <Select
          {...baseSelectProps}
          placeholder="Select a province"
          options={filteredProvinces}
          onChange={() => onChangeAddress(form, ADDRESSTYPES.PROVINCE)}
        />
      </Form.Item>

      <Form.Item
        name="city"
        label="City/Municipality"
        rules={[{ required: true, message: "Please select city" }]}
      >
        <Select
          {...baseSelectProps}
          placeholder="Select a city"
          options={filteredCities}
          onChange={() => onChangeAddress(form, ADDRESSTYPES.CITY)}
        />
      </Form.Item>

      <Form.Item
        name="brgy"
        label="Barangay"
        rules={[{ required: true, message: "Please select barangay" }]}
      >
        <Select
          {...baseSelectProps}
          placeholder="Select a barangay"
          options={filteredBarangays}
        />
      </Form.Item>
    </div>
  );
};

export default AddressForm;
