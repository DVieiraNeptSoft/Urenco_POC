sap.n.Shell.attachBeforeDisplay(function(config) {
    var options;
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
    if (config) {
        console.log(config.data);
        // config.data.workorderno;
        // modeloPage.setData(config.data);
        // modeloPanelAssignment.setData(config.data);
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
    // debugger;
    availableSlots.forEach(function (slot){
        console.log(slot)
        
        slot.start = moment(slot.start, "DD/MM/YYYY, HH:mm:ss");
        slot.end = moment(slot.end, "DD/MM/YYYY, HH:mm:ss");
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

function formatDate(dateString) {
  const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4}),\s(\d{2}):(\d{2}):(\d{2})$/;
  const match = regex.exec(dateString);
  if (match) {
    const day = match[1].padStart(2, '0');
    const month = match[2].padStart(2, '0');
    const year = match[3];
    const hours = match[4].padStart(2, '0');
    const minutes = match[5].padStart(2, '0');
    const seconds = match[6].padStart(2, '0');
    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
  } else {
    return null;
  }
}
