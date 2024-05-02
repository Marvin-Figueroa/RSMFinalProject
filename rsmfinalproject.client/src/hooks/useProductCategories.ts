import productCategories from "../data/productCategories";

export interface ProductCategory {
    id: number;
    name: string;
}

const useProductCategories = () => ({ data: productCategories, loading: false, error: "" });

export default useProductCategories;