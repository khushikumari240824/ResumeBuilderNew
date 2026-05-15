// import mongoose from "mongoose";

// const connectDb = async () => {
//   try {
//     mongoose.connection.on("connected", () => {
//       console.log("Database connected successfully");
//     });

//     let mongodbURI = process.env.MONGODB_URI;
//     const projectName = "Resume-Builder";

//     if (!mongodbURI) {
//       throw new Error("MONGODB_URI environment variable not set");
//     }

//     if (mongodbURI.endsWith("/")) {
//       mongodbURI = mongodbURI.slice(0, -1);
//     }

//     // Build connect URI respecting an existing database name if present.
//     // Examples supported:
//     // 1) mongodb+srv://user:pass@host/?...        -> append /<projectName>?...
//     // 2) mongodb+srv://user:pass@host/dbname?...  -> use as-is
//     const qIndex = mongodbURI.indexOf("?");
//     const base = qIndex !== -1 ? mongodbURI.substring(0, qIndex) : mongodbURI;
//     const query = qIndex !== -1 ? mongodbURI.substring(qIndex) : "";

//     // Determine if base already contains a database path after the host.
//     // Find position after protocol slashes (e.g., after 'mongodb+srv://')
//     let hasDbName = false;
//     const doubleSlashIndex = base.indexOf("//");
//     if (doubleSlashIndex !== -1) {
//       const afterSlashes = base.substring(doubleSlashIndex + 2);
//       const slashIndex = afterSlashes.indexOf("/");
//       if (slashIndex !== -1) {
//         const pathPart = afterSlashes.substring(slashIndex + 1); // content after the '/'
//         if (pathPart && pathPart.length > 0) {
//           hasDbName = true;
//         }
//       }
//     }

//     const connectUri = hasDbName ? `${base}${query}` : `${base}/${projectName}${query}`;

//     await mongoose.connect(connectUri);
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// };

// export default connectDb;

import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log("Database connected successfully");
    console.log("DB Name:", conn.connection.name);
    console.log("Host:", conn.connection.host);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectDb;