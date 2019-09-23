import { AbstractModel } from '@/shared/abstracts/shared.abstract';

export class Courtyard extends AbstractModel {
    public name: string;
    public numberOfVacancies: number;
    public description: string;
    public hourlyRate: number;
}