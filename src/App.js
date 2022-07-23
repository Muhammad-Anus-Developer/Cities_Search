import axios from 'axios';
import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './App.css';

function App() {

  const [citiesData, setCitiesData] = useState([])
  const [searchInput, setSearchInput] = useState("");
  const [selectedValue, setSelectedValue] = useState("");




  var config = {
    method: 'get',
    url: 'https://countriesnow.space/api/v0.1/countries/population/cities',
    headers: {}
  };

  useEffect(() => {

    axios(config)
      .then((response) => {
        setCitiesData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [])

  return (
    <div className="App">
      <div class="wrapper">
        <div class="search-input">
          <a href="" target="_blank" hidden></a>
          <input type="text" value={searchInput} onChange={(e) => setSearchInput((e.target.value))} placeholder="Type to search cities..." />
          <div style={searchInput.length === 0 || searchInput[0] === " " ? {display:"none"} : {display:"block"}} class="autocom-boxi">
            <ul>
{citiesData.length !== 0 ?

  citiesData.filter((value)=>{
    if(searchInput === ""){
      return value;
    } else if(value.city.toLowerCase().includes(searchInput.toLowerCase())){
      return value;
    }
  })
  
  .map((e,i)=>{
    return(
      
        <li onClick={()=>{
          setSelectedValue(e.city);
             setSearchInput("")
        }} key={i}>{e.city}</li>

      
      )
    })

    :
    <li>No City Found!</li>
}
    

            </ul>
          </div>
          <div class="icon"><FiSearch onClick={()=>{
           if(citiesData.find(val => val.city.toLowerCase() === searchInput.toLowerCase())){
             setSelectedValue(searchInput);
             setSearchInput("")
           }else{
            alert("This city is not available!")
           }

          }} style={{ marginTop: 15 }} size={22} /></div>
        </div>
       
{
  selectedValue ?
  <p style={{paddingTop:30, textAlign:"center"}}>You searched <span style={{fontWeight:600, color:"rgb(173 112 112)"}}>{selectedValue}</span></p>
  :
  null
}


      </div>

    </div>
  );
}

export default App;
