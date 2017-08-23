(function (){
    angular.module('app.robo')

        .controller('AppController', function($scope){
            console.log('entrei no primeiro controller');
            
        })

        .controller('RoboController', function($scope){
            console.log('entrei no controller do robo');

        })

        .controller('GameController', function($scope){
            console.log('entrei no controller do game')
        })

        .controller('CupController', function($scope){
            console.log('entrei no controller do cup')
        })

        .controller('TeamController', function($scope){
            console.log('entrei no controller da equipe')
        })

        .controller('NewsController', function($scope, $http){
            $http.get('/listarNoticias')
            .then(function(data){
                console.log(data);
                console.log('chamei a rota');
                $scope.noticias = data.data;
            }, function(error){
                console.log('deu erro');
            })
            
        })

        .controller('LoginController', function($scope, $http, $location){
            console.log('entrei no controller do login')

            $scope.usuario = {};
            $scope.autenticar = function(){
                var usuario = $scope.usuario;
                $http.post('/autenticar', {login: usuario.login, senha: usuario.senha})
                .then(function(){                
                    $location.path('/adm');
                }, function(error){
                    $scope.usuario = {};
                    var notify = {
                        type: 'error',
                        title: 'Falha no login!',
                        content: 'Usuário ou senha inválidos.'
                    };
                    $scope.$emit('notify', notify);

                })
            };
        })

        .controller('AdmController', function($scope, $http, $location){
            $http.get('/listarNoticias')
            .then(function(data){
                $scope.noticias = data.data;
            }, function(error){
                res.sendStatus(404);
            })

            $scope.removerNoticia = function(noticia){
                var id = noticia._id;
                if(noticia){
                    $http.get('/removerNoticia/'+id)
                    .then(function(data){
                        console.log(data);
                    }, function(error){
                        console.log('erro na exclusao.')
                    });                    
                }
            };


        });

        
})();