const clientId = "78c9f7c5-a236-41fd-b4c2-3a5000d26c7e";
const tenantId = "8fdb51da-e45d-423f-ae33-cf92118d5311";
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const freeBusyMap = ["free", "tentative", "busy", "out of office", "working elsewhere"]; // 0 - free, 1 - tentative, 2 - busy etc etc

const msalConfig = {
    auth: {
        clientId: clientId,
        authority: `https://login.microsoftonline.com/${tenantId}`,
        redirectUri: "https://gtmdemosystem.neptune-software.cloud/",
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    },
};

const loginScopes = {
    scopes: ["openid", "User.Read", "Calendars.Read"],
};

const requestScopes = {
    scopes: ["Calendars.Read"],
};

async function signInandGetFreeTime(startTime, endTime, email, interval) {
    const aadApplication = new msal.PublicClientApplication(msalConfig);
    const currentAccounts = aadApplication.getAllAccounts();
    if (currentAccounts.length > 0) {
        accountId = currentAccounts[0].homeAccountId;
        let tokenRequest = requestScopes;
        tokenRequest.account = accountId;
        try {
            var response = await aadApplication.acquireTokenSilent(tokenRequest);
            console.log("resp", response);
            var retData = await getFreebusy(
                startTime,
                endTime,
                email,
                interval,
                response.accessToken
            ).catch((e) => {
                console.log("Error : ", e.error.message);
            });
        } catch (err) {
            if (err instanceof msal.InteractionRequiredAuthError) {
                var response = aadApplication.acquireTokenPopup(loginScopes);
                console.log("auth token", response);
                var retData = await getFreebusy(
                    startTime,
                    endTime,
                    email,
                    interval,
                    response.accessToken
                ).catch((e) => {
                    console.log("Error : ", e.error.message);
                });
            } else {
                console.log("Error : " + err.error.message);
            }
        }
    } else {
        var response = await aadApplication.loginPopup(loginScopes);
        var retData = await getFreebusy(
            startTime,
            endTime,
            email,
            interval,
            response.accessToken
        ).catch((e) => {
            console.log("Error : ", e.error.message);
        });
    }
    if (retData) return formatAvailability(retData, startTime, endTime, interval);
    else return null;
}

async function getFreebusy(startTime, endTime, email, interval, token) {
    var dataBody = {
        Schedules: [email],
        StartTime: {
            dateTime: startTime,
            timeZone: timeZone,
        },
        EndTime: {
            dateTime: endTime,
            timeZone: timeZone,
        },
        availabilityViewInterval: interval,
    };

    const endpoint = "https://graph.microsoft.com/v1.0/me/calendar/getSchedule";
    const headers = { Authorization: token, Prefer: `outlook.timezone="${timeZone}"` };
    //const headers = { Authorization: token};
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: endpoint,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(dataBody),
            headers,
            success: (data) => {
                //console.log("here is data", data);
                resolve(data.value[0]);
            },
            error: (error) => {
                reject(error.responseJSON);
            },
        });
    });
}

function formatAvailability(retData, startTime, endTime, interval) {
    var timeSlots = getTimeSlots(startTime, endTime, interval);
    var tsArray = retData.availabilityView.split("");
    var ts = tsArray.map((itm) => freeBusyMap[itm]);
    const mergedTSArr = timeSlots.map((obj, index) => {
        return { ...obj, status: ts[index] };
    });
    retData.freeBusy = mergedTSArr;
    return retData;
}

function getTimeSlots(startTime, endTime, availabilityViewInterval) {
    const timeSlots = [];
    const intervalMs = availabilityViewInterval * 60 * 1000;
    const start = new Date(startTime);
    const end = new Date(endTime);
    let slotStart = start;
    while (slotStart < end) {
        const slotEnd = new Date(slotStart.getTime() + intervalMs);
        timeSlots.push({ start: slotStart.toLocaleString(), end: slotEnd.toLocaleString() });
        slotStart = slotEnd;
    }
    return timeSlots;
}

function convertTZ(date) {
    return new Date(
        (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
            timeZone: timeZone,
        })
    );
}
