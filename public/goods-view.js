(function(angular){

    let template = `<li class="dropdown"><a>Products</a>
                        <div class="dropdown-content">
                            <a ng-repeat="item in goodsButtonCtrl.data()" ng-click="goodsButtonCtrl.selectProducr(item._id)">{{item.name}}</a>
                        </div>
                    </li>`;
    
    let templateGoods = `<div ng-show="!!productCtrl.product">
                            <h4>{{productCtrl.product.name}}</h4>
                            <img ng-src="{{productCtrl.product.image}}">
                            <h5>{{productCtrl.product.price}}</h5>
                            <i>{{productCtrl.product.description}}</i>
                        </div>`;

    angular.module('GoodsModule',[])
        .directive('goodsButton',function(pageState){
            return{
                restrict:'E',
                template:template,
                controller:function(){            
                  this.data = ()=> pageState.goods;

                  this.selectProducr = function(id){
                        pageState.selectProduct = pageState.goods.find((item)=>item._id===id);
                        pageState.showSubs = false;
                  }
                },
                controllerAs:'goodsButtonCtrl'
            }   
        })
        .directive('product',function(pageState){
            return{
                restrict:'E',
                template:templateGoods,
                controller:function(){
                  Object.defineProperty(this,'product',{get:()=>pageState.selectProduct})

                },
                controllerAs:'productCtrl'
            }   
        });

})(window.angular);