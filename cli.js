#!/usr/bin/env node
import minimist from "minimist";
import nodefetch from "node-fetch";
import moment from "moment-timezone";

const args = minimist(process.argv.slice(2));

if(args.h){
    console.log(`Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
  -h            Show this help message and exit.
  -n, -s        Latitude: N positive; S negative.
  -e, -w        Longitude: E positive; W negative.
  -z            Time zone: uses tz.guess() from moment-timezone by default.
  -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
  -j            Echo pretty JSON from open-meteo API and exit.
  `);
    process.exit(0);
}

var latitude;
var longitude;
var timezone = moment.tz.guess();

if(args.z){
    timezone = args.z;
}else if (args.n) {
	latitude = args.n;
} 
if (args.s) {
	latitude = args.s;
}
else {
    console.log('Latitude must be in range');
    process.exit(0);
}
if (args.w) {
	longitude = args.w;
}
if (args.e) {
	longitude = args.e;
}
else {
    console.log('Longitude must be in range');
    process.exit(0);
}

const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&timezone=' + timezone + '&daily=precipitation_hours&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch');
const data = await response.json();

if (args.j) {
	console.log(data);
	process.exit(0);
}


if (data.daily.precipitation_hours[days] != 0) {
	console.log("You might need your galoshes")
} else {
    console.log("You will not need your galoshes")

}
const days = args.d 

if (days == 0) {
  console.log("today.")
} else if (days > 1) {
  console.log("in " + days + " days.")
} else {
  console.log("tomorrow.")
}
process.exit(0);



