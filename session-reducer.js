export default function sessionReducer(state = {}, action) {
  let myState = {};
  switch(action.type) {
    case 'LOAD_SESSION_CHECK': {
      if (action.responseJson != null) {
        if (action.responseJson.params != null) {
          if (action.responseJson.params.status != null) {
            let sessionInfos = action.responseJson.params.status.info;
            for (let j = 0; j < sessionInfos.length; j++) {
              if (sessionInfos[j].code === "success" && sessionInfos[j].message === "Alive") {
                myState.sessionActive = true;
              }
            }
          }
        } else if (action.responseJson.status != null && action.responseJson.status == 401) {
          myState.sessionActive = false;
        }
      }
      return Object.assign({}, state, myState);
    }
    case 'SAVE_AUTHENTICATION': {
      if (action.responseJson != null && action.responseJson.params != null
        && action.responseJson.params.status != null && action.responseJson.params.status.info != null) {
        let infos = action.responseJson.params.status.info;
        for (var i = 0; i < infos.length; i++) {
          if (infos[i].code === "success" && infos[i].message === "Authenticated") {
            myState.sessionActive = true;
          }
        }
      }
      return Object.assign({}, state, myState);
    }
    case 'PROCESS_LOGOUT': {
      return Object.assign({}, state, {sessionActive:false});
    }
    default:
      return state;
    }
  }
