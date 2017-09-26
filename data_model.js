var data_model_array = {
    count: 0,
    db: [], // array of objects
    create: function (new_object) {
        var id = this.count;
        this.count++;
        this.db[id] = new_object;
        // assigns a unique ID to each object
        //   once an ID has been used for one object, it can never be used for another
        //   once an object has been given an ID, it can never be given a new one
        // adds the object to db
    },
    read: function (entry_id) {
        return this.db[entry_id];
        // object associated with that id
    },
    update: function (entry_id, new_value) {
        this.db[entry_id] = new_value;
        // replace said entry with said value
    },
    remove: function (entry_id) {
        this.db.splice(entry_id, 1);
        // remove object with said id
        // this operation must not change other objects' id's
    }
};

var db = [];
var data_model_object = {
    count: 0,
    db: {}, // array of objects
    create: function (new_object) {
        var id = this.count;
        this.count++;
        this.db[id] = new_object;
        // assigns a unique ID to each object
        //   once an ID has been used for one object, it can never be used for another
        //   once an object has been given an ID, it can never be given a new one
        // adds the object to db
    },
    read: function (entry_id) {
        return this.db[entry_id];
        // object associated with that id
    },
    update: function (entry_id, new_value) {
        this.db[entry_id] = new_value;
        // replace said entry with said value
    },
    remove: function (entry_id) {
        delete this.db[entry_id];
        // remove object with said id
        // this operation must not change other objects' id's
    }
};