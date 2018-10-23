<html>
<head>
    <!--
    Customize this policy to fit your own app's needs. For more guidance, see:
        https://github.com/apache/cordova-plugin-whitelist/blob/master/README.md#content-security-policy
    Some notes:
        * gap: is required only on iOS (when using UIWebView) and is needed for JS->native communication
        * https://ssl.gstatic.com is required only on Android and is needed for TalkBack to function properly
        * Disables use of inline scripts in order to mitigate risk of XSS vulnerabilities. To change this:
            * Enable inline JS: add 'unsafe-inline' to default-src
    -->
     <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="viewport" content="height=device-height, initial-scale=1">
        <link rel="stylesheet" type="text/css" href="css/bootstrap.css">
        <title></title>
        <script type="text/javascript" src="cordova.js"></script>
        <script type="text/javascript" src="js/index.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="css/jquery.mobile-1.4.5.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <link rel="stylesheet" type="text/css" href="css/index.css">
    <title>Homepage</title>
</head>
<body>
<div class="container-fluid">
    <div class="row">
            <div class="col-xs-12 dash">
                <img class="image-responsive" alt="Welcome to Boracay" src="img/Welcome.JPG"></img>
            </div>
    </div>

    <div class="row text-center">
            <div class="col-xs-6">
                <h2 class="what"> What's new </h2>
            </div>
            <div class="col-xs-6 more">
            <span class="pull-right"> More > </span>
            </div>
    </div>
    <div class="row slider-holder">
        <div class="col-xs-4 slider-img">
            <img src="img/w1.JPG">
        </div>
        <div class="col-xs-4 slider-img">
            <img src="img/w2.JPG">
        </div>
        <div class="col-xs-4 slider-img">
            <img src="img/w3.JPG">
        </div>
    </div>

    <div class="row text-center">
            <div class="col-xs-6">
                <h2 class="what"> Things to do </h2>
            </div>
            <div class="col-xs-6 more">
            <span class="pull-right"> More > </span>
            </div>
    </div>
    <div class="row slider-holder">
        <div class="col-xs-4 slider-img">
            <img src="img/w1.JPG">
        </div>
        <div class="col-xs-4 slider-img">
            <img src="img/w2.JPG">
        </div>
        <div class="col-xs-4 slider-img">
            <img src="img/w3.JPG">
        </div>
    </div>


    <div class="row text-center">
            <div class="col-xs-6">
                <h2 class="what"> Most Visited</h2>
            </div>
            <div class="col-xs-6 more">
            <span class="pull-right"> More > </span>
            </div>
    </div>
    <div class="row slider-holder">
        <div class="col-xs-4 slider-img">
            <img src="img/w1.JPG">
        </div>
        <div class="col-xs-4 slider-img">
            <img src="img/w2.JPG">
        </div>
        <div class="col-xs-4 slider-img">
            <img src="img/w3.JPG">
        </div>
    </div>
   
</div>
<script type="text/javascript" src="cordova.js"></script>
<script type="text/javascript" src="js/index.js"></script>
</body>
</html>