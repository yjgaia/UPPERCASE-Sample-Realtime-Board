RealtimeBoard.List = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {
		
		TITLE('실시간 게시판');
		
		let list;
		let paging;
		let wrapper = Yogurt.Wrapper({
			c : [
			
			Yogurt.Toolbar({
				title : A({
					c : '실시간 게시판',
					on : {
						tap : () => {
							RealtimeBoard.GO('');
						}
					}
				}),
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
			
			DIV({
				style : {
					padding : 20
				},
				c : [
					list = UUI.LIST(),
					paging = DIV({
						style : {
							marginTop : 15
						}
					})
				]
			}),
			
			// footer
			DIV({
				style : {
					padding : 20,
					paddingTop : 0,
					textAlign : 'center'
				},
				c : A({
					style : {
						color : '#0366d6'
					},
					href : 'https://github.com/Hanul/UPPERCASE-Sample-Realtime-Board',
					target : '_blank',
					c : '소스 보기'
				})
			})]
		}).appendTo(BODY);
		
		let articleCountPerPage = 10;
		
		RealtimeBoard.ArticleModel.count((count) => {
			REPEAT(Math.ceil(count / articleCountPerPage), (page) => {
				page += 1;
				
				paging.append(A({
					style : {
						marginRight : 5
					},
					c : page,
					on : {
						tap : () => {
							RealtimeBoard.GO('list/' + page);
						}
					}
				}));
			});
		});
		
		let articleWatchingRoom;
		inner.on('paramsChange', (params) => {
			
			let page = REAL(params.page);
			if (page === undefined) {
				page = 1;
			}
			
			list.removeAllItems();
			
			if (articleWatchingRoom !== undefined) {
				articleWatchingRoom.exit();
			}
			
			articleWatchingRoom = RealtimeBoard.ArticleModel.onNewAndFindWatching({
				sort : {
					createTime : -1
				},
				start : (page - 1) * articleCountPerPage,
				count : articleCountPerPage
			}, (articleData, addUpdateHandler, addRemoveHandler, exit, isNewData) => {
				
				if (page === 1 || isNewData !== true) {
					
					let item;
					let title;
					
					list.addItem({
						isFirst : true,
						key : articleData.id,
						item : item = LI({
							style : {
								cursor : 'pointer',
								border : '1px solid #ddd',
								marginTop : -1
							},
							c : title = DIV({
								style : {
									padding : 10
								},
								c : articleData.title
							}),
							on : {
								tap : () => {
									RealtimeBoard.GO('view/' + articleData.id);
								}
							}
						})
					});
					
					if (isNewData === true) {
						
						ANIMATE({
							node : item,
							keyframes : {
								from : {
									height : 0,
									overflow : 'hidden',
									backgroundColor : 'yellow'
								},
								to : {
									height : item.getInnerHeight(),
									overflow : item.getStyle('overflow'),
									backgroundColor : '#fff'
								}
							}
						});
					}
					
					addUpdateHandler((articleData) => {
						title.empty();
						title.append(articleData.title);
					});
					
					addRemoveHandler(() => {
						UANI.HIDE_SLIDE_UP({
							node : item
						}, () => {
							list.removeItem(articleData.id);
						});
					});
				}
			});
		});

		inner.on('close', () => {
			wrapper.remove();
			wrapper = undefined;
			
			if (articleWatchingRoom !== undefined) {
				articleWatchingRoom.exit();
				articleWatchingRoom = undefined;
			}
		});
	}
});
