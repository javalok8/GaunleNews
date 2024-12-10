import newsCountryList from "../news/constants/CountryList";
import { useCallback, useState } from "react";

export const useNewsCountries = () => {
  const [countries, setCountries] = useState(newsCountryList);

  const toggleNewsCountry = useCallback((id) => {
    setCountries((prev) => {
      return prev.map((item, index) => {
        return index === id ? { ...item, selected: !item.selected } : item;
      });
    });
  }, []);

  return { countries, toggleNewsCountry };
};
