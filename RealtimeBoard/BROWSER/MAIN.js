RealtimeBoard.MAIN = METHOD({

	run : (params) => {
		
		RealtimeBoard.MATCH_VIEW({
			uri : '',
			target : RealtimeBoard.List
		});
		
		RealtimeBoard.MATCH_VIEW({
			uri : ['write', 'update/{id}'],
			target : RealtimeBoard.Form
		});
		
		RealtimeBoard.MATCH_VIEW({
			uri : 'view/{id}',
			target : RealtimeBoard.View
		});
	}
});
