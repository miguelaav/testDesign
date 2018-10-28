var mongoose = require('mongoose');
// Setup schema
var testSchema = mongoose.Schema({
    /*
    name: String,
    apellido: String
    */
    
        created_at : String,
        title : {type:String, required:false,default:null},
        url : {type:String, required:false,default:null},
        author : String,
        points : {type:Number, required:false,default:null},
        story_text : {type:String, required:false,default:null},
        comment_text : String,
        num_comments : {type:Number, required:false,default:null},
        story_id : Number,
        story_title : String,
        story_url : String,
        parent_id : Number,
        created_at_i : Number,
        _tags : Array,
        objectID : String,
        _highlightResult : Object
    

});
// Export test model
var Test = module.exports = mongoose.model('tests', testSchema);
module.exports.get = function (callback, limit) {
    Test.find(callback).limit(limit);
}

