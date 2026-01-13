import {
  countries,
  refbrgy,
  refcitymun,
  refprovince,
  refregion,
} from "../assets/address";
import { nationalities } from "../assets/others";

const sortByLabel = (arr) => {
  return arr.sort((a, b) => {
    if (a.label < b.label) return -1;
    if (a.label > b.label) return 1;
    return 0;
  });
};

export const COUNTRYLIST = sortByLabel(
  countries.map(({ countryName }) => ({
    value: countryName,
    label: countryName,
  }))
);

export const refbrgyList = sortByLabel(
  refbrgy.map(({ brgyCode, brgyDesc, ...obj }) => ({
    ...obj,
    value: brgyCode,
    label: brgyDesc,
  }))
);

export const refcitymunList = sortByLabel(
  refcitymun.map(({ citymunCode, citymunDesc, ...obj }) => ({
    ...obj,
    value: citymunCode,
    label: citymunDesc,
  }))
);

export const refprovinceList = sortByLabel(
  refprovince.map(({ provCode, provDesc, ...obj }) => ({
    ...obj,
    value: provCode,
    label: provDesc,
  }))
);

export const refregionList = sortByLabel(
  refregion.map(({ regCode, regDesc, ...obj }) => ({
    ...obj,
    value: regCode,
    label: regDesc,
  }))
);

export const nationalityList = sortByLabel(
  nationalities.map((value) => ({
    value: value,
    label: value,
  }))
);
