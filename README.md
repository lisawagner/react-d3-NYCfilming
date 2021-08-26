# Data Visualization with Reactjs and D3js

This project provides a visual representation of NYC filming permits 2021 in JSON format from:<br />
[The City of New York](https://data.cityofnewyork.us/resource/tg4x-b46p.json)

## The Basics

App is setup via create-react-app and npm install d3.

### `Import Data`

Fetch the JSON data through the NYC api endpoint via useEffect hook.\
Filter and transform the data into a suitable format for the end-user.

### `Visualize`

Present the data for the user in an clear and uncomplicated visual form:

- set up svg and chart refs
- set up x and y scales
- call the axis
- set up path and/or shape
- add text

### `Sample`

![Graph of NYC filming permits 2021 by date](/components/images/nyc-filmings-graph.png "Graph of 2021 NYC filming permits")
