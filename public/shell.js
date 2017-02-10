(function (angualr) {
    angualr.module('shop',
                            [
                            'MainMenuModule',
                            'GoodsModule',
                            'LoginModule',
                            'UserModule'
                            ])
    .factory('pageState',["$http",function($http){

        function PageState(){
            this.userName           = ''
            this.isAuthenticated    = false;
            this.showLogin          = false;
            this.showSubs           = false;
            this.goods              = [];
            this.selectProduct      = null;
            this.subscriptions      = [];
            this.total              = 0;
            this.available          = [];
            this.availableVisible   = false;

            this.refreshSubscriptions = function(subscriptions){
                if(!!arguments[0])
                    this.subscriptions      = subscriptions.map((id)=>this.goods.find((item)=>item._id===id));

                this.total              = this.subscriptions.reduce((summ,val)=>{return summ+parseFloat(val.price);},0);
                this.available          = this.goods.filter((item)=>!this.subscriptions.find((usersub)=>usersub._id===item._id));
                this.availableVisible   = !!this.available.length;

                this.selectProduct      = null;
                this.showSubs           = true;
            }

            let self = this;

            this.addSubscription = function(id){
                return new Promise(function(resolve,reject){
                    $http.post('/api/user/subscriptions/add',{id}).then(
                        function(res){
                            self.subscriptions.push(res.data);
                            self.refreshSubscriptions();
                            resolve()
                        },
                        function(err){
                            alert(err);
                            reject(err);
                        }
                    );
                });
            }

            this.deleteSubscription = function(id){
                return new Promise(function(resolve,reject){
                    $http.post('/api/user/subscriptions/delete',{id}).then(
                        function(res){
                            let index = self.subscriptions.findIndex((item)=>item._id===res.data);
                            if(index!==-1){
                                delete self.subscriptions[index];
                                self.subscriptions.copyWithin(index,index+1);
                                self.subscriptions.pop();
                                self.refreshSubscriptions();
                            }
                            resolve()
                        },
                        function(err){
                            alert(err);
                            reject(err);
                        }
                    );
                });
            }
        }

        let page_state = new PageState();

        $http.post('/api/goods/list',{}).then(function(res){
            page_state.goods = res.data;
        },
        function(err){
            alert(err);
        });

        return page_state;
    }]);
})(window.angular);