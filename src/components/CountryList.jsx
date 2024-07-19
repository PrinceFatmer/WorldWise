import Spinner from "./Spinner";
import styles from "./CountryList.module.css"
import CountryItem from "./CountryItem";
import Message from "./Message"
import { useCities } from "../contexts/CitiesContext";

export default function CountryList() {
  const {cities, isloading} = useCities();
    if(isloading) return <Spinner/>;
    if(!cities.length) return <Message message={"Add your first city on the list by selecting from map"}/>
    const countries = cities.reduce((arr, city) => {
        // Check if the country of the current city is already included as a key in the accumulator object
        if(!arr.map((el)=>el.country).includes(city.country))
        return [...arr,{country:city.country, emoji:city.emoji, id: city.id}];
       else return arr;
      }, []);
 console.log(countries)
  return (
     
    <ul className={styles.countryList}>
      {countries.map(country=>(<CountryItem  country= {country} key={country.id} />))}
    </ul>
  )
}
