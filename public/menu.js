(function(angular){
    let template = `<ul>
                        <goods-button></goods-button>
                        <li class="login" 
                                    ng-click="mainMenuCtrl.selectLogin()"
                                    ng-show="mainMenuCtrl.showButtonLogin()"
                        ><a>Login</a></li>
                        
                        <li class="login" ng-click="mainMenuCtrl.selectLogout()" ng-show="!mainMenuCtrl.showButtonLogin()">
                            <a>Logout</a>
                        </li>
                        <user-button></user-button>
                     </ul>`;
    
    
    angular.module('MainMenuModule',[])
        .directive('mainMenu',function($http,pageState){
            return{
                restrict:'E',
                template:template,
                controller:function(){

                    this.showButtonLogin=() => !pageState.isAuthenticated

                    this.selectLogin = function(){
                        pageState.showLogin = true;
                    }

                    this.selectLogout = function(){
                        $http.post('/logout').then(function(){
                            pageState.isAuthenticated = false;
                            pageState.userName = '';
                            pageState.showSubs = false;
                            pageState.subscriptions = [];
                        })
                    }

                },
                controllerAs:'mainMenuCtrl'
            }   
        });

})(window.angular);