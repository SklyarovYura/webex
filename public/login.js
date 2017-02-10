(function(angular){
    let template = `<form class="fixed" ng-show="loginCtrl.showLogin()">
                        <input type="text" placeholder="name" name="username" ng-model="loginCtrl.username" ng-show="loginCtrl.register"><br/>
                        <input type="email" placeholder="email" name="email" ng-model="loginCtrl.email"><br/>
                        <input type="password" placeholder="password" name="password" ng-model="loginCtrl.password"><br/>
                        <input type="submit" ng-click="loginCtrl.submit()">
                        <input type="button" ng-click="loginCtrl.close()" value="Закрыть"><br/>                       
                        <input type="checkbox" ng-model="loginCtrl.register">Регистрация
                    </form>`;
    
    angular.module('LoginModule',[])
        .directive('login',function(){
            return{
                restrict:'E',
                template:template,
                controller:function($http,pageState){
                    this.username = '';
                    this.register   = false;
                    this.email      = '';
                    this.password   = '';
                    this.showLogin  = ()=>pageState.showLogin;
                    this.submit = function(){
                      if(this.register){
                         $http.post('/register',{name:this.username,email:this.email,password:this.password}).then(function(res){
                             pageState.isAuthenticated = res.data.login;
                             pageState.userName  = res.data.username;
                             pageState.showLogin = false;
                         },
                         function(){
                             pageState.showSubs = pageState.isAuthenticated = false;
                             pageState.subscriptions = [];
                         })
                      }
                      else{
                         $http.post('/login',{email:this.email,password:this.password}).then(function(res){
                              pageState.isAuthenticated = res.data.login
                              pageState.userName  = res.data.username;
                              pageState.showLogin = false;                    
                         },
                         function(){
                             pageState.showSubs = pageState.isAuthenticated = false;
                             pageState.subscriptions = [];
                         })
                      }
                    }
                    this.close = function(){
                        pageState.showLogin = false;
                    }


                },
                controllerAs:'loginCtrl'
            }   
        });

})(window.angular);