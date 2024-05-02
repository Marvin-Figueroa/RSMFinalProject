import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { BsSearch } from "react-icons/bs"

const SearchBox = () => {
    return (
        <InputGroup maxWidth='450px'>
            <InputLeftElement children={<BsSearch />} />
            <Input borderRadius={5} placeholder="Search by product" variant='filled' />
        </InputGroup>
    )
}

export default SearchBox