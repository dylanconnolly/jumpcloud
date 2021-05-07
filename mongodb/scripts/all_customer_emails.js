conn = new Mongo();
db = conn.getDB("brewery")

let cursor = db.getCollection('patrons').find({}, {email: 1, _id: 0})

let resultsArray = []

while( cursor.hasNext() ){
    resultsArray.push(cursor.next().email)
};

printjson(resultsArray);