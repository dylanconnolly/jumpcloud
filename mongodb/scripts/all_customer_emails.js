conn = new Mongo();
db = conn.getDB("brewery")

let cursor = db.getCollection('patrons').find({}, {email: 1, _id: 0})

if(cursor){
    cursor.forEach(doc => {
        printjson(doc)
    });
};