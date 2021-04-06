let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const { DateTime } = require("luxon");
var AuthorSchema = new Schema({
    first_name: {type: String, required: true, maxlength:100},
    family_name: {type: String, required: true, maxlength: 100},
    date_of_birth: {type:Date},
    date_of_death: {type: Date}
});

AuthorSchema
.virtual('name')
.get(function() {
    return this.family_name + ', ' + this.first_name;
});

AuthorSchema
.virtual('lifespan')
.get(function() {
    let birthDate = this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
    let deathDate = this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';
    //return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
   
    return birthDate + ' - ' + deathDate;
    
});

AuthorSchema
.virtual('url')
.get(function() {
    return '/catalog/author/' + this._id;
});

AuthorSchema
.virtual('edit_birth_date')
.get(function() {
    return DateTime.fromJSDate(this.date_of_birth).toFormat("yyyy'-'LL'-'dd"); 
});

AuthorSchema
.virtual('edit_death_date')
.get(function() {
    return DateTime.fromJSDate(this.date_of_death).toFormat("yyyy'-'LL'-'dd"); 
});

module.exports = mongoose.model('Author', AuthorSchema);