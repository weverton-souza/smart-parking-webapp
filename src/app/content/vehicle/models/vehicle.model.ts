import { AbstractModel } from "@/shared/abstracts/shared.abstract"

export class Vehicle extends AbstractModel {
    public model: string;
    public licencePlate: string;
    public color: string;
}
