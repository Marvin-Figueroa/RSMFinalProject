import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { BsChevronDown } from "react-icons/bs"
import useProductSubcategories, { ProductSubcategory } from "../hooks/useProductSubcategories";

interface Props {
    onSelectProductSubcategory: (subcategory: ProductSubcategory) => void;
    selectedProductSubcategory: ProductSubcategory | null
}

const ProductSubcategorySelector = ({ onSelectProductSubcategory, selectedProductSubcategory }: Props) => {
    const { data } = useProductSubcategories();

    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<BsChevronDown />}>
                {selectedProductSubcategory?.name || 'Product Subcategory'}
            </MenuButton>
            <MenuList>
                {data.map(subcategory => <MenuItem
                    onClick={() => onSelectProductSubcategory(subcategory)}
                    key={subcategory.productSubcategoryId}>{subcategory.name}</MenuItem>)}
            </MenuList>
        </Menu>
    )
}

export default ProductSubcategorySelector