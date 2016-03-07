function login(request, response){
  var loginStrategy = passport.authenticate('facebook');
  return loginStrategy(request, response)
}

function getCallback(request, response){
  var callback = passport.authenticate('facebook', {
    successRedirect : '/candies',
    failureRedirect : '/candies'
  });

  var callback(request, response);
}

function getCallback(request, response) {
  request.logout();
  response.redirect('/candies');
}
module.exports = {
  login: login,
  getCallback: getCallback,
  logout: logout
}