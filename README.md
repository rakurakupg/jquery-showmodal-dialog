ShowModalDialog migration for function not supported browser using JQuery
-------------------
ShowModalDialog function is not supported some browser, Google Chrome and Opera.
But some legacy project deeply depends on ShowModalDialog function and can not easily convert implementation.

This sample can convert from the code using ShowModalDialog live below,

    showModalDialog(url, param, 'dialogWidth: 100...');

to like below.

    dlg.showModalDialog(url, param, {dialogWidth: 100, dialogHeight: 100}, callback);
 


To get the code:
-------------------
Clone the repository:

    $ git clone git://github.com/rakurakupg/jquery-showmodal-dialog.git


To run the application:
-------------------	

Clone project and run on your IDE.

Tested on Eclipse Mars, Java8, Tomcat8.


