giftService.service('mainService', ['$http', function($http){
	this.getMainbannerData = function(successCallback,failCallback){
		$http.get("/giftapp/mock/main/main_banner.json")
		.success(function(data){					
			var dataBanner = [];
			for(var i=0;i<data.data.banners.length;i++){
				var obj = {};
				obj.id = data.data.banners[i].id;
				obj.image_url = data.data.banners[i].image_url;
				dataBanner.push(obj)	;			
			}
			successCallback(dataBanner);
		})
		.error(function(error){
			failCallback(error);
		});
	}
	
	
	
	this.getMainSecondData = function(successCallback,failCallback){
		$http.get("/giftapp/mock/main/second.json")
		.success(function(data){					
			var dataSecond = [];
			for(var i=0;i<data.data.secondary_banners.length;i++){
				var obj = {};
				obj.id = data.data.secondary_banners[i].id;
				obj.image_url = data.data.secondary_banners[i].image_url;
				dataSecond.push(obj)	;			
			}
			console.log(dataSecond);
			successCallback(dataSecond);
		})
		.error(function(error){
			failCallback(error);
		});
	}
	
		
	this.getMainList= function(count,page,successCallback,failCallback){
			 	console.log('page'+page);
	 			console.log('count'+count);
	 	if(page<=3){
			$http.get('/giftapp/mock/main/mainList'+(page)+'.json')
			.success(function(data){					
				var dataList = [];
				for(var i=0;i<data.data.items.length;i++){
					var obj = {};
					obj.id = data.data.items[i].id;
					obj.title = data.data.items[i].title;
					obj.count = data.data.items[i].likes_count;
					obj.image_url = data.data.items[i].cover_image_url;
					dataList.push(obj)	;			
				}
				console.log(dataList);
				successCallback(dataList);
			})
			.error(function(error){
				failCallback(error);
			});	 		
	 	}

	}
}])