import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { useRef } from "react"
import { BsSearch } from "react-icons/bs"

interface Props {
    onSearch: (searchText: string) => void;
    placeholderText?: string;
    disabled: boolean;
}

const SearchBox = ({ onSearch, placeholderText, disabled }: Props) => {
    const ref = useRef<HTMLInputElement>(null)

    return (
        <form onSubmit={event => {
            event.preventDefault();
            if (ref.current) onSearch(ref.current.value.trim());
        }}>
            <InputGroup>
                <InputLeftElement children={<BsSearch />} />
                <Input disabled={disabled} ref={ref} borderRadius={5} placeholder={placeholderText ? `Search ${placeholderText}` : 'Search'} variant='filled' />
            </InputGroup>
        </form>
    )
}

export default SearchBox