
$.extend( S, {
    todo:function() {

                window.signal = {
                    tag:0,
                    cpb:[]
                   };
                var oLi = $( ".weathertool>li" );
                $( "#cityswitch" ).on( "click", function() {
                    oLi.eq( 0 ).animate( { marginTop:"-34px" }, 500 );
                } );
                $( ".submit" ).on( "click", function() {
                    oLi.eq( 0 ).animate( { marginTop:"0px" }, 500 );
                } );
                $( ".droplist" ).on( "click", function( e ) {
                    var tempEle = $( this ).find( "ul" ), c = "", inputEle = null;
                    inputEle = $( this ).find( "[type=hidden]" );
                    tempEle.show();
                    $( this ).on( "click", "li:not(.more)", function( e ) {
                        var sel = $( this ).text();
                        inputEle.val( sel );
                        inputEle.next().text( sel );
                        tempEle.hide();

                        //点击li会冒泡到droplist 触发它的事件
                        e.stopPropagation();
                    } );

                    //防止冒泡到body触发它
                    e.stopPropagation();
                    $( document ).on( "click", function() {
                    tempEle.hide();
                } );

                    // $(this).find('.more').click(function(){
                    //  $(this).parent().hide();
                    //  e.stopPropagation();
                    // })
                } );

                $( "#text" ).on( "keyup", { isfirstLoaded:false }, function( event ) {
                    var cb = "", random = 0, value = "", i = 0, str = "", original  =  getOriginal(), temp = {}, c = this, searchbox = $( ".searchbox" );
                    function getOriginal() {
                        return "1";
                    }
                    function  append( j ) {
                        var reponseArray =  [], len = 0, first = {};
                        reponseArray = j.data;
                        len = reponseArray.length;
                        if ( len == 0 ) {
                            searchbox.hide();
                            return;
                        }
                        for ( i = 0; i < len; i++ ) {
                            str += '<li><a href="#">' + reponseArray[ i ] + "</a></li>";
                        }
                        temp = $( ".ul" );
                        temp.html( str );
                        if ( !event.data.isfirstLoaded ) {
                            searchbox.show();
                        }
                        temp.on( "click", "a", function() {

                            // $('#text').focus()
                            $( c ).val( $( this ).text() );
                            searchbox.hide();
                        } );
                        temp.on( "mouseover", "li", function() {
                            $( this ).siblings().removeClass( "hover" );
                            $( this ).addClass( "hover" );
                        } );
                        first = temp.find( "li:first" );
                        first.addClass( "hover" );

                        // Temp.on('mouseout',function(){
                        //     first.siblings().removeClass('hover')
                        //     first.addClass('hover')
                        // })
                    }
                    random =  new Date().getTime();
                    cb =  weather.getId( append );
                    value = $.trim( $( "#text" ).val() );

                    // Console.log(event.which,event.data);
                    if ( !value ) {

                        // $('.ul').html(original);
                        searchbox.hide();
                        return;
                    }
                    $.ajax( {
                        data:{ _cb:cb, ver:1, Refer:"sina_sug", key:value },
                        url:"http://s.weibo.com/ajax/jsonp/suggestion",
                        dataType:"jsonp",
                        jsonp:cb
                    } );
                } );
                $( "#text" ).on( "focus", function() {
                  if ( $( this ).val() == "请输入关键字" ) {
                    $( this ).val( "" );
                  }
                  $( ".searchbox" ).show();
                } );

                $( "#text" ).on( "blur", function() {
                  if ( $( this ).val() == "" ) {
                    $( this ).val( "请输入关键字" );

                    //放在里面防止在有下拉框时不触发
                    $( ".searchbox" ).hide();
                  }
                } );
                $( "#text" ).trigger( "keyup", { isfirstLoaded:true } );
                $( document ).click( function() {
                    $( ".searchbox" ).hide();
                } );
                $( "#text" ).click( function( e ) {
                    e.stopPropagation();
                } );

            //载入时判断是否有localstorage有点话读取地址并发起请求
            weather.init();
                var hasSetweather = S.storage.getItem( "hao360.weather" );
                if ( !!hasSetweather ) {
                    try {//Ie8以下
                    var area = hasSetweather[ "value" ] && hasSetweather[ "value" ][ "area" ];
                    h( ".province", 0 );
                    $( ".province" ).trigger( "change" );
                    h( ".city", 1 );
                    $( ".city" ).trigger( "change" );
                    h( ".area", 2 );
                    $( ".submit" ).trigger( "click" );
                    function h( parent, v ) {
                        if ( v == 2 ) {
                            v = area[ v ][ 1 ].substring( 3 );
                        }else {
                            v = area[ v ][ 1 ];
                        }
                        var ele = weather.findOptionByvalue( parent, v );
                        weather.setSelect( ele );

                    }
                }catch ( e ) {
                         console.log( e );
                    }
                }else {
                    S.cross( {
                            url:S.url.cityCode,
                            deleteScript:false,
                            cb:function() {
                                console.log( 1 );
                                $( ".province" ).trigger( "change" );
                                $( ".submit" ).trigger( "click" );

                                //第一次载入时
                            } } );
                }

            // 实现载入时与上次不同页面的功能
            require( [ "lib/state-toggle" ], function( toggle ) {
                toggle( {
                    arr1:[ ".tab1", ".tab3" ],
                    arr2:[ ".tab2", ".tab4" ]
                } );
            } );
            require( [ "lib/tab" ], function( tab ) {
               tab( { domparent:".like" } );

                // Tab
            } );
    }
} );
S.init();
