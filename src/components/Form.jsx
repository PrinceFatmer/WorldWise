// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useNavigate, useSearchParams } from "react-router-dom";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const Base_Url = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [Geocdingerror, setGeocodingerror] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const {createCity, isloading}= useCities();
  const navigate= useNavigate();
  // const{lat, lng}= useUrlPosition();
  const [searchparam, setSearchparam] = useSearchParams();
  const lat = parseFloat(searchparam.get("lat")); // Parse maplat as float
  const lng = parseFloat(searchparam.get("lng")); // Parse maplng as float

  useEffect(
    function () {
      async function getCityData() {
        try {
          setIsLoadingGeocoding(true);
          setGeocodingerror("");
          const res = await fetch(
            `${Base_Url}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          if (!data.countryCode)
            throw new Error("😔 The is no city click somewehere else");
          setCityName(data.city);
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
          // console.log(data);
          // console.log(data.countryCode);
        } catch (err) {
          setGeocodingerror(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      getCityData();
    },
    [lat, lng]
  );
  async function handleSubmit(e)
  {
    e.preventDefault();
    if(!cityName || !date) return;

    const tempCity= {
      cityName,
      country,
      date,
      emoji,
      notes,
      position: {lat, lng}
    }
    await createCity(tempCity);
    navigate("/app/cities");
  }
  if (isLoadingGeocoding) return <Spinner />;
  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />;
  if (Geocdingerror) return <Message message={Geocdingerror} />;

  return (
    <form className={`${styles.form} ${isloading? styles.loading: ""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" >Add</Button>
        {/* <button>Add</button> */}
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
