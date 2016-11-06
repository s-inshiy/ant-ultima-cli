import { OnInit } from '@angular/core';
import { Car } from '../domain/car';
import { CarService } from '../service/carservice';
import { ConfirmationService } from 'primeng/primeng';
export declare class OverlaysDemo implements OnInit {
    private carService;
    private confirmationService;
    cars: Car[];
    images: any[];
    constructor(carService: CarService, confirmationService: ConfirmationService);
    ngOnInit(): void;
    confirm(): void;
}
