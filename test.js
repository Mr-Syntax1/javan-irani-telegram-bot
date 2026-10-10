// import { getDollarPrice } from "./src/services/dollarService.js";

// const data = await getDollarPrice();
// console.log(data);
import { getWeather } from './src/services/weatherService.js';

const data = await getWeather();
console.log(data);