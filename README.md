# PaginationHelper class for ng-bootstarp
Only demo for pagination helper class, not compoleted project.

## Structure
 ├── ...
    ├── app                    
    │   ├── app.component.ts     #import helper.ts       
    │   ├── app.component.css      
    │   └── app.component.html                
    └── helpers
        ├── pagination.helper.ts  

## How to use

###ts file, such as app.component.ts

1.import helper class

```
import {PaginationHelper} from './helpers/pagination.helper';
```
2. init pageHelper, support multiple helpers
```typescript
export class AppComponent implements OnInit {

    public nPHelper: PaginationHelper;
    public bPHelper: PaginationHelper

    constructor(service: SomeService) {
        this.nPHelper = new PaginationHelper();
        this.bPHelper = new PaginationHelper();
    }
    ...
}
```
3. set original Data 
```typescript
ngOnInit() {
     this.service.getSomeUsers().subscribe(
            data => {
                this.normalUsers = data.users;
                //init pagination. default pageSize is 10
                this.nPHelper.initPageHelper(this.normalUsers);
            }
        );
        .....
}
```
OR
```typescript
   ...  
   //init second pagination, set pageSize as 30
   this.bPHelper.initPageHelper(this.businessUsers, 30);
   ...
```
###HTML file, such as app.component.html

```html
   <table class="card-body table table-hover">
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="let user of nPHelper.pageItems">
                <th scope="row">{{i+1}}</th>
                <td>{{user.Name}}</td>
            </tr>
        </tbody>
    </table>
    <ngb-pagination [pageSize]="nPHelper.pageSize" 
    [collectionSize]="nPHelper.collectionSize"
    [(page)]="nPHelper.page" (pageChange)="nPHelper.pageChange($event)" aria-label="Default pagination"></ngb-pagination>
```
If want to add select page size function

```html
  ....
</table>
<select (change)="nPHelper.pageSizeChange($event.target.value)">
<option value= 10>10</option>
<option value= 30>30</option>
<option value= 50>50</option>
</select> /perPage
<ngb-pagination [pageSize]="nPHelper.pageSize" 
    [collectionSize]="nPHelper.collectionSize"
    [(page)]="nPHelper.page" (pageChange)="nPHelper.pageChange($event)" aria-label="Default pagination"></ngb-pagination>

```


## Full pageinationHelper.ts
```

export class PaginationHelper {

    public page = 1;
    public pageSize = 3; // default page size
    public collectionSize: number;
    public originalItems: any[];
    public pageItems: any[];

    constructor() {

    }

    public initPageHelper(totalItems: any[], defaultPageSize?: number) {
        this.originalItems = totalItems;
        this.collectionSize = this.originalItems.length;
        if (defaultPageSize) {
            this.pageSize = defaultPageSize;
        }
        this.pageItems = this.originalItems.slice(0, 1 * this.pageSize);
        this.page = 1;
    }

    public setPage(currentPage: number) {
        this.page = currentPage;
    }

    public setPageSize(pageSize: number) {
        this.pageSize = pageSize;
    }

    public pageSizeChange(value: number) {
        this.pageSize = value;
        this.page = 1;
        if (this.originalItems) {
            this.pageItems = this.originalItems.slice(0, 1 * this.pageSize);
        }
    }

    public pageChange(currentPage: number) {
        if (this.originalItems) {
            this.pageItems = this.originalItems.slice((currentPage - 1) * this.pageSize, currentPage * this.pageSize);
        }
    }

}
```
