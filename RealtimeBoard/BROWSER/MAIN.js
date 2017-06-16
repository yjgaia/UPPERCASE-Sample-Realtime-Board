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
	}
});
