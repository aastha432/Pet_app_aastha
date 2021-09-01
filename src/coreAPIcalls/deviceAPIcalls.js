
export const setDeviceInfo = device => {
  /*const data= {
    "petName" : JSON.stringify(device.petName),
    "IMEI" : JSON.stringify(device.IMEI),
    "breed" : JSON.stringify(device.breed),
    "file" : device.file
  }*/
    return fetch(`https://petapp-backend.herokuapp.com/api/setdeviceinfo`, {
        method: "POST",
        headers: {
          "authorization": localStorage.getItem("jwt")
        },
        body: device
      })
        .then(response => {
          return response.json();
        })
        .catch(err => {
          console.log(err) ;
        });
  }


  export const getDeviceInfo = () => {
    return fetch(`https://petapp-backend.herokuapp.com/api/getdeviceinfo`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "authorization": localStorage.getItem("jwt")
        }
      })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
  }
