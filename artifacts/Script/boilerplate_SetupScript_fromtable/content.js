// SETUP!

// Get one record, so we know the properties:
const entity = await entities.[TABLE NAME].createQueryBuilder("alias")
    .getOne();

//Map Field names
var entityCatalog = Object.keys(entity); 

// *
// console.log("Names for Field Catalog:");
// console.log(entityCatalog);

var fieldCatalog = [],
    fieldCatalog_struc = {};


for (i = 0; i < entityCatalog.length; i++) {
    fieldCatalog_struc = {name: entityCatalog[i], label: entityCatalog[i], type: "text"}
    fieldCatalog.push(fieldCatalog_struc);
}

fieldCatalog.push({name: "issueStatus", label: "issueStatus", type: "text"});

//*
// console.log("Field Catalog:")
// console.log(fieldCatalog)

result.data = fieldCatalog;

complete();

// -------------

// RUN!