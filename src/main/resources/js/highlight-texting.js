define('com/highlight-texting/plugins', ['ajs', 'jquery'], function (AJS, $){
    "use strict";

    return {
        init : function(ed) {
            
            ed.on("mouseover",function(m_on){
                if (tinymce.activeEditor.formatter.match('hilitecolor',{value:'#FFFF00'})) {
                    $('.highlight-button-released').addClass('highlight-button-pressed').removeClass('highlight-button-released');
                    $("#highlight-texting-button").find('a.aui-button').addClass('highlight-pressed-background');
                } else {
                    $('.highlight-button-pressed').addClass('highlight-button-released').removeClass('highlight-button-pressed');
                    $("#highlight-texting-button").find('a.aui-button').removeClass('highlight-pressed-background');                    
                }
            });
            ed.on("keyup",function(k_on){
                if (tinymce.activeEditor.formatter.match('hilitecolor',{value:'#FFFF00'})) {
                    $('.highlight-button-released').addClass('highlight-button-pressed').removeClass('highlight-button-released');
                    $("#highlight-texting-button").find('a.aui-button').addClass('highlight-pressed-background');
                } else {
                    $('.highlight-button-pressed').addClass('highlight-button-released').removeClass('highlight-button-pressed');
                    $("#highlight-texting-button").find('a.aui-button').removeClass('highlight-pressed-background');   
                }
            });
            ed.addCommand('toggleHighlightCommand', function() {
                tinymce.activeEditor.formatter.toggle('hilitecolor',{value:'#FFFF00'});
            });
            // Register button in a new group
            ed.addButton('highlight-texting-button', {
                title: "",
                tooltip: AJS.I18n.getText("com.dizaar.highlight.label"),
                cmd: "toggleHighlightCommand",
                className: "highlightTexting",
                icon: "highlight-button-released",
                locationGroup: "rte-toolbar-group-style",
				weight: 0
				});
			},
        getInfo : function() {
            console.log('smth happened');
            return {
                longname : 'highlight-texting',
                author : 'dizaar',
                authorurl : 'https://github.com/dizaar/confluence-highlight-text',
                version : tinymce.majorVersion + "." + tinymce.minorVersion
            };
        }
    }
});

require('confluence/module-exporter')
    .safeRequire('com/highlight-texting/plugins', function(HighlightTexting) {
        var tinymce = require('tinymce');

        tinymce.create('tinymce.plugins.HighlightTexting', HighlightTexting);

        // Register plugin
        tinymce.PluginManager.add('highlight-texting', tinymce.plugins.HighlightTexting);

        require('confluence-editor/loader/tinymce-bootstrap').addTinyMcePluginInit(function(settings) {
            settings.plugins += ",highlight-texting";
        });
    });