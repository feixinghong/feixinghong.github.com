define(function() {

  // 功能：每一次载入与上一次不一样，并且绑定切换按钮
  // conf={
  // 	arr1:[1,3],
  // 	arr2:[2,4]
  // }
  var toggleState;
  toggleState = function(conf) {
    this.node = {
      node1: [],
      node2: []
    };
    this.initialize.call(this, conf);
  };
  $.extend(toggleState.prototype, {
    initialize: function(conf) {
      var arr1 = conf.arr1, arr2 = conf.arr2, c = this, concat = [];
      this._len = conf.arr1.length;
      for (var i = 0; i < this._len; i++) {
        this.node.node1.push($(arr1[ i ]));
        this.node.node2.push($(arr2[ i ]));
      }
      if (S.Cookie.get('togglestate') == 1) {
        this.toState(2);
      }else {
        this.toState(1);
      }
      $('.js-state').on('click', function() {
        c.toState(c._state == '1' ? '2' : '1');
      });
      concat = this.node.node1.concat(this.node.node2);
      _.each(concat, function(ele) {
        require(['lib/tab'], function(tab) {
          tab({domparent: ele});
        });
      });

      // SetInterval(function(){
      // 	c.toState(c._state=='1'?'2':'1')
      // },5000)
    },
    toState: function(which) {
      which = which + '';
      var str1 = 'node' + which, another = which == 1 ? '2' : '1', str2 = 'node' + another;

      //切换内部状态，共按钮切换使用
      this._state = which;
      _.each(this.node[ str1 ], function(ele) {
        ele.show();
      });
      _.each(this.node[ str2 ], function(ele) {
        ele.hide();
      });
      S.Cookie.set('togglestate', which);
    }
  });
  return function(config) {
    return new toggleState(config);
  };
});
define('h', [], function() {
  var a = function() {
    this.name = 'bob';
  };
  return a;
});
