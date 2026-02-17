import "dotenv/config.js";
import app from "./src/app.js";
import { initDatabase } from "./src/db/init.js";

const PORT = process.env.PORT || 3000

await initDatabase();

app.listen(PORT, () => {
  console.log(`Server Running at port ${PORT}`)
});