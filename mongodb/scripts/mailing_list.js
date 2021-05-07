conn = new Mongo();
db = conn.getDB("brewery")

if(typeof beerType === 'undefined'){
    beerType = ""
}

function getMailingList(beerType) {
    if(beerType === ""){
        let cursor = db.getCollection('patrons').find({}, {email: 1, _id: 0})

        let resultsArray = []

        while( cursor.hasNext() ){
            resultsArray.push(cursor.next().email)
        };

        printjson(resultsArray);
        return
    };

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
                "beer_doc.type": beerType
            }
        },
        {
            $project: {
                _id: 0,
                email: 1,
            }
        }
    ])

    let resultsArray = []

    while(cursor.hasNext()) {
        resultsArray.push(cursor.next().email)
    }

    printjson(resultsArray)
};

getMailingList(beerType)