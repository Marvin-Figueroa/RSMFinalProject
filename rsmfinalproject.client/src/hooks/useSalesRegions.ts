import salesRegions from "../data/salesRegions";

export interface Region {
    id: number;
    name: string;
    countryRegionCode: string;
}
const useSalesRegions = () => ({ data: salesRegions, loading: false, error: "" });

export default useSalesRegions;