$(document).ready(function(){
        // Handle event
        $("#go").click(function(event){
          event.preventDefault();
          var jsonText = $('#jsonText').val();
          var jsonObj = JSON.parse(jsonText);
          $("#mustacheText").val(formatXml(jsonToMustache(jsonObj)));
          console.log(jsonToMustache(jsonObj));
          console.log(formatXml(jsonToMustache(jsonObj)));
        });

        $("#clear").click(function(){
          $('#jsonText').val("");
          $("#mustacheText").val("");
        });

        var heading = "<H1>", 
            endHeading = "</H1>", 
            a = "<a>", 
            endA = "</a>",
            result = "";

        // function to parse the string
        function jsonToMustache(obj){
          result = "";
          loopObject(obj);
          return result;
        }

        function loopObject(obj){
          for(var key in obj){
              var thisObj = obj[key];
              if(thisObj instanceof Array){
                  result += heading + key + endHeading;
                  for(var i=0; i<thisObj.length; i++){
                      loopObject(thisObj[i]);
                  }
                  continue;
              }
              if(typeof obj[key] === 'object') {
                  result += heading + key + endHeading;
                  loopObject(obj[key]);
              } else {
                  // result += a + key +': '+ obj[key] + endA;
                  result += a + key + ': ' + '{{' + key + '}}' + endA;
              }
          }
      };

      // Thanks to https://gist.github.com/sente/1083506
      function formatXml(xml) {
          var formatted = '';
          var reg = /(>)(<)(\/*)/g;
          xml = xml.replace(reg, '$1\r\n$2$3');
          var pad = 0;
          jQuery.each(xml.split('\r\n'), function(index, node) {
              var indent = 0;
              if (node.match( /.+<\/\w[^>]*>$/ )) {
                  indent = 0;
              } else if (node.match( /^<\/\w/ )) {
                  if (pad != 0) {
                      pad -= 1;
                  }
              } else if (node.match( /^<\w[^>]*[^\/]>.*$/ )) {
                  indent = 1;
              } else {
                  indent = 0;
              }

              var padding = '';
              for (var i = 0; i < pad; i++) {
                  padding += '  ';
              }

              formatted += padding + node + '\r\n';
              pad += indent;
          });

          return formatted;
      }
      });