import mongoose from 'mongoose';

import { booksSchema } from '../Schema/mongoose/mongoSchema';
import { bookTypeSchema } from '../Schema/mongoose/mongoSchema';

export const BookModel = mongoose.model('book', booksSchema);
export const TypeModel = mongoose.model('bookType', bookTypeSchema);
