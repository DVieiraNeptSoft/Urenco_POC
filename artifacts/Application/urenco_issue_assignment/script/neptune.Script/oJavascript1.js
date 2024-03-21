sap.n.Shell.attachBeforeDisplay(function(config) {
    var options;
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
    if (config) {
        console.log(config.data);
        // config.data.workorderno;
        modeloPanelOperations.setData(config.data);
        options = {
            parameters: {
                "where": '{ "workorderno": ' + config.data.workorderno + '}'
            }
        };

            
    } else {
        options = {
            parameters: {
                "where": '{ "workorderno": "816782"}'
            }
        };
    }

    // apioRestAPIGetDetails(options);    

});

function handleFreeBusy(r){
    console.log("Sched -->", r);
    let availableSlots = [];
    r.freeBusy.forEach(function (slot){
        if (slot.status === "free"){
            availableSlots.push(slot);
        }
    }); 
    if (availableSlots.length === 0){
        OpenoMessageBoxUserUnavailable();
        oVBoxAvailability.setVisible(false);  
        return;
    } 
    //debugger;
    availableSlots.forEach(function (slot){
        console.log(slot)
        
        // slot.start = moment(slot.start, "DD/MM/YYYY, HH:mm:ss");
        // slot.end = moment(slot.end, "DD/MM/YYYY, HH:mm:ss");
        /*** Abesh Fix Start***/
        slot.start = moment(slot.start).format("DD/MM/YYYY, HH:mm:ss");
        slot.end = moment(slot.end).format("DD/MM/YYYY, HH:mm:ss");
        /*** Abesh Fix End***/
    });     
        console.log("slotData", availableSlots)
        modeloListAvailability.setData(availableSlots);
      oVBoxAvailability.setVisible(true);  
    console.log(availableSlots);  


}

function clearPage(){
    oSelectUser.setSelectedKey();
    oVBoxAvailability.setVisible(false);
    oDatePicker.setValue();

}

