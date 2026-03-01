const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelper");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "conncetion error"));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "699f35736c2699ff8613dc23",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis cum labore, impedit ullam soluta officiis, odio consequuntur quos corrupti tempora odit nemo dolorum unde pariatur nesciunt corporis, excepturi obcaecati exercitationem?",
      price: price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dhhg0kfbb/image/upload/v1772187299/YelpCamp/jlelzskz26ajzhwtbcai.jpg",
          filename: "YelpCamp/jlelzskz26ajzhwtbcai",
        },
        {
          url: "https://res.cloudinary.com/dhhg0kfbb/image/upload/v1772187299/YelpCamp/zcltrrsdxshd1nd8vcbm.jpg",
          filename: "YelpCamp/zcltrrsdxshd1nd8vcbm",
        },
        {
          url: "https://res.cloudinary.com/dhhg0kfbb/image/upload/v1772187301/YelpCamp/ezptwtmzmok1jniskmuw.jpg",
          filename: "YelpCamp/ezptwtmzmok1jniskmuw",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
