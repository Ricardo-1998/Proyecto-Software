function guardar() {
    let data =document.getElementById("nombre").value;
    let tbody = document.getElementsByClassName("posts")[0];
    let tr = document.createElement("tr");
    tr.className = "cancion";
    tr.id = "tr";
    tr.innerHTML = `<td>
                        <input id="nombre" name="nombre" value="${data}" type="text"></td>
                    <td>`;
    tbody.appendChild(tr)
};

window.onload = () => {
    app.init();
};
let app = {

    init: function () {
        this.recordatorio();
        this.mostrarForos();
        this.foroUser();
        this.mostrarrecordatorio();
    },

    recordatorio: function () {
        fetch('/api/play', {
            method: "GET"
        }).then(res => res.json())
            .then(respond => {
                //console.log(respond);
                let array = [];
                let len = respond.recordatorio.length;
                for (let i = 0; i < len; i++) {
                    let aut = respond.recordatorio[i].usuario;
                    array.push(aut);
                }
                var glob = document.getElementById("global12").innerText;
                var contrecordatorio = 0;
                array.forEach(element => {
                    contrecordatorio++;
                });
                for (let i = 0; i < contrecordatorio; i++) {
                    if (glob == respond.recordatorio[i].usuario) {
                        let data = {
                            id: (respond.recordatorio[i])._id,
                            titulo: (respond.recordatorio[i]).titulo,
                            extension: (respond.recordatorio[i]).imagenExtension,
                            usuario: respond.recordatorio[i].usuario
                        };
                        let divP = document.getElementById('recordatorio-U');
                        let div = document.createElement("div");
                        div.innerHTML = `<div class="col s6">
                                            <div class="card">
                                                <div class="card-image">
                                                    <img src="/images/${data.extension}" alt="imagenrecordatorio">
                                                    <h5>${data.titulo}</h5>
                                                    <p>Autor: ${data.usuario}</p>
                                                </div>
                                                <div class="card-action">
                                                    <a href="#" class="delete">Eliminar</a>
                                                </div>
                                            </div>
                                        </div>`;
                        div.getElementsByClassName("delete")[0].addEventListener("click", (event) => {
                            this.deleterecordatorio(event, data, div, divP);
                        });
                        divP.appendChild(div);
                    }
                }
            })
    },
    deleterecordatorio: (event, data, div, divP) => {
        event.preventDefault();
        console.log(data.id);
        fetch('/api/play/' + data.id, {
            method: 'DELETE'
        }).then(res => res.json())
            .then(res => {
                if (res.ok) {
                    divP.removeChild(div);
                }
            })
    },
    mostrarrecordatorio: function () {
        fetch('/api/play', {
            method: "GET"
        }).then(res => res.json())
            .then(response => {
                console.log(response);
                for (let i = 0; i < 1; i++) {
                    let data = {
                        tit: (response.recordatorio[i]).titulo,
                        img: (response.recordatorio[i]).imagenExtension,
                        usr: (response.recordatorio[i]).usuario,
                        galeria: (response.recordatorio[i]).galeria
                    };
                    let tbody = document.getElementById("div123");
                    let div2 = document.createElement("div");
                    var pub ="";
                    for(let j = 0; j< data.galeria.length; j++){                      
                        var pub = "<tr>"+"<td>"+data.galeria[j].nombre+"</td>"+"</tr>"+pub;
                    }
                    div = `<div class="card" style = "background-color: #40445a">
                                        <div class="card-content cancion3" >
                                            <img src = "images/${data.img}" style = "width: 100%">
                                            <h5>${data.tit}</h5>
                                            <p>${data.usr}</p>
                                            <table>
                                                <thead>
                                                    <th>Notas</th>
                                                </thead>
                                                <tbody>
                                                `;
                    div += pub+ "</tbody>"+"</table>"+"</div>"+"</div>"
                    div2.innerHTML = div;
                    tbody.appendChild(div2);
                }
            })
    },

    foroUser: function () {
        fetch('/api/post', {
            method: "GET"
        }).then(res => res.json())
            .then(respond => {
                let array = [];
                let len = respond.posts.length;
                for (let i = 0; i < len; i++) {
                    let aut = respond.posts[i].autor;
                    array.push(aut);
                }
                var glob = document.getElementById("global12").innerText;
                var contForos = 0;
                array.forEach(element => {
                    contForos++;
                });
                for (let i = 0; i < contForos; i++) {
                    if (glob == respond.posts[i].autor) {
                        let data = {
                            id: (respond.posts[i])._id,
                            tit: (respond.posts[i]).titulo,
                            cuer: (respond.posts[i]).texto,
                            aut: (respond.posts[i]).autor
                        };
                        let tbody = document.getElementById('profile-F');
                        let div = document.createElement("div");
                        div.innerHTML = `<div class="col s6" >
                                            <div class="card ">
                                                <div class="card-content grey lighten-1">
                                                    <h5>${data.tit}</h5>
                                                    <p>${data.cuer}</>
                                                </div>
                                                <div class="card-action">
                                                    <a href="#" class="delete">Eliminar</a>
                                                </div>
                                            </div>
                                        </div>`;
                        div.getElementsByClassName("delete")[0].addEventListener("click", (event) => {
                            this.deleteForos(event, data, div, tbody);
                        });
                        tbody.appendChild(div);
                    }
                }
            })
    },
    deleteForos: (event, data, div, tbody) => {
        event.preventDefault();
        fetch('/api/post/' + data.id, {
            method: 'DELETE'
        }).then(res => res.json())
            .then(res => {
                if (res.ok) {
                    tbody.removeChild(div);
                }
            })
    },
    mostrarForos: function () {
        fetch('/api/post', {
            method: "GET"
        }).then(res => res.json())
            .then(response => {
                //var respo = [];
                // respo.add(response[i])
                let cont = 1;
                for (let i = 0; i < 3; i++) {
                    //respo.add(respones.posts[i]);
                    let idd = 'modal';

                    let hash = '#';
                    //console.log(response.posts);
                    let data = {
                        tit: (response.posts[i]).titulo,
                        cuer: (response.posts[i]).texto,
                        aut: (response.posts[i]).autor
                    };
                    let tbody = document.getElementById("sec1");
                    let div = document.createElement("div");
                    div.innerHTML = `<div class="sectionn">
                                    <div class="">
                                        <div class="card-panel" style = "background-color: #40445a">
                                            <a class="linkss waves-effect waves-light btn modal-trigger" href="${hash + idd + cont}">
                                                ${data.tit}</a>
                                            <a class="linkss waves effect waves-light">${data.aut}</a>
                                            <p>${data.cuer}</p>       
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
                    cont = cont + 1;
                    tbody.appendChild(div);
                }
            })
    }
}

function mostrar0(cant1,cant2,estado) {
    
    fetch('/api/post', {
        method: "GET"
    }).then(res => res.json())
        .then(response => {
            //var respo = [];
            // respo.add(response[i])
            let parent = document.getElementById("sec1");
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            };
            parent.innerHTML = `<ul class="pagination" style="position: absolute; left: 25%; bottom: 0;">                           
                                    <li class="waves-effect"><a href="#!" onClick="mostrar0(0,3,1)">1</a></li>
                                    <li class="waves-effect"><a href="#!" onClick="mostrar0(3,6,2)">2</a></li>
                                    <li class="waves-effect"><a href="#!" onClick="mostrar0(6,9,3)">3</a></li>
                                    <li class="waves-effect"><a href="#!" onClick="mostrar0(9,12,4)">4</a></li>
                                    <li class="waves-effect"><a href="#!" onClick="mostrar0(12,15,5)">5</a></li>
                                </ul>`;
            let cont = 1;
            console.log(response.length);
            for (let i = cant1; i < cant2; i++) {
                //respo.add(respones.posts[i]);
                let idd = 'modal';

                let hash = '#';
                console.log(response.posts);
                let data = {
                    tit: (response.posts[i]).titulo,
                    cuer: (response.posts[i]).texto,
                    aut: (response.posts[i]).autor
                };
                let tbody = document.getElementById("sec1");
                let div = document.createElement("div");
                div.innerHTML = `<div class="sectionn">
                                    <div class="">
                                    <div class="card-panel" style = "background-color: #40445a">
                                    <a class="linkss waves-effect waves-light btn modal-trigger" href="${hash + idd + cont}">
                                        ${data.tit}</a>
                                    <a class="linkss waves effect waves-light">${data.aut}</a>
                                    <p>${data.cuer}</p>       
                                    </div>
                                </div>
                                    </div>
                                </div>`;
                cont = cont + 1;
                tbody.appendChild(div);
            }
        })
}
