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
				title : '실시간 게시판',
				right : Yogurt.ToolbarButton({
					icon : FontAwesome.GetIcon('pencil'),
					title : '글 작성',
					on : {
						tap : () => {
							RealtimeBoard.GO('write');
						}
					}
				})
			}),
			
			list = UUI.LIST({
				style : {
					padding : 20
				}
			})]
		}).appendTo(BODY);
		
		RealtimeBoard.ArticleModel.find({
			sort : {
				createTime : -1
			},
			count : 10
		}, (articleDataSet) => {
			
			EACH(articleDataSet, (articleData) => {
				
				list.append(LI({
					style : {
						cursor : 'pointer'
					},
					c : articleData.title,
					on : {
						tap : () => {
							RealtimeBoard.GO('view/' + articleData.id);
						}
					}
				}));
			});
		});

		inner.on('close', () => {
			wrapper.remove();
			wrapper = undefined;
		});
	}
});
