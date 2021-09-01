
export const ListAllDevices = () => {
    return fetch(`https://dashboard.hologram.io/api/1/devices?apikey=3C5RA1S9M8at5M3Ikv3tiTItnUqBBV`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then((res) => {return res.json()})
    .catch(err => {console.log(err)})
  }

  export const ListAllDevicesName = () => {
    return fetch(`https://dashboard.hologram.io/api/1/devices/names?apikey=3C5RA1S9M8at5M3Ikv3tiTItnUqBBV`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then((res) => {console.log(res.json())})
    .catch(err => {console.log(err)})
  }

export const ListAllDevicesLocation = () => {
    return fetch(`https://dashboard.hologram.io/api/1/devices/locations?apikey=3C5RA1S9M8at5M3Ikv3tiTItnUqBBV`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then((res) => {console.log(res.json())})
    .catch(err => {console.log(err)})
  }

  export const UpdateDevice = (deviceid, device) => {
    return fetch(`https://dashboard.hologram.io/api/1/devices/${deviceid}?apikey=3C5RA1S9M8at5M3Ikv3tiTItnUqBBV&orgid=40962`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body : JSON.stringify(device)
    })
    .then((res) => {return res.json()})
    .catch(err => {console.log(err)})
  }


 export const RetrieveDevice = (deviceid) => {
  return fetch(`https://dashboard.hologram.io/api/1/devices/${deviceid}?apikey=3C5RA1S9M8at5M3Ikv3tiTItnUqBBV`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
  .then((res) => {
    return res.json()})
  .catch(err => {console.log(err)})
  }

  export const ListDeviceTags = () => {
    return fetch(`https://dashboard.hologram.io/api/1/devices/tags?apikey=3C5RA1S9M8at5M3Ikv3tiTItnUqBBV`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then((res) => {console.log(res.json())})
    .catch(err => {console.log(err)})
  }

  export const CreateDeviceTags = (tag) => {
    return fetch(`https://dashboard.hologram.io/api/1/devices/tags?apikey=3C5RA1S9M8at5M3Ikv3tiTItnUqBBV`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body : JSON.stringify(tag)
    })
    .then((res) => {console.log(res.json())})
    .catch(err => {console.log(err)})
  }

  export const AddTagtoDevice = (tagid) => {
    return fetch(`https://dashboard.hologram.io/api/1/devices/tags/${tagid}/link?apikey=3C5RA1S9M8at5M3Ikv3tiTItnUqBBV`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then((res) => {console.log(res.json())})
    .catch(err => {console.log(err)})
  }

  export const RemoveTagfromDevice = (tagid) => {
    return fetch(`https://dashboard.hologram.io/api/1/devices/tags/${tagid}/unlink?apikey=3C5RA1S9M8at5M3Ikv3tiTItnUqBBV`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then((res) => {console.log(res.json())})
    .catch(err => {console.log(err)})
  }

  export const DeleteDeviceTag = (tagid) => {
    return fetch(`https://dashboard.hologram.io/api/1/devices/tags/${tagid}?apikey=3C5RA1S9M8at5M3Ikv3tiTItnUqBBV`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then((res) => {console.log(res.json())})
    .catch(err => {console.log(err)})
  }




  




  