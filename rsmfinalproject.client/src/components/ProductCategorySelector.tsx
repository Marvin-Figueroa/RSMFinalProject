import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { BsChevronDown } from "react-icons/bs"
import useProductCategories from "../hooks/useProductCategories"

const ProductCategorySelector = () => {
    const { data } = useProductCategories();

    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<BsChevronDown />}>Product Category</MenuButton>
            <MenuList>
                {data.map(category => <MenuItem key={category.id}>{category.name}</MenuItem>)}
            </MenuList>
        </Menu>
    )
}

export default ProductCategorySelector