RealtimeBoard.View = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self, params) => {
		
		let toolbar;
		let contentWrapper;
		let updateButton;
		let wrapper = Yogurt.Wrapper({
			c : [
			
			toolbar = Yogurt.Toolbar({
				left : Yogurt.BackButton({
					on : {
						tap : () => {
							RealtimeBoard.GO('');
						}
					}
				}),
				right : updateButton = Yogurt.ToolbarButton({
					icon : FontAwesome.GetIcon('pencil'),
					title : '글 수정'
				})
			}),
			
			contentWrapper = DIV({
				style : {
					padding : 20
				}
			})]
		}).appendTo(BODY);
		
		let watchingRoom;
		
		inner.on('paramsChange', (params) => {
			
			let id = params.id;
			
			if (watchingRoom !== undefined) {
				watchingRoom.exit();
				watchingRoom = undefined;
			}
			
			watchingRoom = RealtimeBoard.ArticleModel.getWatching(id, (articleData, addUpdateHandler, addRemoveHandler) => {
				if (wrapper !== undefined) {
					
					TITLE(articleData.title);
					toolbar.setTitle(articleData.title);
					
					updateButton.on('tap', () => {
						RealtimeBoard.GO('update/' + articleData.id);
					});
					
					let content;
					contentWrapper.append(content = P({
						c : articleData.content
					}));
					
					contentWrapper.append(DIV({
						c : A({
							c : '글 삭제',
							on : {
								tap : () => {
									if (confirm('정말 글을 삭제하시겠습니까?') === true) {
										RealtimeBoard.ArticleModel.remove(id, () => {
											RealtimeBoard.GO('');
										});
									}
								}
							}
						})
					}));
					
					addUpdateHandler((articleData) => {
						
						TITLE(articleData.title);
						toolbar.setTitle(articleData.title);
						
						content.empty();
						content.append(articleData.content);
					});
					
					addRemoveHandler(() => {
						RealtimeBoard.GO('');
					});
				}
			});
		});

		inner.on('close', () => {
			wrapper.remove();
			wrapper = undefined;
			
			if (watchingRoom !== undefined) {
				watchingRoom.exit();
				watchingRoom = undefined;
			}
		});
	}
});
