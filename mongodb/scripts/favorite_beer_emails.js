conn = new Mongo();
db = conn.getDB("brewery")

if(typeof beer_type === 'undefined'){
    beer_type = "IPA"
}

function getEmailsForBeerType(beer_type) {
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
            $match: {
                "beer_doc.type": beer_type
            }
        },
        {
            $project: {
                _id: 0,
                email: 1,
            }
        }
    ])

    print(`--- Email list of patrons who's favorite beer is "${beer_type}" ---`)

    while(cursor.hasNext()) {
        printjson(cursor.next())
    }
}

getEmailsForBeerType(beer_type)