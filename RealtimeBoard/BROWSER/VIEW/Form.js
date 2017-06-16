RealtimeBoard.Form = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self, params) => {
		
		inner.on('paramsChange', (params) => {
			
			let id = params.id;
			
			if (id === undefined) {
				TITLE('글 작성');
			}
			
			else {
				TITLE('글 수정');
			}
		});
	}
});
