import { useSearchParams } from "react-router-dom";
export  function useUrlPosition() {
    const [searchparam, setSearchparam] = useSearchParams();
    const lat = parseFloat(searchparam.get("lat")); // Parse maplat as float
    const lng = parseFloat(searchparam.get("lng")); // Parse maplng as float
  return [lat, lng];
}
