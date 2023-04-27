#!/usr/bin/env node

import minimist from 'minimist'
import moment from 'moment-timezone'

const args = minimist(process.argv.slice(2))
const timezone = args.z || moment.tz.guess()

if (args.h) {
    console.log(`Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -z            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit.`)
    exit(0)
}

if (!(args.n || args.s) || !(args.e || args.w)) {
    console.log("latitude or longitude not specified")
    exit(1)
}
const latitude = args.n || -args.s
const longitude = args.e || -args.w

const day = args.d || 1
if (day < 0 || day > 6) {
    console.log("days field must be 0-6")
}

const url = "https://api.open-meteo.com/v1/forecast"
            + "?latitude=" + latitude 
            + "&longitude=" + longitude
            + "&timezone=" + timezone
            + "&daily=precipitation_hours"

const response = await fetch(url)
const data = await response.json()

if (args.j) {
    console.log(data)
    exit(0)
}

if (data.daily.precipitation_hours[day] == 0) {
    console.log("You will not need your galoshes ")
} else {
    console.log("You might need your galoshes ")
}

if (day == 0) {
    console.log("today.")
} else if (days == 1) {
    console.log("tomorrow.")
} else {
    console.log("in " + days + " days.")
}