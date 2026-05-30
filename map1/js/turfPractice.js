function turfFunctions(map) {

    const pointCoords = [26.71552, 58.37393]

    const myPoint = turf.point(pointCoords)

    const geoJSON_point = L.geoJSON(myPoint)

    geoJSON_point.addTo(map)

    const secondPointCoords = [26.71489, 58.37439]
    const secondPoint = turf.point(secondPointCoords)

    L.geoJSON(secondPoint).addTo(map)

    const options = { units: 'meters' }

    const distance = turf.distance(myPoint, secondPoint, options)

    const midpoint = turf.midpoint(myPoint, secondPoint)

    L.geoJSON(midpoint, {
    pointToLayer: function(feature, latlng) {
        return L.marker(latlng, {
            icon: L.divIcon({
                html: '<span style="color:red;font-size:24px;font-weight:bold;">✕</span>',
                className: '',
                iconSize: [24, 24]
            })
        })
    }
}).addTo(map)

    console.log("Midpoint:", midpoint)


    const distanceRounded = Math.round(distance)
    const roundedToTwoDecimals = Math.round(distance * 100) / 100

    console.log(`rounded to nearest integer: ${distanceRounded}`)
    console.log(`rounded to two decimal points: ${roundedToTwoDecimals}`)

    const lineCoords = [
    	[26.71379, 58.37476],
    	[26.71554, 58.37349],
    	[26.71553, 58.37434],
    	[26.71630, 58.37378],
    	[26.71473, 58.37407]
	]

    const myLine = turf.lineString(lineCoords)

    const geoJSON_line = L.geoJSON(myLine)

    geoJSON_line.addTo(map)


    const polygonCoords = [[
    	[26.71355, 58.37468],
    	[26.71404, 58.37430],
    	[26.71433, 58.37429],
    	[26.71550, 58.37345],
    	[26.71660, 58.37388],
    	[26.71615, 58.37420],
    	[26.71589, 58.37431],
    	[26.71552, 58.37461],
    	[26.71521, 58.37496],
    	[26.71480, 58.37481],
    	[26.71449, 58.37502],
    	[26.71355, 58.37468]  // sama mis esimene punkt
	]]

    const myPolygon = turf.polygon(polygonCoords)

    const geoJSON_polygon = L.geoJSON(myPolygon)

    geoJSON_polygon.addTo(map)


    const areaMeasurement = turf.area(myPolygon)
    const areaRounded = Math.round(areaMeasurement)

    console.log(`Area without rounding: ${areaMeasurement}`)
    console.log(`Rounded area is ${areaRounded} square meters`)


    const statueBuffer = turf.buffer(myPoint, 20, { units: 'meters' })
    L.geoJSON(statueBuffer).addTo(map)

    const lineBuffer = turf.buffer(myLine, 20, { units: 'meters' })
    // L.geoJSON(lineBuffer).addTo(map)

    const polygonBuffer = turf.buffer(myPolygon, 20, { units: 'meters' })
    // L.geoJSON(polygonBuffer).addTo(map)


    const features = turf.featureCollection([myPoint, myLine, myPolygon])
    const enveloped = turf.envelope(features)

    // L.geoJSON(enveloped).addTo(map)


    // map.on('click', function(event) {

    	// console.log(`[${event.latlng.lng}, ${event.latlng.lat}]`)

    // })

}

export { turfFunctions }