RealtimeBoard.List = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {
		
		TITLE('실시간 게시판');
		
		let list;
		let wrapper = Yogurt.Wrapper({
			c : [
			
			Yogurt.Toolbar({
				title : '실시간 게시판'
			}),
			
			list = UUI.LIST({
				style : {
					padding : 20
				}
			})]
		}).appendTo(BODY);

		inner.on('close', () => {
			wrapper.remove();
		});
	}
});
