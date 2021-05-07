conn = new Mongo();
db = conn.getDB("brewery")

if(typeof startDate === 'undefined'){
    startDate = "2021-01-01"
}

if(typeof endDate === 'undefined'){
    endDate = "2021-04-01"
}

function locationVisits(startDate, endDate) {
    var cursor = db.patrons.aggregate([
        { $match: { last_checkin: { $gte: new ISODate(startDate), $lte: new ISODate(endDate)}} },
        { $group: { _id: "$location", visits: { $sum: 1 } } },
        { $sort: { visits: -1}},
        { $project: {
            location: "$_id",
            _id: 0,
            visits: 1
            }
        }
    ])

    let resultsArray = []

    while(cursor.hasNext()) {
        resultsArray.push(cursor.next())
    }

    printjson(resultsArray)
}

locationVisits(startDate, endDate);
