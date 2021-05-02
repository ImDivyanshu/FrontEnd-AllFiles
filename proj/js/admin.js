var category= 1;
function onLoadAdmin(){
 fetchFree()
}


function fetchFree(){
	fetch(`https://localhost:44327/api/deviceinfo/data?isAssigned=false&&categoryId=${category}`,{
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer'
    }
    )
    .then(res => res.json())
    .then(data => {
        console.log(data);
        let li = ` <thead><tr>
        <th scope="col">Device Name</th>
        
        <th scope="col">Unique Code </th>
        <th scope="col">Action</th>
      </tr> </thead>`;
                data.forEach(TempUser => {
                   // console.log(user);
                li += ` <tr>
                <td data-label="Device Name">${TempUser.deviceName}</td>
              
                <td data-label="Unique Code">${TempUser.uniqueCode}</td>
                <td data-label="Action">
                
                </td>
              </tr>`
				});

	document.getElementById('Table').innerHTML=li;
});
document.getElementById("free").style.backgroundColor="black";
document.getElementById("free").style.color="white";
document.getElementById("allocated").style.backgroundColor="gray";
}

function fetchAllocated(){
    fetch(`https://localhost:44327/api/deviceinfo/data?isAssigned=true&&categoryId=${category}`, {
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
          console.log(data);
        let li = `
        <thead>
            <tr>
              <th scope="col">Device Name</th>
              <th scope="col">Unique Code</th>
              <th scope="col">Assigned To</th>
              <th scope="col">Assigned Date</th>
              <th scope="col">Assigned By</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
        `;
        data.forEach((TempUser) => {
          // console.log(user);
          li += `  <tr>
          <td data-label="Device Name">${TempUser.deviceName}</td>
          <td data-label="Unique Code">${TempUser.uniqueCode}</td>
          <td data-label="Assigned To">${TempUser.employeeEmail}</td>
          <td data-label="Assigned Date">${TempUser.assignedDate.slice(0,10)}</td>
          <td data-label="Assigned By">${TempUser.assignedBy}</td>
          <td data-label="Action"></td>
        </tr>`;
        });
        document.getElementById("Table").innerHTML = li;
  
        // do something with data
        console.log(data);
      })
      .catch(function (error) {
        console.log("Looks like there was a problem: \n", error);
      });
      document.getElementById("allocated").style.backgroundColor="black";
      document.getElementById("allocated").style.color="white";
      document.getElementById("free").style.backgroundColor="gray";
          }


function addDeviceDashboard(){
    fetch(`https://localhost:44327/api/deviceinfo/categorylist`, {
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
          console.log(data);
        let li = "<option selected disabled>Select a Device Category</option>";
        data.forEach((TempUser) => {
          // console.log(user);
          li += ` <option value="${TempUser.categoryId}">${TempUser.deviceType}</option>`;
        });
        document.getElementById("categoryDropdown").innerHTML = li;
  
        // do something with data
        console.log(data);
      })
      .catch(function (error) {
        console.log("Looks like there was a problem: \n", error);
      });
}


function addDeviceModal(){
    var unique = document.getElementById("uniquecode").value;
  var device = document.getElementById("newDeviceName").value;
  var type=document.getElementById("categoryDropdown").value;

var newDeviceInfo = {
    uniqueCode: unique,
    deviceName: device,
    categoryId:type
}
console.log(newDeviceInfo);
  fetch("https://localhost:44327/api/deviceInfo/addDevice", {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(newDeviceInfo),
  })
    .then((response) => response.text())
    .then((response) => {
      console.log("Bearer " + response);
      var obj = JSON.parse(response);

    });

}
