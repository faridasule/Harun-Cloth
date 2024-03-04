// 'use client'

// src/App.tsx
import React, { useState, useEffect } from 'react';

interface Country {
  name:{common: string};
  capital: string;
  population: number;
  // Add more fields as needed
}

export const CountryComponent = () => {

  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>List of Countries</h1>
      <ul>
        {countries.map((country, index) => (
          <li key={index}>
         <strong>Name:</strong> {country.name.common}<br />
            <strong>Capital:</strong> {country.capital}<br />
            <strong>Population:</strong> {country.population}<br />
          </li>
        ))}
      </ul>
    </div>
  );
}



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export const CountryComponent = () => {
//   const [countries, setCountries] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://restcountries.com/v3.1/all');
//         setCountries(response.data);
//       } catch (error) {
//         console.error('Error fetching countries:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>List of Countries</h1>
//       <ul>
//         {countries.map((country: any) => (
//           <li key={country.cca3}>
//                 {country.name.common}
                
//             </li>
           
//         ))}
//                <li>hello</li>
//       </ul>
//     </div>
//   );
// }

