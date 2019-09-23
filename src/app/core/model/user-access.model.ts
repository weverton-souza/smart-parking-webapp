import { AbstractModel } from '@/shared/abstracts/shared.abstract';

export class UserAccess extends AbstractModel {
    email: string;
    password: string;
    token: string;
    role: string;
}