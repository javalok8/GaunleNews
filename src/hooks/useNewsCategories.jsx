import newsCategoryList from "../news/constants/Categories";
import { useCallback, useState } from "react";

export const useNewsCategories = () => {
  const [categories, setCategories] = useState(newsCategoryList);

  const toggleNewsCategory = useCallback((id) => {
    setCategories((prev) => {
      return prev.map((item) => {
        return item.id === id ? { ...item, selected: !item.selected } : item;
      });
    });
  }, []);

  return { categories, toggleNewsCategory };
};
