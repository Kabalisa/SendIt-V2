import { model, Model } from 'mongoose';

import { booksSchema } from '../Schema/mongoose/mongoSchema';
import { bookTypeSchema } from '../Schema/mongoose/mongoSchema';
import { BookModelInt } from '../interfaces/interfaces';
import { BookTypeModel } from '../interfaces/interfaces';

export const BookModel: Model<BookModelInt> = model<BookModelInt>('book', booksSchema);
export const TypeModel: Model<BookTypeModel> = model<BookTypeModel>('bookType', bookTypeSchema);
