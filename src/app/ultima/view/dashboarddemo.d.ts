import { OnInit } from '@angular/core';
import { CarService } from '../service/carservice';
import { EventService } from '../service/eventservice';
import { Car } from '../domain/car';
import { SelectItem } from 'primeng/primeng';
export declare class DashboardDemo implements OnInit {
    private carService;
    private eventService;
    cities: SelectItem[];
    cars: Car[];
    chartData: any;
    events: any[];
    selectedCity: any;
    constructor(carService: CarService, eventService: EventService);
    ngOnInit(): void;
}
