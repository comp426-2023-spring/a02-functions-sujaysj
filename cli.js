#!/usr/bin/env node

const args = require('minimist')(process.argv.slice(2))
const moment = require('moment')
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
    console.log("arguments not recognized")
    exit(1)
}
const latitude = args.n || -args.s
const longitude = args.e || -args.w

const day = args.d || 1