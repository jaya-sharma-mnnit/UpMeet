import mongoose from "mongoose";
const uri = process.env.MONGODB_URI || '';

if (!uri) {
    throw new Error('Please add your Mongo URI to .env')
  }

type ConnectionObject={
    isConnected?:number
}
declare global{
    var mongooseconnection:ConnectionObject
}
const connection: ConnectionObject = global.mongooseconnection || {};

const dbConnect=async (): Promise<void>=>{
      if(connection.isConnected){
        console.log("Already connected to database");
        return;
      }
      try {
        const db=await mongoose.connect(uri);
        connection.isConnected=db.connections[0].readyState;

        global.mongooseconnection = connection;

        console.log("Database connection successful!");

      } catch (error) {
        console.log("Database connection failed!", error);

      }
}
export default dbConnect;