RealtimeBoard.View = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self, params) => {
		
		let toolbar;
		let content;
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

			// content
			content = DIV({
				style : {
					padding : 20
				}
			})]
		}).appendTo(BODY);
		
		inner.on('paramsChange', (params) => {
			
			let id = params.id;
			
			RealtimeBoard.ArticleModel.get(id, (articleData) => {
				if (wrapper !== undefined) {
					
					TITLE(articleData.title);
					toolbar.setTitle(articleData.title);
					
					updateButton.on('tap', () => {
						RealtimeBoard.GO('update/' + articleData.id);
					});
					
					content.append(articleData.content);
					
					content.append(DIV({
						c : A({
							c : '글 삭제',
							on : {
								tap : () => {
									if (confirm('정말로 삭제하시겠습니까?') === true) {
										RealtimeBoard.ArticleModel.remove(id, () => {
											RealtimeBoard.GO('');
										});
									}
								}
							}
						})
					}));
				}
			});
		});

		inner.on('close', () => {
			wrapper.remove();
			wrapper = undefined;
		});
	}
});
