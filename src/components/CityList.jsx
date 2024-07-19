import Spinner from "./Spinner";
import styles from "./CityList.module.css"
import CityItem from "./CityItem";
import Message from "./Message"
import { useCities } from "../contexts/CitiesContext";

export default function CityList() {
  const {cities, isloading}= useCities();
    if(isloading) return <Spinner/>;
    if (!cities || !cities.length) return <Message message={"Add your first city on the list by selecting from map"}/>
    
  return (
     
    <ul className={styles.cityList}>
      {cities.map(city=>(<CityItem  city= {city} key={city.id}/>))}
    </ul>
  )
}
 