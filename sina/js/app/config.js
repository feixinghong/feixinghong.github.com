// Function register(str){
//                 var arr=str.split('.'),parent={},i=0,temp=null,l,reg=/,/g;
//                 parent=window;
//                for(i,l=arr.length;i<l;i++){
//                     temp=arr[i];
//                     if(!parent[temp] ) parent[temp]={};
//                     parent=parent[temp];
//                }
//           }

// Register("S.weather");
// register("S.storage");
// register("S.Cookie");
// register("S.Ajax.cross");
// register("S.url");
// register("S._");
// 此文件初始化时不要包含对dom的操作，会失效，因为dom在执行此文件时还未载入，比如下面的weather
// 只适合用来为对象添加属性方法
( function( S ) {
    var _ = ( function() {
      var nativeForEach   = Array.prototype.forEach, toString = Object.prototype.toString, _ = {}, breaker = {}, slice = Array.prototype.slice, each,
      ArrayProto = Array.prototype, concat = ArrayProto.concat;
      _.each  = _.forEach = each = function( obj, iterator, context ) {//为每一个obj运行一次函数且 iterator(value,key,list)
      if ( obj == null ) return obj;
      if ( nativeForEach && obj.forEach === nativeForEach ) {//如果是数组的话就提调用自己的
        obj.forEach( iterator, context );
      } else if ( obj.length === +obj.length ) {//数组的话
        for ( var i = 0, length = obj.length; i < length; i++ ) {
          if ( iterator.call( context, obj[ i ], i, obj ) === breaker ) return;
        }
      } else {//对象
        var keys = _.keys( obj );
        for ( var i = 0, length = keys.length; i < length; i++ ) {
          if ( iterator.call( context, obj[ keys[ i ] ], keys[ i ], obj ) === breaker ) return;
        }
      }
      return obj;
    };
    _.each( [ "Arguments", "Function", "String", "Number", "Date", "RegExp", "Object" ], function( name ) {
      _[ "is" + name ] = function( obj ) {
        return toString.call( obj ) == "[object " + name + "]";
      };
    } );
  _.extend = function( obj ) {
	    each( slice.call( arguments, 1 ), function( source ) {
	      if ( source ) {
	        for ( var prop in source ) {
	          obj[ prop ] = source[ prop ];
	        }
	      }
	    } );
	    return obj;
	  };

     // Return a copy of the object only containing the whitelisted properties.
  _.pick = function( obj ) {
    var copy = {};
    var keys = concat.apply( ArrayProto, slice.call( arguments, 1 ) );
    each( keys, function( key ) {
      if ( key in obj ) copy[ key ] = obj[ key ];
    } );
    return copy;
  };
    _.defaults = function( obj ) {
        each( slice.call( arguments, 1 ), function( source ) {
          if ( source ) {
            for ( var prop in source ) {
              if ( obj[ prop ] === void 0 ) obj[ prop ] = source[ prop ];
            }
          }
        } );
        return obj;
      };
      _.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
      };

      // _.sectionSplice=/{([\s\S]+?)}[\s\S^{}]+?{\/([\s\S]+?)}/g
      // _.fetch(tpl){
      //   var text=document.getElementById('tpl').innerHTML;
      // }

      // When customizing `templateSettings`, if you don't want to define an
      // interpolation, evaluation or escaping regex, we need one that is
      // guaranteed not to match.
      var noMatch = /(.)^/;

      // Certain characters need to be escaped so that they can be put into a
      // string literal.
      var escapes = {
        "'":      "'",
       "\\":    "\|",
        "\r":     "r",
        "\n":     "n",
        "\t":     "t",
        "\u2028": "u2028",
        "\u2029": "u2029"
      };

      var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

      // JavaScript micro-templating, similar to John Resig's implementation.
      // Underscore templating handles arbitrary delimiters, preserves whitespace,
      // and correctly escapes quotes within interpolated code.
      _.template = function( text, data, settings ) {
        var render;
        settings = _.defaults( {}, settings, _.templateSettings );

        // Combine delimiters into one regular expression via alternation.
        var matcher = new RegExp( [
          ( settings.escape || noMatch ).source,
          ( settings.interpolate || noMatch ).source,
          ( settings.evaluate || noMatch ).source
        ].join( "|" ) + "|$", "g" );

        // Compile the template source, escaping string literals appropriately.
        var index = 0;
        var source = "__p+='";
        text.replace( matcher, function( match, escape, interpolate, evaluate, offset ) {
          source += text.slice( index, offset )
            .replace( escaper, function( match ) { return "\\" + escapes[ match ]; } );

          if ( escape ) {
            source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
          }
          if ( interpolate ) {
            source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
          }
          if ( evaluate ) {
            source += "';\n" + evaluate + "\n__p+='";
          }
          index = offset + match.length;
          return match;
        } );
        source += "';\n";

        // If a variable is not specified, place data values in local scope.
        if ( !settings.variable ) source = "with(obj||{}){\n" + source + "}\n";

        source = "var __t,__p='',__j=Array.prototype.join," +
          "print=function(){__p+=__j.call(arguments,'');};\n" +
          source + "return __p;\n";

        try {
          render = new Function( settings.variable || "obj", "_", source );
        } catch ( e ) {
          e.source = source;
          throw e;
        }

        if ( data ) return render( data, _ );
        var template = function( data ) {
          return render.call( this, data, _ );
        };

        // Provide the compiled function source as a convenience for precompilation.
        template.source = "function(" + ( settings.variable || "obj" ) + "){\n" + source + "}";

        return template;
      };
    return _;
    } )();
    var i = 0;
    $.extend( this, { weather:{
                getId:function( fn ) {
                    var str = "_jsonp_";
                    var temp = str + i++;
                     window[ temp ] = fn;
                    return temp;
                },
                setSelect:function( ele ) {
                    $( ele ).attr( "selected", "selected" );
                },
                findOptionByvalue:function( parent, v ) {
                    var kids = $( parent ).children();
                    for ( var i = 0, l = kids.length; i < l; i++ ) {
                        kids[ i ].removeAttribute( "selected" );
                    }
                    for ( var i = 0, l = kids.length; i < l; i++ ) {
                        if ( kids.eq( i ).attr( "value" ) == v ) {
                            return kids.eq( i );
                        }
                    }
                    return false;
                },
                init:function() {
                    var c = this;
                    c.bind();
                    return c;
                },
                joinUrl:function( cityCode, param, cb ) {
                    var weatherUrl = "http://cdn.weather.hao.360.cn/sed_api_weather_info.php?v=1&app=hao360&t=2416241&code=" + cityCode + "&param=" + param + "&_jsonp=" + cb;
                        S.cross( { url:weatherUrl } );
                },
                createOptions:function( dom, data ) {//对[ ['北京','01',subarr],[],[] ]形式的数组创建option
                    var len = data.length, str = "";
                       for ( var i = 0 ; i < len; i++ ) {
                        var arrayEle = data[ i ];
                        str += '<option value="' + arrayEle[ 1 ] + '">' + arrayEle[ 0 ] + "</option>";
                       }
                       $( dom ).html( str );
                },
                sub1:function( str, provincevalue ) {//23位置有一个钓鱼岛 之前的数组序号都减1 之后的不用变化
                    provincevalue = +provincevalue;
                    if ( provincevalue <= 23 ) {
                        return str.length === 4 ?
                             {
                                proLoc:provincevalue - 1,
                                cityLoc:str.substring( 2 ) - 1
                            }
                        :
                           str - 1;
                        }else if ( provincevalue == 35 ) {
                            return str.length === 4 ?
                                 {
                                    proLoc:23,
                                    cityLoc:0
                                }
                            :
                              23;
                        }else {
                            return str.length === 4 ?
                                 {
                                    proLoc:provincevalue,
                                    cityLoc:str.substring( 2 ) - 1
                                }
                            :
                               +str;
                        }

                },
                bind:function() {
                    var code = "", c = this;
                    var province;
                    c.createOptions( ".province", chinaAreaMap );
                    $( ".province" ).on( "change", function() {//When change the province
                        code = $( this ).attr( "value" );
                        var str = "option" + "[value=" + code + "]";
                        $( this ).find( str ).attr( { selected:"selected" } );
                        province = c.sub1( code, code );
                        //更新city
                        var cityArr = chinaAreaMap[ province ][ 2 ];
                        c.createOptions( ".city", cityArr );
                        var area = cityArr[ 0 ][ 2 ];
                        c.createOptions( ".area", area );

                    } );
                    $( ".city" ).on( "change", function() {//When change the city
                        code = $( this ).attr( "value" );
                        var loc = c.sub1( code, code.substring( 0, 2 ) );
                        var areadata = chinaAreaMap[ loc[ "proLoc" ] ] [ 2 ] [ loc[ "cityLoc" ] ] ;
                        areadata = areadata[ 2 ];
                        c.createOptions( ".area", areadata );
                    } )

                    var temparr;
                    $( ".submit" ).click( function() {
                        var citySearchCode = "101" + $( ".area" ).attr( "value" ), tempCb = "";
                        if ( signal.tag == 0 ) {//信号灯
                            var id = c.getId( c.pm25cb );
                            signal.cpb.push( { cb:c.joinUrl,
                                            args:[ citySearchCode, "pm25", id ] } );
                        }/*else{
                            c.joinUrl(citySearchCode,"pm25","pm25");
                        }*/
                        tempCb = c.getId( c.weathercb );

                        //此时返回的_jsonp_1指向window的一个方法。里面的this指向window，再在里面调用weather的方法会出错
                        c.joinUrl( citySearchCode, "weather", tempCb );
                    } );
                },
                pm25cb:function( j ) {
                    var pm25 = 23, range = "", text = "优", str = "";
                    try {
                        pm25 = Number( ( j[ "pm25" ][ "pm25" ][ 0 ] || 23 ) );
                        if ( pm25 >= 0 && pm25 <= 50 ) {
                            range = "range1";
                        }else if ( pm25 >= 51 && pm25 <= 100 ) {
                            range = "range2";
                            text = "良";
                        }else {
                            range = "range3";
                            if ( pm25 > 100 && pm25 < 151 ) {
                                text = "轻度污染";
                            }else if ( pm25 > 150 && pm25 < 201 ) {
                                text = "中度污染";
                            }else {
                                text = "重度污染";
                            }
                        }
                        str = _.template( S.template.pm25, { text:text, classname:range, num:pm25 } );
                        $( ".pm25" ).html( str );
                    }catch ( e ) {
                        console.log( "%c " + e + " but not worry its normal for now pm25 cant get from the service", "font-size:25px;color:green;" );
                        $( ".pm25" ).html( "" );
                    }
                },
                getDayWeather:function( t, whichDay ) {
                    var c = this;
                    if ( whichDay == 0 ) {
                        return c.getTodayWeather( t, 0 );
                    } else {
                        var weatherArr = t[ "weather" ][ whichDay ][ "info" ] || [];
                        var dayWeather = weatherArr[ "day" ] || [];
                        var tempeture = weatherArr[ "day" ][ 2 ] + "~" + weatherArr[ "night" ][ 2 ];
                        var wind = dayWeather[ 3 ] && dayWeather[ 3 ] === "\u65E0\u6301\u7EED\u98CE\u5411" ? "\u98CE\u5411\u4E0D\u5B9A\uFF1A\u5FAE\u98CE" : ( dayWeather[ 3 ] + ":" + dayWeather[ 4 ] );
                        return {
                            wind:wind,
                            t:tempeture,
                            weather:dayWeather[ 1 ]
                        };
                    }
                },
                getTodayWeather:function( t, whichDay ) {
                    var whenNow = "day";
                    var h = ( new Date() ).getHours();
                    whenNow = ( h >= 18 ) ? "night" : ( h <= 6 ? "dawn" : "day" );
                    var weatherAllDay = t[ "weather" ][ whichDay ][ "info" ];
                    var nowWeather = weatherAllDay[ whenNow ];//Return ['2','阴','9',"无持续风向",'微风']
                    var tempeture = nowWeather[ 2 ];
                    var wind = nowWeather[ 3 ] && nowWeather[ 3 ] === "\u65E0\u6301\u7EED\u98CE\u5411" ? "\u98CE\u5411\u4E0D\u5B9A\uFF1A\u5FAE\u98CE" : ( nowWeather[ 3 ] + ":" + nowWeather[ 4 ] );
                    return {
                            wind:wind,
                            "t":tempeture,
                            weather:nowWeather[ 1 ]
                        }
                },
                weathercb:function( t ) {
                        if ( !t ) {
                            return ;
                        }

                        //下面是对返回的数据进行处理然后填入localStorage中。
                        var lastUpdated = t.time, value, expires, weatherFormat, code, c = weather, temp;
                        ( value = value || {} )[ "area" ] = t.area;
                        value[ "code" ] = t.area[ 2 ][ 1 ];
                        expires = lastUpdated + 1000 * 60;
                        ( weatherFormat = weatherFormat || {} )[ "today" ] = c.getDayWeather( t, 0 );
                        weather[ "tomorow" ] = c.getDayWeather( t, 1 );
                        value[ "weather" ] = weatherFormat;
                        temp = { "value":value,
                                "lastUpdated":lastUpdated,
                                "expires":expires
                        };
                        S.storage.setItem( "hao360.weather", temp );
                        c.render( { city:t[ "area" ][ 2 ][ 0 ], temperature:weatherFormat[ "today" ][ "t" ], weather:weatherFormat[ "today" ][ "weather" ] } );
                        signal.tag = 1;//打开开关并执行第二个ajax
                        if ( signal.cpb.length !== 0 ) {
                            var fun = signal.cpb.pop();
                            fun[ "cb" ].apply( null, fun[ "args" ] );
                            signal.tag = 0;//还原
                        }
                    },
                render:function( data ) {
                    var tel = "";
                    if ( !S.template.weather ) return;
                    tel = _.template( S.template.weather );
                    tel = tel( data );
                    $( ".weather-info" ).html( tel );
                }

            }
        }, { _:_ } );

    // S.ajax=function(config){
    //     var random=new Date().getTime();
    //     var conf={
    //         data:{},
    //         dataType:'json',
    //         cb:function(){}
    //     }
    //     $.extend(conf,config);
    //     if( !_.isFunction(conf['cb']) || !conf['url']) return
    //     $.extend(conf['data'],{t:random});
    //     $.ajax({
    //         data:conf['data'],
    //         dataType:conf['dataType'],
    //         url:conf['url'],
    //         success:function(j){
    //             if(!j) return;
    //             conf['cb'](j);
    //         },
    //         error:function(){
    //             console.log('error ajax')
    //         }
    //     })
    // }
    $.extend( S, {
        url:{
            weather:"http://cdn.weather.hao.360.cn/sed_api_weather_info.php?v=1&app=hao360&t=2416241&code=cityCode&param=params&_jsonp=cb1",
            pm25:"",
            cityCode:"./js/cityMap.js"
        },
        template:{
            pm25:'<span class="range <%=classname%>"> <%=text%></span><span class="num"><%=num%></span>',
            weather:'<a href="#"><%=city%><span>&nbsp;<%=weather%></span> <%=temperature%><sup>。</sup>C<span class="pm25"></span></a>'
        },
        Cookie:{
            get: function( n ) {
                var a = document.cookie.match( new RegExp( "(^| )" + n + "=([^;]*)(;|$)" ) );
                return a ? a[ 2 ] : a;
            },
            set: function( name, value, hour, domain, path ) {
                if ( _.isObject( value ) )
                    value = JSON.stringify( value );
                var sc = name + "=" + ( value + "" );
                hour = Number( hour ) || 48;
                path = path || "/";

                var date = new Date();
                date.setTime( date.getTime() + hour * 3600 * 1000 );
                sc += ";expires=" + date.toGMTString();
                if ( domain )
                    sc += ";domain=" + domain;
                sc += ";path=" + path;
                document.cookie = sc;
            },
            del: function( n, domain, path ) {
                var exp = new Date(), t = this, v;
                t.set( n, "", -10000, domain, path );
            }
        },
        cross:function( config ) {
            var conf = {
                where:"head",//添加到哪里
                deleteScript:false,//是否删除node
                cb:function() {}
            },
            temp = {}, script = {}, isFunc = false;
            $.extend( conf, config );
            isFunc = _.isFunction( conf[ "cb" ] );
            if ( !config.url || !isFunc ) return ;
            script = document.createElement( "script" );
            script.setAttribute( "src", conf[ "url" ] );
            temp = document.getElementsByTagName( conf[ "where" ] )[ 0 ];
            script.onload = script.onreadystatechange = function() {
                if ( !script.readyState || /loaded|complete/.test( script.readyState ) ) {
                    conf[ "cb" ].call( null );
                }

             }
             temp.appendChild( script );
            !conf[ "deleteScript" ] || temp.removeChild( script );
            return script;
        },
        storage:{//存储{k,"v"};
                    _queue:[],
                    setItem:function( k, v ) {
                        var objProto = Object.prototype;
                        if ( objProto.toString.call( v ) == objProto.toString() ) {
                            v = JSON.stringify( v );
                        }
                        window.localStorage.setItem( k, v );
                    },
                    getItem:function( k ) {
                        var temp;
                        if ( !window.localStorage || !( temp = window.localStorage.getItem( k ) ) ) {
                            return false;
                        }
                        try {
                            return JSON.parse( temp );//解析出错说明不是对象字符串的结果。
                            }
                            catch ( e ) {
                                console.log( "localstorage:parser error" );
                            return temp;
                            }
                    },
                    push:function( e ) {
                        var c = this;
                        c._queue.push();
                    },
                    _searchCity:function( obj ) {

                    }
         },
        init:function() {
        	var c = this;
         	$( document ).ready( function() {
         		console.log( "document loaded" );
         		c.todo();
         	} );
         }
    } );

} ).call( this, ( window.S ) || ( window.S = {} ) );
