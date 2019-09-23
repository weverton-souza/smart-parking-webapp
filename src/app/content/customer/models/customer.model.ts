import { AbstractModel } from '@/shared/abstracts/shared.abstract';

export class Customer extends AbstractModel {
    name: string;
    cpf: string;
    phoneNumber: string;
}