const entity = await entities.urenco_issues.createQueryBuilder("alias")
    // .where("alias.id = :id", {id: 1})
    .getOne();

var entityCatalog = Object.keys(entity); //Get Field names

console.log("Names for Field Catalog:");
console.log(entityCatalog);

var fieldCatalog = [],
    fieldCatalog_struc = {};


for (i = 0; i < entityCatalog.length; i++) {
    fieldCatalog_struc = { name: entityCatalog[i], label: entityCatalog[i], type: "text" }

    fieldCatalog.push(fieldCatalog_struc);
}

fieldCatalog.push({ name: "issueStatus", label: "issueStatus", type: "text" });
fieldCatalog.push({ name: "issueScoreColor", label: "issueScoreColor", type: "text" });

console.log("Field Catalog:")
console.log(fieldCatalog)

result.data = fieldCatalog;

complete();
