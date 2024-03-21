var res_tab = [];
var struc;
var query = {};

const entity_issues = await entities.urenco_issues.createQueryBuilder("alias")
    // .where("alias.id = :id", {id: 1})
    .getMany();


for (i = 0; i < entity_issues.length; i++) {
    struc = entity_issues[i]

    //Issue Images
    var entity_issueImages = await entities.urenco_issueimages.createQueryBuilder("issueImages")
        .where("issueImages.issueID = :id", { id: entity_issues[i].issueID })
        .getMany();

    // Object.assign(struc, { issueImage: entity_issueImages[0].issueImage }); //append fields to the current structure

    //Locations
    var entity_locations = await entities.urenco_locations.createQueryBuilder("locations")
        .where("locations.locationID = :id", { id: entity_issues[i].locationID })
        .getMany();

    Object.assign(struc, { locationName: entity_locations[0].locationName }); //append fields to the current structure

    //Issue Status
    var entity_issueStatus = await entities.urenco_issuestatus.createQueryBuilder("issueStatus")
        .where("issueStatus.issueStatusID = :id", { id: entity_issues[i].issueStatusID })
        .getMany();

    Object.assign(struc, { issueStatus: entity_issueStatus[0].issueStatus }); //append fields to the current structure

    console.log(struc)
}

complete();