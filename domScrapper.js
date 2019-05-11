class Record {
	constructor(obj) {
		this.obj = obj;
	}
}


class RecordCreator {
	constructor(obj, elem, type, selector, property, createArray) {
		this.elem = elem;
		this.type = type;
		this.selector = selector;
		this.property = property;
		this.createArr = createArray;
		this.obj = obj;
	}
	create() {
		if (this.type === String) {
			this.createString();
		}
		else if (this.type === Array) {
			this.createArray();
		}
		else {
			return;
		}
	}
	createString() {
		const propertyName = this.property;
		const obj = this.obj;
		const elem = this.elem.querySelector(this.selector);
		if (elem != null && this.createArr === undefined) {
			const propertyValue = elem.innerText;
			obj[propertyName] = propertyValue;
		}
		else if (elem != null && this.createArr === true) {
			const propertyValue = elem.innerText;
			const propertyValueArr = propertyValue.split(';');
			obj[propertyName] = propertyValueArr;
		}
	}
	createArray() {
		const propertyName = this.property;
		const items = this.elem.querySelectorAll(this.selector);
		const valuesArr = [];
		const obj = this.obj;
		if (items != null) {
			[...items].forEach(item => {
				valuesArr.push(item.innerText);
			});
			obj[propertyName] = valuesArr;
		}
	}
}



class Downloader {
	constructor(url, blob){
		this.url = url;
		this.name = 'scrapperData.json';
		this.blob = blob;
	}

	download(){
		const a = document.createElement('a');

		document.body.appendChild(a);
		a.style.display = 'none';
		a.href = this.url;
		a.download = this.name;
		a.click();
		window.URL.revokeObjectURL(this.url);
	}
}

class Scrapper {
	constructor(elem, options){
		this.elem = elem;
		this.finalData = [];
		this.options = options;
	}

	prepareRecords(record, item){
		this.options.forEach(option => {
			const recordItem = new RecordCreator(record, item, option.type, option.selector, option.property, option.createArray);

			recordItem.create();
		})
	}

	scrap(){
		[...this.elem].forEach(item => {
			const newRecord = new Record(item);

			this.prepareRecords(newRecord, item);
			delete newRecord.obj;
			this.finalData.push(newRecord);
		})
	}

	saveData(){
		const str = JSON.stringify(this.finalData, null, 2);
		const blob = new Blob([str], {type: 'application/octet-stream'});
		const url = window.URL.createObjectURL(blob);
		const file = new Downloader(url, blob);

		file.download();
	}
}