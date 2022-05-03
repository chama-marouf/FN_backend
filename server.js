let express = require("express")
let path = require("path")
let bodyParser = require("body-parser")
let methodOverride = require("method-override")
let redis = require("redis")
let client = redis.createClient({
    url: "redis://localhost:6379",
})
let cors = require("cors")

// define routes
let routes = require("./routes/api")
const { url } = require("inspector")

// Set Port
let PORT = 4040

// Init app
let app = express()

// instantiate a connection to redis
client.on("connect", () => {
    console.log("Connected to Redis...")
})

// body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

app.use((req, res, next) => {
    res.setHeader("Acces-Control-Allow-Origin", "*")
    res.setHeader("Acces-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE")
    res.setHeader(
        "Acces-Contorl-Allow-Methods",
        "Content-Type",
        "Authorization"
    )
    next()
})

// methodOverride
app.use(methodOverride("_method"))

// Routes Middleware
app.use(routes)

// 404 handler
app.use((req, res) => {
    res.status(404)
    res.send("endpoint not found")
})

// serve application on specified port
app.listen(PORT, () => {
    console.log("Server started on port " + PORT)
})

module.exports = app
