
import './App.css';
import {useState} from 'react';
const WeatherDetails =({temp,city,country,lat,lon})=>{
  return(<>
    <div className='temperature'>{temp}°C</div>
    <div className='city'>{city}</div>
    <div className='county'>{country}</div>
    <div className='cordinates'>
      <div >
        <span className="lattitude">Latitude</span>
        <span>{lat}</span>
      </div>
      <div >
        <span className="longitude">Longitude</span>
        <span>{lon}</span>
      </div>
    </div>
    </>)
}

function App() {
  const[item,setItem]=useState("")
  let key=`7b06e1f9f7a1e4e305dc04931213be33`
  const[temp,setTemp] = useState('TEMPERATURE');
  const[city,setCity] = useState('CITY');
  const[country,setCountry] = useState('CN');
  const[lat,setLat] = useState('-');
  const[lon,setLon] = useState('-');
  const[loading,setLoading] = useState(false);
  const[citynotfound,setcitynotfound] = useState(false);
  const search= async()=>{
    setLoading(true);
    let url=`https://api.openweathermap.org/data/2.5/weather?=0&q=${item}&appid=${key}&unit=Metric`
    try{
      let res= await fetch(url)
      let data=await res.json()
      console.log(data);
      if(data.cod=='404'){
        console.log("enter a valid city")
        setcitynotfound(true)
        setLoading(false)
        return setCity("Enter Correct City");
      }
      setTemp(Math.floor(9/5*(data.main.temp-273)+32))
      setCity(data.name)
      setCountry(data.sys.country)
      setLat(data.coord.lat)
      setLon(data.coord.lon)
    }catch(error){
      console.error("An error occured",error.message);
    }finally{
      setLoading(false);
    }
  }
  const citySearch=(e)=>{
    setItem(e.target.value)
  }
  const handlekeydown=(e)=>{
    if(e.key=="Enter"){
      search();
    }
  }
  return (
    <div className="App">
      <div className="container">
        <div className="inputcontainer">
          <input type="text" className="inputbox" placeHolder="Serch City"
          onChange={citySearch} value={item} onKeyDown={handlekeydown}/>
          
        </div>
        <WeatherDetails temp={temp} city={city} country={country} lat={lat} lon={lon}/>
      </div>
      
    </div>
  );
}

export default App;
