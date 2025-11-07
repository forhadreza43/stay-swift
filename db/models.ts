import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const connectDB = async () => {
   try {
      if (mongoose.connections[0].readyState) {
         console.log('Already connected to DB');
         return;
      }
      await mongoose.connect(`${process.env.MONGODB_URI}/stayswift`);
      console.log('Connected to DB');
   } catch (error) {
      console.log('Error connecting to DB:', error);
   }
};

const reviewSchema = new Schema({
   userId: { type: Schema.Types.ObjectId, required: true },
   hotelId: { type: Schema.Types.ObjectId, required: true },
   review: { type: String, required: true },
});
const Review = models.Review || model('Review', reviewSchema);

const ratingSchema = new Schema({
   hotelId: { type: Schema.Types.ObjectId, required: true },
   userId: { type: Schema.Types.ObjectId, required: true },
   rating: { type: Number, required: true },
});
const Rating = models.Rating || model('Rating', ratingSchema);

const BookingSchema = new Schema({
   userId: { type: Schema.Types.ObjectId, required: true },
   hotelId: { type: Schema.Types.ObjectId, required: true },
   checkin: { type: Date, required: true },
   checkout: { type: Date, required: true },
});
const Booking = models.Booking || model('Booking', BookingSchema);

const hotelSchema = new Schema({
   name: {
      required: true,
      type: String,
   },
   address1: {
      required: true,
      type: String,
   },
   airportCode: {
      required: true,
      type: String,
   },
   city: {
      required: false,
      type: String,
   },
   countryCode: {
      required: false,
      type: String,
   },
   highRate: {
      required: false,
      type: Number,
   },
   location: {
      required: false,
      type: Object,
   },
   lowRate: {
      required: false,
      type: Number,
   },
   propertyCategory: {
      required: false,
      type: Number,
   },
   stateProvinceCode: {
      required: false,
      type: String,
   },
   thumbNailUrl: {
      required: false,
      type: String,
   },
   gallery: {
      required: false,
      type: Array,
   },
   overview: {
      required: false,
      type: String,
   },
   amenities: {
      required: false,
      type: Array,
   },
});
const Hotel = models.Hotel || model('Hotel', hotelSchema);
export { connectDB, Review, Rating, Booking, Hotel };
