import {Component, OnInit} from '@angular/core';
import {PaginationHelper} from './helpers/pagination.helper';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

    public normalUsers: any[];
    public businessUsers: any[];
    public nPHelper: PaginationHelper;
    public bPHelper: PaginationHelper

    constructor(service: SomeService) {
        this.nPHelper = new PaginationHelper();
        this.bPHelper = new PaginationHelper();
    }
    ngOnInit() {
        this.service.getSomeUsers().subscribe(
            data => {
                this.normalUsers = data.users;
                //init pagination. default pageSize is 10
                this.nPHelper.initPageHelper(this.normalUsers);
            }
        );
        this.service.getSomeUsers().subscribe(
            data => {
                this.businessUsers = data.users;
                //init second pagination, set pageSize as 30
                this.bPHelper.initPageHelper(this.businessUsers, 30);
            }
        );
    }


}