const wrapAsync = (fun) => {
  return function (req, res, next) {
    fun(req, res, next).catch((e) => next(e));
  };
};
