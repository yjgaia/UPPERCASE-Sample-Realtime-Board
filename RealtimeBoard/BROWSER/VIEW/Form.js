RealtimeBoard.Form = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self, params) => {
		
		let id;
		
		let toolbar;
		let form;
		let wrapper = Yogurt.Wrapper({
			c : [
			
			toolbar = Yogurt.Toolbar({

				// left
				left : Yogurt.BackButton({
					on : {
						tap : () => {
							RealtimeBoard.GO('');
						}
					}
				})
			}),

			// content
			DIV({
				style : {
					padding : 20
				},
				c : [
				
				// form
				form = UUI.VALID_FORM({
					
					errorMsgs : {
						title : {
							notEmpty : '글 제목을 입력해주세요.'
						},
						content : {
							notEmpty : '글 내용을 입력해주세요.'
						}
					},
					
					errorMsgStyle : {
						color : 'red',
						marginTop : 5
					},
					
					c : [
					
					Yogurt.Input({
						name : 'title',
						placeholder : '글 제목'
					}),
					
					Yogurt.Textarea({
						style : {
							marginTop : 10
						},
						name : 'content',
						placeholder : '글 내용'
					}),

					// submit button
					Yogurt.Submit({
						style : {
							marginTop : 20
						},
						value : '작성 완료'
					})],
					
					on : {
						submit : (e, form) => {
							
							let data = form.getData();
							
							if (id === undefined) {
								
								RealtimeBoard.ArticleModel.create(data, {
									notValid : form.showErrors,
									success : (savedData) => {
										RealtimeBoard.GO('view/' + savedData.id);
									}
								});
							}
							
							else {
								data.id = id;
								
								RealtimeBoard.ArticleModel.update(data, {
									notValid : form.showErrors,
									success : (savedData) => {
										RealtimeBoard.GO('view/' + savedData.id);
									}
								});
							}
						}
					}
				})]
			})]
		}).appendTo(BODY);
		
		inner.on('paramsChange', (params) => {
			
			id = params.id;
			
			if (id === undefined) {
				TITLE('글 작성');
				toolbar.setTitle('글 작성');
			}
			
			else {
				TITLE('글 수정');
				toolbar.setTitle('글 수정');
				
				RealtimeBoard.ArticleModel.get(id, (articleData) => {
					if (wrapper !== undefined) {
						
						form.setData(articleData);
					}
				});
			}
		});

		inner.on('close', () => {
			wrapper.remove();
			wrapper = undefined;
		});
	}
});
