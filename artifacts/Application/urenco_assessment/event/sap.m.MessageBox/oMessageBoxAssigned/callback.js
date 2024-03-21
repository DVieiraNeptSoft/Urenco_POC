
var options = {
    parameters: {
        "where": '{ "workorderno": ' + modeloPage.getData().workorderno + '}' // Optional 
    },
    data: {
        //"id": "",
        //"workorderno": "",
        //"description": "",
        "duedate": oDatePicker.getDateValue(),
        //"duration": "",
        //"activitytype": "",
        //"plannergroupplant": "",
        //"workcenterplant": "",
        "assignedto": oSelectUser.getSelectedKey(),
        "status": "ASSIGNED",
        //"createdAt": "",
        //"createdBy": "",
        //"updatedAt": "",
        //"updatedBy": ""
    }
};

apioRestAPISetWOStatus(options);
clearPage();
AppCache.Back();