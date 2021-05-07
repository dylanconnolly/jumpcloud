conn = new Mongo();
db = conn.getDB("brewery")

function getBeersByPopularity() {
    var cursor = db.getCollection('patrons').aggregate([
        {
            $lookup: {
                localField: "favorite_beer",
                from: "beers",
                foreignField: "_id",
                as: "beer_doc"
            }
        },
        {
            $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$beer_doc", 0 ] }, "$$ROOT" ] } }
        },
        { 
            $group: { _id: "$name", count: { $sum: 1 }, type: { $first: "$type" } }
        },
        {
            $project: {
                name: "$_id",
                count: 1,
                type: 1,
                _id: 0,
            }
        },
        {
            $sort: { count: -1 }
        }
    ])
    
    while(cursor.hasNext()) {
        printjson(cursor.next())
    }
}

getBeersByPopularity();