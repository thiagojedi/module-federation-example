# Module Federation and Micro Frontend examples

## Installation

- clone the repo
- `cd js-host npm i`
- `cd react-host npm i`
- `cd remote npm i`

## Development FM

- `cd remote npm run start-mf`
- `cd js-host npm start`
- `cd react-host npm start`

You should be able to load the Counter exposed as FM inside js-host and react-host.

## Development MF

- `cd remote npm run start`
- Open html-host/index.html in a browser tab.

You should be able to load the Counter exposed as simple js chunk inside html-host.
