import { Schema } from 'mongoose';

export const booksSchema: Schema = new Schema({
  title: String,
  author: String,
  typeId: String
});

export const bookTypeSchema: Schema = new Schema({
  leader: String,
  genre: String
});
