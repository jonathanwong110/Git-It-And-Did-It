const initialState = []


export default (state = initialState, action) => {
	switch(action.type){
		case 'NO_RESPONSE':
		  return [`The server did not respond, 
			 	please check your connection and try again`]
		case 'SERVER_ERROR':
		  return action.errors
		case 'NO_ERRORS':
		  return []
		case 'TRY_AGAIN':
		  return ['Something went wrong please refresh and try again']
		default:
		  return state;
	}
}