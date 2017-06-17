RealtimeBoard.ArticleModel = OBJECT({
	
	preset : () => {
		return RealtimeBoard.MODEL;
	},
	
	params : () => {

		let validDataSet = {

			title : {
				notEmpty : true,
				size : {
					max : 255
				}
			},
			
			content : {
				notEmpty : true,
				size : {
					max : 3000
				}
			}
		};
		
		return {
			name : 'Article',
			methodConfig : {
				create : {
					valid : VALID(validDataSet)
				},
				update : {
					valid : VALID(validDataSet)
				}
			}
		};
	}
});
