let express = require("express")
let Route = express()
let redis = require("../controllers/redisController")

// return instructions
Route.get("/", (req, res, next) => {
    res.send("FastNed Application | check Readme for instructions")
})

// get all locations
Route.get("/locations", redis.get_all_locations)

// add a new location
Route.post("/location/add", redis.add_location)

// delete a location
Route.delete("/location/delete/:id", redis.delete_location)

// get a location by id
Route.get("/location/:id", redis.get_location)

// update a location by id
Route.put("/location/update/:id", redis.update_location)

module.exports = Route
