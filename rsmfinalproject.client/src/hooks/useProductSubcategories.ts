import productSubcategories from "../data/productSubcategories";

export interface ProductSubcategory {
    productSubcategoryId: number;
    productCategoryId: number;
    name: string;
}

const useProductSubcategories = () => ({ data: productSubcategories, loading: false, error: "" });

export default useProductSubcategories;