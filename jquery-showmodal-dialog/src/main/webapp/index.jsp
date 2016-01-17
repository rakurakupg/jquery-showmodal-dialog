<!doctype html>
<html>
<head>
<title>JQuery ShowModalDialog Example</title>
<tags:css />
</head>
<body>
	<div class="container">
		<h1>JQuery ShowModalDialog Example</h1>
		<div class="row">
			<div class="col-sm-12 bg-info" style="height: 50px; border-radius: 10px; margin-bottom: 10px;">
				<span id="result"></span>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12">
				<p>
					<span>param 1:</span><input type="text" name="p1" id="p1" value="parameter 1">
				</p>
				<p>
					<span>param 2:</span><input type="text" name="p2" id="p2" value="parameter 2">
				</p>
			</div>
		</div>
		<hr>
		<div class="row">
			<div class="col-sm-12">
				<p>
					<button type="button" name="showmodal" class="btn btn-lg btn-success" id="btn-openmodal">Basic: Simple Dialog</button>
				</p>
			</div>
		</div>
		<hr>
		<div class="row">
			<div class="col-sm-12">
				<p>
					<button type="button" name="showmodal2" class="btn btn-lg btn-warning" id="btn-openmodal2">Dialog open another Dialog</button>
				</p>
			</div>
		</div>
		<hr>
        <div class="row">
            <div class="col-sm-12">
                <p>
                    <button type="button" name="showmodal3" class="btn btn-lg btn-danger" id="btn-openmodal3">Submit Form Dialog</button>
                </p>
            </div>
        </div>
	</div>
	<tags:js />
	<script src="${pageContext.request.contextPath}/resources/jquerymodal.js"></script>
	<script>
        $(function() {
            var dlg = new Dlg();

            var callback = function(returnVal) {
                $('#result').text(JSON.stringify(returnVal));
            };

            $('#btn-openmodal').on('click', function(event) {
                dlg.showModalDialog('simple.jsp', {
                    p1 : $('#p1').val(),
                    p2 : $('#p2').val()
                }, {
                    dialogWidth : 300,
                    dialogHeight : 200
                }, callback);
            });
            
            $('#btn-openmodal2').on('click', function(event) {
                dlg.showModalDialog('dialogtodialog.jsp', {
                    p1 : $('#p1').val(),
                    p2 : $('#p2').val()
                }, {
                    dialogWidth : 400,
                    dialogHeight : 400
                }, callback);
            });
            
            $('#btn-openmodal3').on('click', function(event) {
                dlg.showModalDialog('dialogsubmit.jsp', {
                    p1 : $('#p1').val(),
                    p2 : $('#p2').val()
                }, {
                    dialogWidth : 300,
                    dialogHeight : 300
                }, callback);
            });
        });
    </script>
    
</body>
</html>