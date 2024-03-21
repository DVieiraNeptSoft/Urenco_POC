var data = modeloModelArrayDataIssue.getData();

console.log(data[0]);

modeloPanelConcernInfo.setData(data[0]);

oSelectComplexity.setSelectedKey(data[0].assessmentComplexity);
oSelectRisk.setSelectedKey(data[0].assessmentRisk);
oInputCost.setValue(data[0].assessmentCost);
oSelectProjectType.setSelectedKey(data[0].issueStatusID);

var options = {
    parameters: {
        where: JSON.stringify({ equipmentID: data[0].equipmentID }), 
    },
};

apioRestAPIGetEquipment(options);
