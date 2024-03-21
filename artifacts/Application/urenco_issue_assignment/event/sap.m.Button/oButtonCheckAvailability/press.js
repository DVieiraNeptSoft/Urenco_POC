if (oSelectUser.getSelectedKey() === "Select Engineer" || oDatePicker.getDateValue() === null){
    OpenoMessageBoxUserNTime();
    return;
}

const email = oSelectUser.getSelectedKey();
// const timeSlotInterval = parseInt(modeloPage.getData().duration) * 60;
const timeSlotInterval = 1 * 60;
const date = moment(oDatePicker.getDateValue()).format("YYYY-MM-DD");
const startTime = new Date(date + "T09:00:00");
const endTime = new Date(date + "T18:00:00"); 

signInandGetFreeTime(startTime, endTime, email, timeSlotInterval)
    .then((r) => handleFreeBusy(r))
    .catch((r) => console.log("Error -->", r));