// 构造轮播图的构造函数
function Swiper(options, wrap) {
  // 当前要插入轮播图的区域
  this.wrap = wrap;
  // 轮播的内容列表
  this.contentList = options.contentList || [];
  this.autoChangeTime = options.autoChangeTime || 5000;
  // 轮播的动画类型 fade： 淡入淡出   animate 从左到右的轮播
  this.type = options.type || "fade";
  this.isAuto = options.isAuto == undefined ? true : !!options.isAuto;
  this.showChangeBtn = options.showChangeBtn || "always";
  this.showSpots = options.showSpots == undefined ? true : !!options.showSpots;
  this.spotSize = options.spotSize || 5;
  this.spotPosition = options.spotPosition || "center";
  this.spotColor = options.spotColor || "red";
  this.width = options.width || $(wrap).width();
  this.height = options.height || $(wrap).height();
  // 轮播列表的长度
  this.len = this.contentList.length;
  // 当前展示的轮播内容的索引值
  this.nowIndex = 0;
  // 自动轮播的定时器
  this.timer = null;
  // 当前是否存在切换动画的执行
  this.lock = false;
}
// 轮播图功能初始化
Swiper.prototype.init = function () {
  // 1. 创建轮播结构
  this.createElement();
  // 2. 初始化样式
  this.initStyle();
  // 3. 功能绑定
  this.bindEvent();
//   自动轮播
    if (this.isAuto) {
        this.autoChange();
    }
};
// 创建轮播图结构
Swiper.prototype.createElement = function () {
  // 整个轮播图的包裹层
  var swiperWrapper = $('<div class="my-swiper-wrapper"></div>');
  // 轮播图内容区
  var siwperItems = $('<ul class="my-swiper-items"></ul>');
  // 轮播图中的左右切换按钮区域
  var leftBtn = $(
    '<div class="my-swiper-btn my-swiper-lbtn"><i class="iconfont">&#xe628;</i></div>'
  );
  var rightBtn = $(
    '<div class="my-swiper-btn my-swiper-rbtn"><i class="iconfont">&#xe625;</i></div>'
  );
  // 轮播图的小圆点区域
  var spotsWrapper = $('<div class="my-swiper-spots"></div>');
  // 循环轮播的内容  创建轮播结构
  for (var i = 0; i < this.len; i++) {
    $('<li class="my-swiper-item"></li>')
      .html(this.contentList[i])
      .appendTo(siwperItems);
    $("<span></span>").appendTo(spotsWrapper);
  }
  if (this.type === "animate") {
    //   如果是从左到右的轮播  想要实现无缝衔接的效果 需要在最后添加一个第一张图片
    siwperItems.append(
      $('<li class="my-swiper-item"></li>').html(
        $(this.contentList[0]).clone(true)
      )
    );
  }
//   设置左右按钮的样式
  switch (this.showChangeBtn) {
      case "hide":
          leftBtn.hide();
          rightBtn.hide();
        break;   
    case "hover":
        leftBtn.hide();
        rightBtn.hide();
        swiperWrapper.hover(function () {
            leftBtn.show();
            rightBtn.show();
        }, function () {
            leftBtn.hide();
            rightBtn.hide();
        })
        break;
    default:
        break;
  }
//   设置小圆点不显示
  if (!this.showSpots) {
        spotsWrapper.hide()
  }
  swiperWrapper
    .append(siwperItems)
    .append(leftBtn)
    .append(rightBtn)
    .append(spotsWrapper)
    .appendTo(this.wrap)
    .addClass("my-swiper-wrapper_" + this.type);
};
// 初始化样式
Swiper.prototype.initStyle = function () {
  // 设置轮播内容区的整体大小
  $(this.wrap)
    .find(".my-swiper-items")
    .css({
      // 如果是从左到右的轮播效果  则轮播内容区的整体宽度等于所有轮播内容宽度之和
      width: this.type === "animate" ? this.width * (this.len + 1) : this.width,
      height: this.height,
    })
    .find(".my-swiper-item")
    .css({
      width: this.width,
      height: this.height,
    });
  // 如果是淡入淡出效果的轮播图  显示当前需要展示的轮播图
  if (this.type === "fade") {
    $(this.wrap).find(".my-swiper-item").eq(this.nowIndex).show();
  } else {
    // 如果是从左到右的轮播 则设置整体位置
    $(this.wrap)
      .find(".my-swiper-items")
      .css({
        left: -this.nowIndex * this.width,
      });
  }

  $(this.wrap)
    .find(".my-swiper-spots ")
    .css({
      textAlign: this.spotPosition,
      display: this.showSpots ? 'block' :'none',
    })
    .find("span")
    .css({
      width: this.spotSize,
      height: this.spotSize,
    })
    .eq(this.nowIndex % this.len)
    .css({
      backgroundColor: this.spotColor,
    });
};

// 功能绑定
Swiper.prototype.bindEvent = function () {
  var self = this;
  // 点击左侧按钮
  $(this.wrap)
    .find(".my-swiper-lbtn")
    .click(function () {
      // 判断当前是否有切换的动画正在进行 如果有则不进行下面的切换
      if (self.lock) {
        return ;
      }
      self.lock = true;
      // 如果是淡入淡出效果  正常处理
      if (self.type == "fade") {
        if (self.nowIndex === 0) {
          self.nowIndex = self.len - 1;
        } else {
          self.nowIndex--;
        }
        self.change();
      } else {
        // 如果是从左到右的轮播  并且 当前图片的索引值为0 要想实现无缝衔接的效果  那么需要瞬间变化到后面的第一张图片的位置
        if (self.nowIndex === 0) {
          $(self.wrap)
            .find(".my-swiper-items")
            .css({
              left: -self.len * self.width,
            });
          self.nowIndex = self.len - 1;
        } else {
          self.nowIndex--;
        }
        self.change();
      }
    });
  $(this.wrap)
    .find(".my-swiper-rbtn")
    .click(function () {
      if (self.lock) {
        return ;
      }
      self.lock = true;
      if (self.type === "fade") {
        if (self.nowIndex === self.len - 1) {
          self.nowIndex = 0;
        } else {
          self.nowIndex++;
        }
        self.change();
      } else {
        if (self.nowIndex === self.len) {
          $(self.wrap).find(".my-swiper-items").css({
            left: 0,
          });
          self.nowIndex = 1;
        } else {
          self.nowIndex++;
        }
        self.change();
      }
    });
    // 小圆点的事件  鼠标移入切换到当前对应的轮播图的位置
    $(this.wrap).find('.my-swiper-spots').on('mouseenter', 'span', function () {
        if (self.lock) {
          return ;
        }
        self.lock = true; 
      // 拿取到当前小圆点的索引值
        var index = $(this).index();
        self.nowIndex = index;
        self.change();
    });
    $(this.wrap).mouseenter(function () {
        clearInterval(self.timer);
    }).mouseleave(function () {
        if (self.isAuto) {
            self.autoChange();
        }
    })
};

// 切换图片效果
Swiper.prototype.change = function () {
  var self = this;
  if (this.type === "fade") {
    $(this.wrap).find(".my-swiper-item").fadeOut().eq(this.nowIndex).fadeIn(function () {
      self.lock = false;
    });
  } else {
    $(this.wrap)
      .find(".my-swiper-items")
      .animate({
        left: -this.nowIndex * this.width,
      }, function () {
        self.lock = false;
      });
  }
  $(this.wrap)
    .find(".my-swiper-spots > span")
    .css({
      backgroundColor: "rgba(255,255,255,.4)",
    })
    .eq(this.nowIndex % this.len)
    .css({
      backgroundColor: this.spotColor,
    });
};

// 自动轮播
Swiper.prototype.autoChange = function () {
    var self = this;
    clearInterval(this.timer);
    this.timer = setInterval(function () {
        $(self.wrap)
        .find(".my-swiper-rbtn").trigger('click');
    }, this.autoChangeTime)
}

// 给jq的实例对象扩展swiper方法用来添加轮播图
$.fn.extend({
  swiper: function (options) {
    // 存储当前轮播图的所有数据
    var obj = new Swiper(options, this);
    obj.init();
  },
});
