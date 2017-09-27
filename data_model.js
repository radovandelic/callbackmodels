var data_model = {
    count: 0,
    db: {},
    // pass object to validate
    // if successful, add ID, push to db, execute callback with no error
    // if not successful, execute callback with error message
    create: function (new_object, callback) {
        var error = this.validate(new_object);
        if (!error) {
            var id = this.count;
            this.count++;
            this.db[id] = new_object;
        }
        callback(error, new_object);
    },
    read: function (entry_id, callback) {
        var error = false;
        if (this.db[entry_id] == undefined) {
            error = "Error: requested object does not exist.";
        }
        callback(error, this.db[entry_id]);
    },
    update: function (entry_id, new_value, callback) {
        var error = this.validate(new_value);
        if (!error) {
            if (this.db[entry_id] != undefined) { this.db[entry_id] = new_value; }
            else { error = "Error: object with the specified ID does not exist." }
        }
        callback(error, this.db[entry_id]);
    },
    remove: function (entry_id, callback) {
        delete this.db[entry_id];
        callback(false, "Object #" + entry_id + " removed.");
    },
    log: function (error, object) {
        if (error) {
            console.log(error);
        } else {
            console.log(object);
        }
    },
    validate: function (object) {
        var error = false;
        for (var key in object) {
            if (this.schema[key] == undefined) {
                //object[key] = undefined;
                error = "Error: object contains illegal extra parameters."
            } else if (typeof (object[key]) != this.schema[key].type) {
                if (this.schema[key].required) {
                    object[key] = this.schema[key].fallback;
                } else {
                    //object[key] = undefined;
                    error = "Error: entered wrong datatype for (optional) " + key + " property.";
                }
            }
        }
        for (var key in this.schema) {
            if (this.schema[key].required && object[key] == undefined) {
                error = "Error: you have not entered a " + key + " property.";
            }
        }
        return error;
    },
    search: function (query) {
        count = 0;
        var result = {};
        for (var id in this.db) {
            for (var key in this.db[id]) {
                if (query.include && (query.key == key && query.value == this.db[id][key])) {
                    result[count] = this.db[id];
                    count++;
                } else if (!query.include && query.value != this.db[id][key]) {
                    result[count] = this.db[id];
                    count++;
                }
            }
        }
        return result;
    },
    get_schema: function () {
        var text = "schema:"
        for (var property in this.schema) {
            text += "\n\t" + property + ": ";
            if (typeof (this.schema[property]) == "object") {
                for (var key in this.schema[property]) {
                    text += "\n\t\t" + key + ": " + JSON.stringify(this.schema[property][key]);
                }
            } else {
                text += this.schema[property];
            }
        }
        return text;
    },
    set_schema: function (property, key, value) {
        this.schema[property][key] = value;
    },
    schema: {
        name: { type: 'string', required: true, fallback: 'nuts' },
        age: { type: 'number', required: false },
        extra_properties: false
    }
};