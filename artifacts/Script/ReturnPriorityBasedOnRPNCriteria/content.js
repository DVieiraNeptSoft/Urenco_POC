const data = req.body;

log.info("Data:")
log.info(req.body.data)

// var data = {"data":'50,In line rework,0,< 10mins / Ontime TAKT'}

var dataArray = data.data.split(",");

console.log("dataArray:")
console.log(dataArray);

log.info("dataArray:");
log.info(dataArray);

const fpv_values_table = await entities.fpv_values.createQueryBuilder("alias").getMany();

var FPVvalue = "0-0.2";

for (i = 0; i < fpv_values_table.length; i++) {
    if (fpv_values_table[i].upTo < dataArray[2]) {
        FPVvalue = fpv_values_table[i].Value;
    } else {
        FPVvalue = fpv_values_table[i].Value;
        break;
    }
}

console.log("FPVvalue:")
console.log(FPVvalue);

log.info("FPVvalue:");
log.info(FPVvalue);
//dataArray[0]
//dataArray[1]
//dataArray[3]

const {
    MoreThanOrEqual,
} = operators;

const entity = await entities.urenco_rpnscorecalculations.findOne(
    {
        "MPAscore": dataArray[0],
        "ReqdRework": dataArray[1],
        // "FPV": MoreThanOrEqual(FPVvalue),
        "FPV": FPVvalue,
        "TimeImpact": dataArray[3]
    });



result = entity;

log.info("entity:");
log.info(entity);

complete();