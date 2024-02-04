import { Injectable } from "@angular/core";

export interface Value { 
    value: string;
}

@Injectable({
    providedIn: "root"
})

export class ValuesService {
    public values: Value[] = [];

    public getNewValue(): Value {
        return {value: ""};
    }
}