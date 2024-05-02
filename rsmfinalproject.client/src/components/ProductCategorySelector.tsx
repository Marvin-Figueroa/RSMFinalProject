import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { BsChevronDown } from "react-icons/bs"
import useProductCategories, { ProductCategory } from "../hooks/useProductCategories"

interface Props {
    onSelectProductCategory: (category: ProductCategory) => void;
}

const ProductCategorySelector = ({ onSelectProductCategory }: Props) => {
    const { data } = useProductCategories();

    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<BsChevronDown />}>Product Category</MenuButton>
            <MenuList>
                {data.map(category => <MenuItem onClick={() => onSelectProductCategory(category)} key={category.id}>{category.name}</MenuItem>)}
            </MenuList>
        </Menu>
    )
}

export default ProductCategorySelector