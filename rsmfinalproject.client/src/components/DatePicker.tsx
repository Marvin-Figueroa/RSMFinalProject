import { Box, Text } from "@chakra-ui/react";

interface Props {
    labelText: string;
    onSelectDate: (date: string) => void;
    minDate: string;
    maxDate: string;
}

const DatePicker = ({ labelText, onSelectDate, minDate, maxDate }: Props) => {

    return (
        <Box gap='5px' display='flex' alignItems='center'>
            <Text as='b' color='yellowgreen'>{labelText}:</Text>
            <input
                onKeyDown={(e) => e.preventDefault()}
                onChange={(e) => {
                    if (!e.target.value) return
                    onSelectDate(e.target.value)
                }}
                type="date"
                min={minDate}
                max={maxDate}
            />
        </Box>
    );
}

export default DatePicker;