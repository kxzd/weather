(()=>{const e=document.querySelector(".city-name"),t=document.querySelector(".current-date"),n=document.querySelector(".current-time"),r=document.querySelector(".temp"),i=document.querySelector(".weather-type"),a=document.querySelector(".feels-like"),c=document.querySelector(".humidity"),o=document.querySelector(".wind"),s=document.querySelector(".weather-image"),m=document.querySelector(".temp-change"),u=document.querySelector("form"),d=document.querySelector("[data-search-input]");async function l(m,u){const d=`https://api.openweathermap.org/data/2.5/weather?q=${u}&units=${m}&appid=7470ed2b0f9dc40d12a6d5af68a85501`;try{const u=await fetch(d,{mode:"cors"}),p=await u.json();e.innerText=`${p.name}, ${p.sys.country}`.toUpperCase();const y=function(e){const t=new Date,n=t.getTime()+6e4*t.getTimezoneOffset()+1e3*e.timezone;return new Date(n)}(p),h=y.toLocaleDateString(),T=y.toLocaleTimeString();t.innerText=`${h}, `,n.innerText=`${T}`;const x=p.weather[0].description;if(i.innerText=(l=x).charAt(0).toUpperCase()+l.slice(1),"metric"===m){r.innerText=`${Math.round(p.main.temp)}°C`,a.innerText=`${Math.round(p.main.feels_like)}°C`;const e=Math.round(3.6*p.wind.speed);o.innerText=`${e} km/h`}else"imperial"===m&&(r.innerText=`${Math.round(p.main.temp)}°F`,a.innerText=`${Math.round(p.main.feels_like)}°F`,o.innerText=`${Math.round(p.wind.speed)} mph`);c.innerText=`${p.main.humidity}%`,function(e){switch(e.weather[0].main){case"Clear":s.src="./img/clear.svg";break;case"Clouds":s.src="./img/cloudy.svg";break;case"Rain":case"Drizzle":case"Mist":s.src="./img/rain.svg";break;case"Thunderstorm":s.src="./img/thunder.svg";break;case"Snow":s.src="./img/snow.svg";break;default:s.src=""}}(p)}catch(e){console.log(e)}var l}u.addEventListener("submit",(e=>{e.preventDefault();const t=d.value;d.value="","Display in °C"===m.innerText?l("imperial",t):"Display in °F"===m.innerText&&l("metric",t)})),m.addEventListener("click",(t=>{"Display in °F"===m.innerText?(m.innerText="Display in °C",l("imperial",e.innerText)):"Display in °C"===m.innerText&&(m.innerText="Display in °F",l("metric",e.innerText))})),l("metric","New York")})();