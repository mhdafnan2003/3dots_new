const mongoose = require('mongoose');

async function clearDB() {
  const uri = 'mongodb+srv://amandb:Theinfinix%4033@cluster0.emf9jky.mongodb.net/3dotsadv?appName=Cluster0';
  await mongoose.connect(uri);
  console.log('Connected to MongoDB. Dropping collections...');
  try {
    await mongoose.connection.db.dropCollection('products');
    console.log('Dropped products');
  } catch (e) { }
  try {
    await mongoose.connection.db.dropCollection('portfolios');
    console.log('Dropped portfolios');
  } catch (e) { }
  try {
    await mongoose.connection.db.dropCollection('settings');
    console.log('Dropped settings');
  } catch (e) { }
  console.log('Database cleared!');
  await mongoose.disconnect();
}
clearDB();
