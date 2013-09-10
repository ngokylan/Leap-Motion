<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
<title>Sign in</title>
<meta http-equiv="Content-Type" content="text/html; charset=windows-1252" />
<link rel="stylesheet" type="text/css" href="css/style.css" />
</head>
<body>
<div id="centrecontainer">
  <div id="outercontainer">
    <div id="header">
      <div id="headertitle">
        <h1>Tremor testing system<sup>2013</sup></h1>
      </div>
      <div id="headermenu">
        <ul>
      <li><a href="index.html">Home</a></li>
          <li><a href="signin.php">Sign in</a></li>
          <li><a href="signup.php">Sign up</a></li>
          <li><a href="#">User guide</a>
          </li>
          <li><a href="#">Support</a>
    </li></ul></div></div>
    <div id="container">
      <div id="containertext">
        <h2 id="modal-title">Sign in</h2>
        <div id="modal-content">
          <div name="sign-in-form">
            <form onsubmit="return Forms.submitOnlyOnce();" method="post" novalidate="novalidate" action="">
              <div id="login-partial">
                <div id="email-field">
                  <label id="email-label" for="login_email">Emal    </label>
                  <input tabindex="1" type="email" name="login_email" id="login_email" />
                </div>
                <div id="password-field">
                  <label id="password-label" for="login_password">Password</label>
                  <input type="password" id="login_password" name="login_password" tabindex="2" />
                </div>
                <div id="login-footer">
                  <div id="remember-me">
                    <input type="checkbox" id="remember_me" name="remember_me" tabindex="3" />
                    <label for="remember_me">Remember me</label>
                  </div>
                  <input name="signin" value="Sign in" type="button" id="login_submit" tabindex="4" onClick="window.location.reload('Submit.html');">
                </div>
              </div>
              <a href="#">Forgot your password?</a>
            </form>
          </div>
        </div>
        <h1>&nbsp;</h1>
    
      </div>
    </div>
    <div id="footer">
      <p>Develop by <a href="#">Group one</a></p>
    </div>
  </div>
</div>
</body>
</html>
