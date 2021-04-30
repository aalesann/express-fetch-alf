console.log("idExample: 3302ccbc-13de-4b97-af74-d8dd53778548")
// Crear una carpeta a partir de su id.
const btnCrear = document.querySelector('#btn-crear')
btnCrear.addEventListener('click', (e) => {
    e.preventDefault();

    const username = "admin";
    const password = "12345";
    const nameFolder = document.querySelector('#name-folder').value;
    const idNodoCrear = document.querySelector('#idNodoCrear').value;

    if (idNodoCrear.trim() === ""
        || nameFolder.trim() === ""
    ) return alert('Revise los campos y vuelva a intentar')

    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(`${username}:${password}`))
    fetch(`http://localhost:80/alfresco/api/-default-/public/alfresco/versions/1/nodes/${idNodoCrear}/children`,
        {
            method: 'POST',
            body: JSON.stringify({
                "name": nameFolder,
                "nodeType": "cm:folder"
            }),
            headers
        })
        .then(resp => resp.json())
        .then(resp => {
            const { entry } = resp;
            console.log(entry)
            alert("Presiona F12 para ver la respuesta en consola.")


        })
        .catch(err => console.log("Error al crear carpeta: ", err))

    // Example es sólo para tener referencia de lo que devuelve el fetch
    const example = `
        {
            "aspectNames": [
                "cm:auditable"
            ],
            "createdAt": "2021-04-20T18:29:37.081+0000",
            "isFolder": true,
            "isFile": false,
            "createdByUser": {
                "id": "admin",
                "displayName": "Administrator"
            },
            "modifiedAt": "2021-04-20T18:29:37.081+0000",
            "modifiedByUser": {
                "id": "admin",
                "displayName": "Administrator"
            },
            "name": "Carpeta con Espacios",
            "id": "4360ffd7-0382-43cb-9f7b-330f49216bf0",
            "nodeType": "cm:folder",
            "parentId": "8669e6d9-39b3-45bd-8fe3-69c8909fbc30"
        }
        `

});
// 

// Obtener información de un nodo a partir de su id.
const btnObtener = document.querySelector('#btn-obtener')
btnObtener.addEventListener('click', (e) => {
    e.preventDefault();

    const idNodoObtener = document.querySelector('#idNodoObtener').value;
    if (idNodoObtener.trim() === "") return alert('Ingrese un valor correcto');
    const username = "admin";
    const password = "12345";

    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(`${username}:${password}`))

    var requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };

    fetch(`http://127.0.0.1/alfresco/api/-default-/public/alfresco/versions/1/nodes/${idNodoObtener}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            result.entry.createdAt = moment(result.entry.createdAt).format('DD/MM/YYYY - HH:MM')
            result.entry.modifiedAt = moment(result.entry.modifieddAt).format('DD/MM/YYYY - HH:MM')
            console.log(result);
            alert("Presiona F12 para ver resultado en consola.")
        })
        .catch(error => console.log('Error al obtener info del nodo: ', error));

});
// 

// Obtener información de hijos de un nodo a partir de su id.
const btnInfoChildrens = document.querySelector('#btn-info-hijos')
btnInfoChildrens.addEventListener('click', (e) => {
    e.preventDefault();

    const idNodoObtener = (document.querySelector('#id-obtener-hijos').value).trim();
    if (idNodoObtener.trim() === "") return alert("Debe ingresar un valor.")
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic YWRtaW46MTIzNDU=");
    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`http://127.0.0.1/alfresco/api/-default-/public/alfresco/versions/1/nodes/${idNodoObtener}/children`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log("result: ", result)
            mostrarInfoNodos(result);
        })
        .catch(error => console.log('Error al obtener info de nodos hijos: ', error));

});
// 

// Mostrar info de nodos a partir de un id.
const mostrarInfoNodos = ({ list }) => {
    const bodyTablaInfo = document.querySelector('#bodyTablaInfo')
    const { entries } = list;

    let template = '';
    entries.forEach(({ entry }) => {
        template += `
            <tr>
                <td>${entry.name}</td>
                <td>${entry.id}</td>
                <td>${entry.nodeType}</td>
                <td>${entry.isFolder}</td>
                <td>${entry.isFile}</td>
                <td>${entry.parentId}</td>
                <td><button type="button" id="${entry.id}" name="${entry.id}" class="btn btn-outline-primary" onclick="descargarArchivo(event)">
                    Descargar
                </button>
                </td>
            </tr>
        `;
    });

    bodyTablaInfo.innerHTML = template;
}


