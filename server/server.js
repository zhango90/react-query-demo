// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });

fastify.register(require("fastify-mongodb"), {
  url: "mongodb://localhost:27017/react-query-demo-db"
});

// Declare a route
fastify.get("/posts", async (request, reply) => {
  const db = fastify.mongo.db;
  const collection = db.collection("posts");
  const posts = await collection.find().toArray();
  return posts;
});

fastify.post("/posts", async (request, reply) => {
  const db = fastify.mongo.db;
  const collection = db.collection("posts");

  collection.insertOne(request.body);
  return { message: "post created" };
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3001);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
