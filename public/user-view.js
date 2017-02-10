(function(angular){
    let template = `<div ng-show="userSubCntrl.visible">
                    <table>
                        <tbody ng-repeat="item in userSubCntrl.data">
                            <tr>
                            <td>{{item.name}}</td>
                            <td>{{item.price}}</td>
                            <td class="fixed" ng-click="userSubCntrl.remove(item._id)"><a>delete</a></td>
                            </tr>
                        </tbody>
                        <tr><td>Total</td><td>{{userSubCntrl.total}}</td><td class="fixed"/></tr>
                    </table>
                    <div class="dropdown"  ng-show="userSubCntrl.availableVisible">
                        <button class="dropbtn">Add Subscription</button>
                        <div class="dropdown-content">
                            <a ng-click="userSubCntrl.add(item._id)" ng-repeat="item in userSubCntrl.available">{{item.name}}</a>
                        </div>
                    </div>
                    </div>`;
    

    let templateButton = `<li class="login" ng-click ="userButtonCtrl.openSub()" 
                               ng-show  ="userButtonCtrl.visible" 
                            ><a>{{userButtonCtrl.name}}</a></li>`;

    angular.module('UserModule',[])
        .directive('userButton',function($http,pageState){
            return{
                restrict:'E',
                template:templateButton,
                controller:function(){

                    Object.defineProperty(this,'visible',{get:()=>pageState.isAuthenticated});
                    Object.defineProperty(this,'name',{get:()=>pageState.userName});

                   this.openSub = function(){
                      $http.post('/api/user/subscriptions').then(
                      function(res){
                        pageState.refreshSubscriptions(res.data.subscriptions);
                      },
                      function(err){
                        alert(err);
                      });
                    }
                },
                controllerAs:'userButtonCtrl'
            }   
        })
        .directive('userSubscription',function(){
            return{
                restrict:'E',
                template:template,
                controller:function(pageState){

                    Object.defineProperty(this,'data' ,{get:()=>pageState.subscriptions});
                    Object.defineProperty(this,'visible',{get:()=>pageState.showSubs});
                    Object.defineProperty(this,'available' ,{get:()=>pageState.available});
                    Object.defineProperty(this,'total' ,{get:()=>pageState.total});
                    Object.defineProperty(this,'availableVisible',{get:()=>pageState.availableVisible});
                    
                    this.add = function(id){
                       pageState.addSubscription(id);
                    }
                    this.remove = function(id){
                       pageState.deleteSubscription(id);
                    }
                },
                controllerAs:'userSubCntrl'
            }   
        });


})(window.angular);