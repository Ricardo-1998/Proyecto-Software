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
    //Inner Header Describe a que historia de usuario se le aplicara Testing

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
        it('');
    });

    //Inner Header Describe a que historia de usuario se le aplicara Testing
    describe('Historia de Usuario: Como usuario quiero poder iniciar sesión una vez para que si cierro la pagina web no me pida iniciar de nuevo,  a menos que yo como usuario le de a la opcion de cerrar sesión', function () {
        //Test-cases
        var email1 = 'emailprueba';
        it('Inicia Sesión sin errores del server', function (done) {
            chai.request(app)
                .post('/users/signin')
                .send({
                    email: 'acampos@gmail',
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
                .send({ email: 'acampos@gmail', password: 'pass1234' })
                .then(function (res) {
                    agent.get('/users/signin')
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
                    res.should.have.status(200);
                    res.should.be.html;
                    done();
                });

        });
        
    });

    describe('Historia de Usuario: Como usuario quiero poder realizar publicaciones', function () {
        //Test-cases
        it('');
        it('');
    });

    describe('Historia de Usuario: Como usuario necesito tener una contraseña para garantizar que mis datos estén seguros', function () {
        //Test-cases
        it('Poder logearme con las credenciales de un usuario', function(done){
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
        it('Autentificacion con clave unica', function (done) {
            chai.request(app)
                .post('/users/signin')
                .send({
                    email: 'marvin1234@gmail',
                    password: 'marvin1235'
                })
                .end(function (err, res) {
                    res.should.be.html;
                    done();
                });

        });
    });

});