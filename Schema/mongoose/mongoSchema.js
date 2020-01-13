import mongoose, { Schema } from 'mongoose';

export const booksSchema = new Schema({
  title: String,
  author: String,
  typeId: String
});

export const bookTypeSchema = new Schema({
  leader: String,
  genre: String
});
