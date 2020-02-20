import { IsVerifiedDirective } from './isverifiedDirective';
import { IsAdminDirective } from './isAdminDirective';

export const schemaDirectives = {
    isEmailVerified: IsVerifiedDirective,
    isAdmin: IsAdminDirective,
};
