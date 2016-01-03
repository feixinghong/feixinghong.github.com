define(function(){
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
  // var app =function(options){
  //   var c=this,parent={}
  //   this.triggerType='mouseover';
  //   this.domparent='body';
  //    _.extend(c, _.pick(options, ['triggerType']));
  //    _.extend(c, _.pick(options, ['domparent']));
  //    parent=$(c['domparent']);
  //     c.$tabparent = parent.find('.js-tab-title');
  //     c.$contents = c.$tabparent.next('.js-tab-content').find('.item');
  //     c.tabs=c.$tabparent.find('a');//get tabs;
  //     c.$tabs.on(c.triggerType, function() {
  //       var $this = $(this), index = $this.data('index') || $this.index();
  //       //if($this.hasClass('.current')) return;

  //       c.$tabs.filter('.current').removeClass('current');
  //       $this.addClass('current');

  //       c.$contents.removeClass('active').eq(index).addClass('active');
  //       // $this.trigger('tab.active', index);
  //     });

  //     c.$tabs.eq(0).trigger(c.triggerType);
  // }
    // triggerType:'mouseenter',
    // initialize: function(options) {
    //   var c = this;
    // }
    var app=function(name){
      this.name=name
    }
  return  function(config) {//入口  domparent,triggertype
    return new app(/*$.extend({}, config*/config));
  };
});
