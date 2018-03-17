module.exports = {
  errorHandler: (res, err) => {
    err.success = false;
    if (!err.data) {
      err.data = new Array();
    }
    return res.status(err.status || 520).send(err);
  },
  postSuccessHandler: (res, codeResponse) => {
    codeResponse.success = true;
    if (!codeResponse.data) {
      codeResponse.data = new Array();
    }
    return res.status(codeResponse.status || 201).send(codeResponse);
  },
  getSuccessHandler: (res, codeResponse) => {
    codeResponse.success = true;
    if (!codeResponse.data) {
      codeResponse.data = new Array();
    }
    return res.status(codeResponse.status || 200).send(codeResponse);
  }
}
