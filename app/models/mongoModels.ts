import { model, Model } from 'mongoose';

import { userSchema } from '../Schema/mongoose/mongoSchema';
import { UserModelInt } from '../interfaces/interfaces';

export const UserModel: Model<UserModelInt> = model<UserModelInt>('user', userSchema);
