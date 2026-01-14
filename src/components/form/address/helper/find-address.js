import { ADDRESSTYPES } from "../constant/enums";

export const onChangeAddress = (form, type) => {
  switch (type) {
    case ADDRESSTYPES.REGION:
      form?.setFieldsValue({
        province: null,
        city: null,
        brgy: null,
      });
      break;
    case ADDRESSTYPES.PROVINCE:
      form?.setFieldsValue({
        city: null,
        brgy: null,
      });
      break;
    case ADDRESSTYPES.CITY:
      form?.setFieldsValue({
        brgy: null,
      });
      break;
    default:
      break;
  }
};
