module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        id: { type: Number, default: 0 },
        location: String,
        date: String,
        time: String
      },
      { timestamps: true }
    );

// https://www.npmjs.com/package/mongoose-sequence
const AutoIncrement = require('mongoose-sequence')(mongoose);
schema.plugin(AutoIncrement, {inc_field: 'id'});
 
    /*
  If you use this app with a front-end that needs id field instead of _id, you have to override toJSON method that map default object to a custom object. So the Mongoose model could be modified as following code:
  */
    // schema.method("toJSON", function() {
    //   const { __v, _id, ...object } = this.toObject();
    //   object.id = _id;
    //   return object;
    // });
    const History = mongoose.model("history", schema);
    return History;
  };
  

