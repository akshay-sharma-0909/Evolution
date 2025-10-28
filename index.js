const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");

const port = 8080;

// Set up EJS and views
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// index.js or app.js (Express backend)
const axios = require("axios");

app.get("/api/charging-stations", async (req, res) => {
    const { latitude, longitude, distance = 20 } = req.query;

    try {
        const response = await axios.get("https://api.openchargemap.io/v3/poi/", {
            params: {
                output: "json",
                countrycode: "IN",
                latitude,
                longitude,
                distance,
                distanceunit: "km",
                maxresults: 100,
                compact: true,
                verbose: false
            },
            headers: {
                "X-API-Key":"ed0ce3e3-28bf-4752-84-2ad75c0a328d"// Use your API key here
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching stations:", error.message);
        res.status(500).json({ error: "Failed to fetch charging stations." });
    }
});


// Routes
app.get("/charging", (req, res) => {
    res.render("home"); // Looks for views/index.ejs
});

app.get("/charging/finder", (req, res)=>{
    res.render("finder");
})
app.listen(port, () => {
    console.log("Server running on port", port);
});
