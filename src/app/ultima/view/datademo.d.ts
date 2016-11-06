import { OnInit } from '@angular/core';
import { CarService } from '../service/carservice';
import { NodeService } from '../service/nodeservice';
import { EventService } from '../service/eventservice';
import { Car } from '../domain/car';
import { TreeNode } from 'primeng/primeng';
export declare class DataDemo implements OnInit {
    private carService;
    private eventService;
    private nodeService;
    cars: Car[];
    selectedCar: Car;
    sourceCars: Car[];
    targetCars: Car[];
    orderListCars: Car[];
    carouselCars: Car[];
    files1: TreeNode[];
    files2: TreeNode[];
    events: any[];
    selectedNode: TreeNode;
    scheduleHeader: any;
    constructor(carService: CarService, eventService: EventService, nodeService: NodeService);
    ngOnInit(): void;
}
