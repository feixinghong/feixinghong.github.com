define( function() {
  /*
    通用tab切换逻辑
    示例：
    <div class="js-tab" data-play="1">
      <div>
        <div class="tab-item">1</div>
        <div class="tab-item">2</div>
        <div class="tab-item">3</div>
      </div>
      <div>
        <div class="content">content1</div>
        <div class="content">content2</div>
        <div class="content">content3</div>
      </div>
    </div>
    triggerType 触发事件类型，默认为mouseenter
  */
  var app = function( options ) {
    var c = this, parent = {};
    this.triggerType = "mouseover";
    this.domparent = "body";
     _.extend( c, _.pick( options, [ "triggerType" ] ) );
     _.extend( c, _.pick( options, [ "domparent" ] ) );
     parent = $( c[ "domparent" ] );
      c.$tabs = parent.find( ".js-tab" );
      c.$contents = parent.find( ".js-tab-content .item" );
      parent.delegate( ".js-tab" ,c.triggerType , function() {
        var $this = $( this ), index = $this.data( "index" ) || $this.index();

        //If($this.hasClass('.current')) return;

        c.$tabs.filter( ".current" ).removeClass( "current" );
        $this.addClass( "current" );

        c.$contents.removeClass( "active" ).eq( index ).addClass( "active" );

        // $this.trigger('tab.active', index);
      } )

      c.$tabs.eq( 0 ).trigger( c.triggerType );
  };

    // TriggerType:'mouseenter',
    // initialize: function(options) {
    //   var c = this;
    // }
  return function( config ) {//入口  domparent,triggertype
    return new app( $.extend( {}, config ) );
  };
} );
