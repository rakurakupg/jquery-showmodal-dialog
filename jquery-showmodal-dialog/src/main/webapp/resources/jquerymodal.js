;(function(w){
    'use strict'
    w.Dlg = w.Dlg || function() {
        function Dlg(){
            this.modalTemplate = '<div id="{id}" style="{style}" class="{cls}"></div>';
            this.iframeTemplate = '<iframe id="{id}" name="{name}" src="{url}" width="{dialogWidth}" height="{dialogHeight}" style="{style}" class="{cls}" scrolling="{scrolling}" frameborder="{frameborder}"></iframe>';
            this.replacePlaceHolder = function(template, param) {
                return template.replace(/\{(\w+)\}/g, function(match) {
                    return param[match.substring(1, match.length - 1)];
                });
            };
            this.modalParam = {
                id : 'modal',
                style : 'display: none; overflow: hidden',
                cls : '',
                loadFunName : 'onload',
                unloadFunName : 'onunload',
                wmargin : 10,
                hmargin : 30,
                defaultDialogWidth : 100,
                defaultDialogHeight : 100,
                defaultTitle : 'Dialog Window',
            };
            this.iframeParam = {
                id : 'dlg-contents',
                name : 'dlg-contents',
                style : 'border:none;',
                cls : '',
                scrolling : 'no',
                frameborder : '0',
                ifUnloadFunName : 'doClose'
            }
        };
        Dlg.prototype = {
            showModalDialog : function(url, _dialogArguments, parameter, callback) {
                //create dialog html
                var _modalParam = {};
                var overrideParam = parameter.dialogParam || {};
                for ( var key in this.modalParam) {
                    _modalParam[key] = overrideParam[key] || this.modalParam[key];
                }
                var dlgTemplate = parameter.modalTemplate || this.modalTemplate;
                var dlgHtml = this.replacePlaceHolder(dlgTemplate, _modalParam);

                //create dialog contents (iframe) html
                var _iframeParam = {};
                var ifoverridParam = parameter.iframeParam || {};
                for ( var key in this.iframeParam) {
                    _iframeParam[key] = ifoverridParam[key] || this.iframeParam[key];
                }
                _iframeParam.url = url;
                _iframeParam.dialogWidth = parameter.dialogWidth || _modalParam.defaultDialogWidth;
                _iframeParam.dialogHeight = parameter.dialogHeight || _modalParam.defaultDialogHeight;

                var iframeTemplate = parameter.iframeTemplate || this.iframeTemplate;
                var iframeHtml = this.replacePlaceHolder(iframeTemplate, _iframeParam);

                if ($('#' + _modalParam.id).length == 0) {
                    $('body').append(dlgHtml);
                }
                var $modal = $('#' + _modalParam.id);
                $('iframe', $modal).remove();//remove iframe if exist

                var wIframe;
                var closed = false;
                var loadFunName = parameter.loadFunName || _modalParam.loadFunName;// default : onload
                var unloadFunName = parameter.unloadFunName || _modalParam.unloadFunName;// default : onunload
                var fnClose = function() {
                    if (closed) {
                        return;
                    }
                    closed = true;
                    if (wIframe[unloadFunName]) {
                        wIframe[unloadFunName].call(wIframe);
                    }
                    $modal.dialog('close');
                    if (callback) {
                        callback(wIframe.returnValue);
                    }
                };

                $modal.dialog({
                    width : (_iframeParam.dialogWidth + _modalParam.wmargin),
                    height : (_iframeParam.dialogHeight + _modalParam.hmargin),
                    autoOpen : false,
                    modal : true,
                    my : 'center',
                    at : 'center',
                    of : window,
                    close : fnClose,
                    open : function() {
                        //hide while setup
                        $modal.parent('.ui-dialog').hide();
                        $modal.append(iframeHtml);
                        wIframe = window.frames[_iframeParam.id];
                        $('#' + _iframeParam.id).load(function() {
                            wIframe.dialogArguments = _dialogArguments;
                            var title = $(wIframe.document).find('title').text() || wIframe.document.title || _modalParam.defautlTitle;
                            $modal.parent('.ui-dialog').find('.ui-dialog-title').text(title);

                            //Inject closeFunction to iFrame
                            wIframe[_iframeParam.ifUnloadFunName] = function() {
                                closed = false;
                                fnClose();
                            };

                            if (wIframe[_modalParam.loadFunName]) {
                                wIframe[_modalParam.loadFunName].call(wIframe);
                            }

                            //show 
                            $modal.parent('.ui-dialog').show();

                        });
                    }
                });
                $modal.dialog('open');
            }
        };
        return Dlg;
    }();

})(window);
