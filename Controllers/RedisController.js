let redis = require("redis") // Require Redis
let client = redis.createClient() // Create a new redis instance

exports.get_all_locations = (req, res, next) => {
    let return_dataset = []

    client.keys("*", (err, id) => {
        let multi = client.multi()
        let keys = Object.keys(id)
        let i = 0

        keys.forEach((l) => {
            client.hgetall(id[l], (e, o) => {
                i++
                if (e) {
                    console.log(e)
                } else {
                    temp_data = { id: id[l], data: o }
                    return_dataset.push(temp_data)
                }

                if (i == keys.length) {
                    res.send({ locations: return_dataset })
                }
            })
        })
    })
}

exports.add_location = (req, res, next) => {
    // post Parameters
    let id = req.body.id
    let name = req.body.name
    let location = req.body.location
    let chargers = req.body.chargers
    let postalCode = req.body.phone
    let lastUpdated = req.body.lastUpdated
    let country = req.body.country

    // make id the key and assign the id to the other Parameters
    client.HSET(
        id,
        [
            "name",
            name,
            "location",
            location,
            "chargers",
            chargers,
            "postalCode",
            postalCode,
            "lastUpdated",
            lastUpdated,
            "country",
            country,
        ],
        (err, reply) => {
            if (err) {
                console.log(err) // callback to log errors
            }

            console.log(reply) // log success message
            res.send("Location added successfully") // response back to the client
        }
    )
}

exports.delete_location = (req, res, next) => {
    // find key associated with the id and deletes it
    client.del(req.params.id, (err, reply) => {
        if (err) {
            console.log(err)
        }

        console.log(reply)
        res.send("Location deleted successfully")
    })
}

exports.get_location = (req, res, next) => {
    // id from url Parameter
    let id = req.params.id

    client.hgetall(id, (err, obj) => {
        if (!obj) {
            res.send("Location does not exist")
        } else {
            obj.id = id

            res.send({
                location: obj,
            })
        }
    })
}

exports.update_location = (req, res, next) => {
    let id = req.params.id
    let name = req.body.name
    let location = req.body.location
    let chargers = req.body.chargers
    let postalCode = req.body.postalCode
    let lastUpdated = req.body.lastUpdated
    let country = req.body.country

    client.hmset(
        id,
        [
            "name",
            name,
            "location",
            location,
            "chargers",
            chargers,
            "postalCode",
            postalCode,
            "lastUpdated",
            lastUpdated,
            "country",
            country,
        ],
        (err, reply) => {
            if (err) {
                console.log(err)
            }
            console.log(reply)
            res.send("Location updated successfully")
        }
    )
}
