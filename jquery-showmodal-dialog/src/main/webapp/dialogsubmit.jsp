<!doctype html>
<html>
<head>
<title>Submit Dialog Example</title>
<tags:css />
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-sm-12 bg-info" style="border-radius: 10px;">
				<p>
					<span>from opener:</span><span id="param"></span>
				</p>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12">
				<form method="POST" action="simple2.jsp">
					<p>
						<span>return val1:</span><input type="text" name="retVal1" id="retVal1" value="return value 1">
					</p>
					<p>
						<span>return val2:</span><input type="text" name="retVal2" id="retVal2" value="return value 2">
					</p>
					<p>
					   <button type="submit" name="submit" class="btn btn-lg btn-success">Submit</button>
					</p>
				</form>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-12">
				<p>
					<button type="button" name="closeDlg" class="btn btn-default" id="btn-closemodal">Close Modal</button>
				</p>
			</div>
		</div>
	</div>
	<tags:js />
	<script>
        function onload() {
            $('#param').text(JSON.stringify(dialogArguments));
            $('#btn-closemodal').on('click', function() {
                returnValue = {
                    ret1 : $('#retVal1').val(),
                    ret2 : $('#retVal2').val()
                };
                doClose();
            });
        }
        function onunload() {
            console.log('default onunload function called. e.g. for in case dialog close button clicked');
        }
    </script>
</body>
</html>