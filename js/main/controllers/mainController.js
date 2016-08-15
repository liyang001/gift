giftCtrl.controller('mainCtrl', ['$scope', 'mainService','$ionicSlideBoxDelegate','$timeout',function($scope, mainService,$ionicSlideBoxDelegate,$timeout){
	
	$scope.bannerData = [];//初始化
	$scope.dataSecond = [];
	$scope.dataList = [];
	//请求banner的数据
	$scope.count = 20;
	$scope.page = 1;
	
	function  initialize(){
		responseBanner();
		getResponseList(0);
	}
	initialize();
	
	
	function responseBanner(){
		//轮播图数据
		mainService.getMainbannerData(	
			function success(data){
				$scope.bannerData = data;
				$ionicSlideBoxDelegate.update();
			},function fail(){				
		});
		//滑动数据
		mainService.getMainSecondData(	
			function success(data){
				$scope.dataSecond = data;
			},function fail(){				
		});			
	}
	
	
	function getResponseList(type){
		mainService.getMainList(
			$scope.count,
			$scope.page,
			function success(data){
				if(type==1){
					$scope.dataList = data;
					$scope.$broadcast('scroll.refreshComplete');
				}else if(type==2){
					$scope.dataList = $scope.dataList.concat(data);
					$scope.$broadcast('scroll.infiniteScrollComplete');
				}else if(type==0){
					$scope.dataList = data;
				}
				
			},function fail(){
				if(type==1){
					$scope.$broadcast('scroll.refreshComplete');
				}else if(type==2){
					$scope.$broadcast('scroll.infiniteScrollComplete');
					$scope.page--;
				}
				
		});	
				
	}

	$scope.onRefresh = function(){ //下拉刷新
		
		$scope.page = 1;
		getResponseList(1);
		
	}
	
	
	$scope.loadMore = function(){
		$timeout(function(){
			$scope.page++;
			console.log($scope.page)
			getResponseList(2);						
		},2000)

		
	}
	
	
}])