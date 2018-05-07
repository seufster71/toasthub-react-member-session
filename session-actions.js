import callService from '../../core/api/api-call';

// actions

// thunk
export function sessionCheck() {
  return function(dispatch) {
    let requestParams = {};
    requestParams.action = "CHECK";
    requestParams.service = "MEMBER_SVC";
    let params = {};
    params.requestParams = requestParams;
    params.URI = '/api/member/callService';

    return callService(params).then( (responseJson) => {
      dispatch({ type: "LOAD_SESSION_CHECK", responseJson });
    }).catch(error => {
      throw(error);
    });

  };
}
