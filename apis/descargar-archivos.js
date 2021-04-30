


//   =================================================
//          PASO 3-DESCARGA DEL ARCHIVO BLOB
//   =================================================
const downloadBlob = async (blob, name) => {
    // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
    const blobUrl = URL.createObjectURL(blob);
    // Create a link element
    const link = document.createElement("a");

    // Set link's href to point to the Blob URL
    link.href = blobUrl;
    link.download = name;

    // Append link to the body
    document.body.appendChild(link);

    // Dispatch click event on the link
    // This is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        })
    );

    // Remove link from body
    document.body.removeChild(link);
}



//   ==============================================
//         PASO 2 - OBTENER ARCHIVO ZIP (GET)
//   ==============================================
const obtenerArchivoBlobZip = async (downloadId) => {

    console.log("ID DEL GET: ", downloadId)
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic YWRtaW46MTIzNDU=");
    // myHeaders.append("accept", "application/json")


    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };

    const data = await fetch(`http://127.0.0.1/alfresco/api/-default-/public/alfresco/versions/1/${downloadId}/content`, requestOptions)
    const blob = await data.blob();
    return blob;

}


//   ==============================================
//        PASO 1 - GENERACIÓN ID DEL ZIP (POST)
//   ==============================================
const obtenerIdZip = async (idZip) => {

    const username = "admin";
    const password = "12345";

    // myHeaders.append('Authorization', 'Basic ' + btoa(`${username}:${password}`))
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic YWRtaW46MTIzNDU=");
    myHeaders.append("Content-Type", "application/json")

    let requestOptions = {
        method: 'POST',
        body: JSON.stringify({ "nodeIds": [idZip] }),
        headers: myHeaders,
        redirect: 'follow'
    };

    const data = await fetch(`http://127.0.0.1/alfresco/api/-default-/public/alfresco/versions/1/downloads`, requestOptions)
    const { entry } = await data.json()
    const { id } = entry;
    console.log("ID DEL POST: ", id)
    return id
}


const descargarArchivo = async (e) => {
    e.preventDefault();
    // id obtenido al hacer click en el botón descargar
    const { id } = e.target;
    console.log("ID: ", id)
    // const idZip = await obtenerIdZip(id);
    const blob = await obtenerArchivoBlobZip(id);
    await downloadBlob(blob, "archivo.zip")
};


