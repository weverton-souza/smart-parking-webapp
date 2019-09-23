import { OnInit } from '@angular/core';

export abstract class AbstractComponent implements OnInit {
    ngOnInit(): void {
        this.ngOnInitExtend();
    }

    ngOnInitExtend(): void { }
}