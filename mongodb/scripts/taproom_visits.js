conn = new Mongo();
db = conn.getDB("brewery")

// db.patrons.aggregate([
//     { $match: { last_checkin: { $gte: new ISODate("2021-01-01"), $lte: new ISODate("2021-04-01")}} },
//     { $group: { _id: "$location", visits: { $sum: 1 } } },
//     { $project: {
//         location: "$_id",
//         _id: 0,
//         visits: 1
//         }
//     }
// ])
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

    while(cursor.hasNext()) {
        printjson(cursor.next())
    }
}

locationVisits(startDate, endDate);


// db.runCommand(
//     {
//         eval: locationVisits(startDate, endDate),
//         args: [startDate, endDate]
//     }
// )
