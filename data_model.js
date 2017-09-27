var data_model = {
    count: 0,
    db: {},
	create: function (new_object, callback) {
        var id = this.count;
        this.count++;
        this.db[id] = new_object;
        this.callback(this.db[id]);
	},
	read: function (entry_id, callback) {
        this.callback(this.db[entry_id]);
	},
	update: function (entry_id, new_value, callback) {
        this.db[entry_id] = new_value;
        this.callback(this.db[entry_id]);
	},
	remove: function (entry_id, callback) {
        delete this.db[entry_id];
        this.callback("Object #" + entry_id + " removed.");
    },
    callback: function(object){
        console.log(object);
    }
};