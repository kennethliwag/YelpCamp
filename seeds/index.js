const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

const urldb = "mongodb://localhost:27017/yelp-camp";

mongoose.connect(urldb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 25) + 10;
    const camp = new Campground({
      //Your User Id
      author: "624a320ff533441902f1605a",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint explicabo consequatur, quaerat velit quasi ducimus ipsam.",
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
          url: "https://res.cloudinary.com/drfbzgcpq/image/upload/v1649233533/YelpCamp/vel8tpjgfipqjqjfx8fq.jpg",
          filename: "YelpCamp/vel8tpjgfipqjqjfx8fq",
        },
        {
          url: "https://res.cloudinary.com/drfbzgcpq/image/upload/v1649233533/YelpCamp/swqevw3mqpyqswsbg0jr.jpg",
          filename: "YelpCamp/swqevw3mqpyqswsbg0jr",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
