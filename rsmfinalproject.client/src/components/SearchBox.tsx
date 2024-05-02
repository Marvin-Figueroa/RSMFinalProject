import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { useRef } from "react"
import { BsSearch } from "react-icons/bs"

interface Props {
    onSearch: (searchText: string) => void;
}

const SearchBox = ({ onSearch }: Props) => {
    const ref = useRef<HTMLInputElement>(null)

    return (
        <form onSubmit={event => {
            event.preventDefault();
            if (ref.current) onSearch(ref.current.value);
        }}>
            <InputGroup>
                <InputLeftElement children={<BsSearch />} />
                <Input ref={ref} borderRadius={5} placeholder="Search by product" variant='filled' />
            </InputGroup>
        </form>
    )
}

export default SearchBox