//imports necesarios
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const bcrypt = require('bcrypt');
// para facilitar el suo de 'should'
const should = chai.should();
//imports de controladores para usarlos en cada test-case
const publicaciones = require('../controllers/publicacionController');
const user = require('../controllers/userControllers');
const recordatorios = require('../controllers/recordatorioController');

chai.use(chaiHttp);

// Header principal de las pruebas. describe el sitio web como tal
describe('Unit Testing  -  Goth: Sitio de Foros', function () {

    describe('Funcionalidad General del Sitio Web', function () {
        //Test-cases
        it('Se puede conectar con el servidor y este devuelve el contenido html de la pagina', function (done) {
            chai.request(app)
                .get('/')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.html;
                    done();
                })
        });
    });

    describe('Historia de Usuario: Como usuario quiero poder iniciar sesión una vez para que si cierro la pagina web no me pida iniciar de nuevo,  a menos que yo como usuario le de a la opcion de cerrar sesión', function () {
        //Test-cases
        it('Inicia Sesión sin errores del server', function (done) {
            chai.request(app)
                .post('/users/signin')
                .send({
                    email: 'campos96@gmail',
                    password: 'pass1234'
                })
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.html;
                    done();
                });

        });
        it('Se comprueba que se mantiene la sesion conectada', function (done) {
            var agent = chai.request.agent(app);
            agent.post('/users/signin')
                .send({ email: 'campos96@gmail', password: 'pass1234' })
                .then(function (res) {
                    agent.get('/users/profile')
                        .then(function (res2) {
                            res2.should.have.status(200);
                            done();
                        });
                });
        });
    });

    describe('Historia de Usuario: Como usuario necesito crear un perfil dentro del sistema para poder acceder a todas las funcionalidades del mismo', function () {
        //Test-cases
        it('Poder crear un usuario nuevo', function (done) {
            let data = {
                email: 'marvin1234@gmail',
                password: 'marvin1234',
                username: 'marvin',
                seguridad: {
                    pregunta: 'su perro',
                    respuesta: 'fido'
                },
                nombre: 'marvin',
                apellido: 'mejia',
                sexo: 'masculino',
                cuenta: 'lector',
                imagen: '/images/pf.png'
            }
            chai.request(app)
                .get('/users/signup')
                .send(data)
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.html;
                    done();
                });

        });
        it('Poder logearme con las credenciales del nuevo usuario', function (done) {
            chai.request(app)
                .post('/users/signin')
                .send({
                    email: 'marvin1234@gmail',
                    password: 'marvin1234'
                })
                .end(function (err, res) {
                    res.should.be.html;
                    done();
                });

        });

    });

    describe('Historia de Usuario: Como usuario quiero poder realizar publicaciones', function () {
        //Test-cases
        it('Poder definir filtros especificos y ver que muestre lo pedido', function (done) {
            var agent = chai.request.agent(app);
            agent.post('/users/signin')
                .send({
                    email: 'campos96@gmail',
                    password: 'pass1234'
                })
                .then(function (res) {
                    agent.post('/api/post')
                        .send({
                            titulo: 'tituloejemplo',
                            texto: 'textoejemploloreminrewr'
                        })
                        .then(function (res2) {
                            // should get status 200, which indicates req.session existence.
                            res2.should.have.status(200);
                            done();
                        });
                });
        });
        it('Poder ingresar multiples filtros y que no tengan conflicto', function (done) {
            var agent = chai.request.agent(app);
            agent.post('/users/signin')
                .send({
                    email: 'campos96@gmail',
                    password: 'pass1234'
                })
                .then(function (res) {
                    agent.post('/api/post')
                        .send({
                            titulo: 'juegos',
                            texto: 'juegosprueba'
                        })
                        .then(function (res2) {
                            // should get status 200, which indicates req.session existence.
                            res2.should.have.status(200);
                            done();
                        });
                });
        });
    });


    describe('Historia de Usuario: Como usuario necesito tener una contraseña para garantizar que mis datos estén seguros', function () {
        //Test-cases
        it('Poder logearme con las credenciales de un usuario', function (done) {
            chai.request(app)
                .post('/users/signin')
                .send({
                    email: 'campos96@gmail',
                    password: 'pass1234'
                })
                .end(function (err, res) {
                    res.should.be.html;
                    done();
                });
        });
        it('Autentificacion con clave unica', function (done) {
            chai.request(app)
                .post('/users/signin')
                .send({
                    email: 'campos96@gmail',
                    password: 'marvin1235'
                })
                .end(function (err, res) {
                    res.should.have.status(500)
                    res.should.be.html;
                    done();
                });

        });
    });

    describe('Historia de Usuario: Como usuario quiero poder crear estados', function () {
        //Test-cases
        it('Poder ver todos mis estados', function (done) {
            var agent = chai.request.agent(app);
            agent.post('/users/signin')
                .send({
                    email: 'campos96@gmail',
                    password: 'pass1234'
                })
                .then(function (res) {
                    agent.get('/recordatorio')
                        .then(function (res2, err) {
                            // should get status 200, which indicates req.session existence.
                            if (err) {
                                console.log(err);
                            }
                            else {
                                res2.should.have.status(200);
                                done();
                            }
                        });
                });
        });
        it('Poder eliminar un estado', function (done) {
            var agent = chai.request.agent(app);
            agent.post('/users/signin')
                .send({
                    email: 'campos96@gmail',
                    password: 'pass1234'
                })
                .then(function (res) {
                    agent.get('/api/play')
                        .send({ params: { id: 1 } })
                        .then(function (res2, err) {
                            // should get status 200, which indicates req.session existence.
                            if (err) {
                                console.log(err);
                            }
                            else {
                                res2.should.have.status(200);
                                done();
                            }
                        });
                });
        });
    });

    describe('Historia de Usuario: Como usuario deseo poder administrar mis publicaciones y estados', function () {
        //Test-cases
        it('Poder crear publicaciones', function (done) {
            var agent = chai.request.agent(app);
            agent.post('/users/signin')
                .send({
                    email: 'campos96@gmail',
                    password: 'pass1234'
                })
                .then(function (res) {
                    agent.post('/api/post')
                        .send({
                            titulo: 'educacion',
                            texto: 'educativo'
                        })
                        .then(function (res2) {
                            // should get status 200, which indicates req.session existence.
                            res2.should.have.status(200);
                            done();
                        });
                });
        });
        it('Poder eliminar publicaiones creadas', function (done) {
            var agent = chai.request.agent(app);
            agent.post('/users/signin')
                .send({
                    email: 'campos96@gmail',
                    password: 'pass1234'
                })
                .then(function (res) {
                    agent.post('/api/post')
                        .send({params: { id: 1 } })
                        .then(function (res2) {
                            // should get status 200, which indicates req.session existence.
                            res2.should.have.status(200);
                            done();
                        });
                });
        });
    });
});