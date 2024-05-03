import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { BsChevronDown } from "react-icons/bs"
import useSalesRegions, { Region } from "../hooks/useSalesRegions";

interface Props {
    onSelectSalesRegion: (region: Region) => void;
    selectedSalesRegion: Region | null;
}

const SalesRegionSelector = ({ onSelectSalesRegion: onSelectSalesRegion, selectedSalesRegion }: Props) => {
    const { data } = useSalesRegions();

    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<BsChevronDown />}>
                {selectedSalesRegion?.name || 'Region'}
            </MenuButton>
            <MenuList>
                {data.map(region => <MenuItem onClick={() => onSelectSalesRegion(region)} key={region.id}>{region.name}</MenuItem>)}
            </MenuList>
        </Menu>
    )
}

export default SalesRegionSelector