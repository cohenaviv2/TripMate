import "dotenv/config";
import initServer from "./server";

initServer().then((server) => {
  const port = process.env.PORT;
  server.listen(port, () => {
    console.log(`TripMate server is running on port ${port}!`);
  });
});
