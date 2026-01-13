import {
  countries,
  refbrgy,
  refcitymun,
  refprovince,
  refregion,
} from "../assets/address";
import { ADDRESSTYPES } from "../constant/enums";

export const findCountryById = (id) => {
  return countries.filter(({ countryCode }) => countryCode === id)?.[0]
    ?.countryName;
};

export const findBrgyById = (id) => {
  return refbrgy.filter(({ brgyCode }) => brgyCode === id)?.[0]?.brgyDesc;
};

export const findMunicipalById = (id) => {
  return refcitymun.filter(({ citymunCode }) => citymunCode === id)?.[0]
    ?.citymunDesc;
};

export const findProvinceById = (id) => {
  return refprovince.filter(({ provCode }) => provCode === id)?.[0]?.provDesc;
};

export const findRegionById = (id) => {
  return refregion.filter(({ regCode }) => regCode === id)?.[0]?.regDesc;
};

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
