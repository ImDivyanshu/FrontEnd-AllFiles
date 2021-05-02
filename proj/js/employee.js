var id;

function fetchDevicesData() {
    fetch(`https://localhost:44327/api/employee/devices/${id}`, {
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + window.localStorage.getItem("token").toString(),
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer",
      })
        .then((res) => res.json())
        .then((data) => {
         let d = "";
          data.forEach((TempUser) => {
            console.log("Testing Employee"+ TempUser);
             d +=`<div class="col-xl-3 col-md-6 mb-4">
          <div class="card border-left-success shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                    ${TempUser.deviceName}</div>
                  <div class="h6 mb-0 font-weight-bold text-gray-800">${TempUser.uniqueCode}</div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-mobile fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
            <a href="#" class="btn btn-danger m-2" data-target="#myModals" data-toggle="modal">
               
              <span class="text">Report Issue</span>
            </a>
            <a href="#" class="btn btn-secondary m-2">
               
              <span class="text">Return Device</span>
            </a>
          </div>
        </div>`});
            
          document.getElementById('appendCard').innerHTML+=d;
          // do something with data
          console.log(data);
        })
        .catch(function (error) {
          console.log("Looks like there was a problem: \n", error);
        });
    
}

function onLoadEmployee(){
    console.log("What is Life?");
    id = window.localStorage.getItem("id").toString();
    fetchDevicesData();
}