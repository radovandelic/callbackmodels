var data_model_array = {
    count: 0,
    db: [], // array of objects
    create: function (new_object) {
        var id = this.count;
        this.count++;
        this.db[id] = new_object;
    },
    read: function (entry_id) {
        return this.db[entry_id];
    },
    update: function (entry_id, new_value) {
        this.db[entry_id] = new_value;
    },
    remove: function (entry_id) {
        this.db.splice(entry_id, 1);
    }
};

var db = [];
var data_model_object = {
    count: 0,
    db: {}, // object of objectss
    create: function (new_object) {
        var id = this.count;
        this.count++;
        this.db[id] = new_object;
    },
    read: function (entry_id) {
        return this.db[entry_id];
    },
    update: function (entry_id, new_value) {
        this.db[entry_id] = new_value;
    },
    remove: function (entry_id) {
        delete this.db[entry_id];
    }
};