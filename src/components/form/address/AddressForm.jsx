import { Form, Select } from "antd";
import {
  refbrgyList,
  refcitymunList,
  refprovinceList,
  refregionList,
} from "./constant/dropdowns";
import { ADDRESSTYPES } from "./constant/enums";
import { onChangeAddress } from "./helper/find-address";

const AddressForm = ({ form = null, onFinish = null }) => {
  const [localForm] = Form.useForm();
  const addressForm = form ?? localForm;

  const selectedRegion = Form.useWatch("region", addressForm);
  const selectedProvince = Form.useWatch("province", addressForm);
  const selectedCity = Form.useWatch("city", addressForm);

  const isStandaloneForm = !form;

  const baseSelectProps = {
    allowClear: true,
    showSearch: true,
    size: "large",
    filterOption: (input, option) =>
      (option?.label?.toUpperCase() ?? "").includes(input?.toUpperCase()),
    dropdownStyle: { width: "30%" },
  };

  const filteredProvinces = refprovinceList.filter(
    (province) => province.regCode == selectedRegion
  );

  const filteredCities = refcitymunList.filter(
    (city) => city.provCode == selectedProvince
  );

  const filteredBarangays = refbrgyList.filter(
    (barangay) => barangay.citymunCode == selectedCity
  );

  const handleRegionChange = () => {
    onChangeAddress(addressForm, ADDRESSTYPES.REGION);
  };

  const handleProvinceChange = () => {
    onChangeAddress(addressForm, ADDRESSTYPES.PROVINCE);
  };

  const handleCityChange = () => {
    onChangeAddress(addressForm, ADDRESSTYPES.CITY);
  };

  const formFields = (
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
          onChange={handleRegionChange}
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
          onChange={handleProvinceChange}
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
          onChange={handleCityChange}
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

  return isStandaloneForm ? (
    <Form
      form={addressForm}
      onFinish={onFinish}
      layout="vertical"
      className="flex flex-col gap-4"
    >
      {formFields}
    </Form>
  ) : (
    formFields
  );
};

export default AddressForm;
