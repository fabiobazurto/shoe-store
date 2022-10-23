export class TableRecord {
    constructor(title, child_rows=[], bad_stock=false){
	this.title = title;
	this.child_rows = child_rows;
	this.bad_stock= bad_stock;
    }
}
