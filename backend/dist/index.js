import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
const PORT = process.env.PORT || 5000;
// Database connection and server startup
connectToDatabase()
    .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
})
    .catch((err) => {
    console.error("Database Connection Failed ❌", err);
    process.exit(1); // ✅ Exit process if DB connection fails
});
//# sourceMappingURL=index.js.map