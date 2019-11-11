//imports necesarios
const chai= require('chai');
const chaiHttp= require('chai-http');
const app= require('../app');
// para facilitar el suo de 'should'
const should= chai.should();
//imports de controladores para usarlos en cada test-case
const publicaciones= require('../controllers/publicacionController');
const user= require('../controllers/userControllers');
const recordatorios= require('../controllers/recordatorioController');

chai.use(chaiHttp);

// Header principal de las pruebas. describe el sitio web como tal
describe('Unit Testing  -  Goth: Sitio de Foros', function(){
    //Inner Header Describe a que historia de usuario se le aplicara Testing
    
    describe('Funcionalidad General del Sitio Web', function(){
        //Test-cases
        it('Se puede conectar con el servidor y este devuelve el contenido html de la pagina', function(done){
            chai.request(app)
            .get('/')
            .end(function(err,res){
                res.should.have.status(200);
                res.should.be.html;
                done();
            })
        });
        it('');
    });
    
    //Inner Header Describe a que historia de usuario se le aplicara Testing
    describe('Historia de Usuario: Como usuario quiero poder iniciar sesión una vez para que si cierro la pagina web no me pida iniciar de nuevo,  a menos que yo como usuario le de a la opcion de cerrar sesión', function(){
        //Test-cases
        var email1='emailprueba';
        it('Inicia Sesión sin errores del server', function(done){
            chai.request(app)
            .post('/users/signin')
            .send({
            email: 'acampos@gmail',
            password: 'pass1234'})
            .end(function(err,res){
                res.should.have.status(200);
                res.should.be.html;
                done();
            });

        });
        it('');
    });
    
    describe('Historia de Usuario: Como usuario quiero poder realizar publicaciones', function(){
        //Test-cases
        it('');
        it('');
    });
    
    describe('Historia de Usuario: Como usuario necesito tener una contraseña para garantizar que mis datos estén seguros', function(){
        //Test-cases
        it('');
        it('');
    });
    
   
    
});