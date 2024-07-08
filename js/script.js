$(document).ready(function() {
  var totalItems = $('.item').length; // 總共的圖片數量
  var currentIndex = 0; // 當前顯示圖片的索引

  // 初始化，第一張圖片為 active
  updateActiveThumbnail(currentIndex);

  // 點擊右側按鈕
    $('.rightLst').click(function() {
        if (currentIndex < totalItems - 1) {
            currentIndex++;
            updateRightButtonState(); // 更新右按鈕狀態
        }
        updateActiveThumbnail(currentIndex);
    });

    // 更新右按鈕狀態
    function updateRightButtonState() {
        if (currentIndex === totalItems - 1) {
            $('.rightLst').addClass('over'); // 禁用右按鈕的樣式
        } else {
            $('.rightLst').removeClass('over'); // 啟用右按鈕的樣式
        }
    }

  // 點擊左側按鈕
  $('.leftLst').click(function() {
      if (currentIndex > 0) {
          currentIndex--;
      } else {
          currentIndex = totalItems - 1; // 循環到最後一張圖片
      }
      updateActiveThumbnail(currentIndex);
  });

  // 點擊縮略圖事件處理
  $('.thumbnail').on('click', function() {
      currentIndex = $(this).parent().parent().index(); // 確保這裡取得了正確的索引值
      updateActiveThumbnail(currentIndex);
  });

  // 更新活動縮略圖和 mainImage
  function updateActiveThumbnail(index) {
      $('.thumbnail').removeClass('active'); // 移除所有縮略圖的 active 類別
      $('.item').eq(index).find('.thumbnail').addClass('active'); // 添加活動狀態給當前索引的縮略圖

      var largeImage = $('.item').eq(index).find('.thumbnail').data('large');
      $('#mainImage').attr('src', largeImage); // 更新主圖片的 src

      // 更新文字區塊顯示的當前索引
      $('#indexDisplay').text((index + 1) + '/' + totalItems);
  }

  // MultiCarousel 相關設定
  var itemsMainDiv = '.MultiCarousel';
  var itemsDiv = '.MultiCarousel-inner';
  var itemWidth = "";

  $('.leftLst, .rightLst').click(function() {
      var condition = $(this).hasClass("leftLst");
      if (condition)
          click(0, this);
      else
          click(1, this)
  });

  ResCarouselSize();

  $(window).resize(function() {
      ResCarouselSize();
  });

  // 設定每個項目的大小
  function ResCarouselSize() {
      var incno = 0;
      var dataItems = "data-items";
      var itemClass = ".item";
      var id = 0;
      var btnParentSb = "";
      var itemsSplit = "";
      var sampwidth = $(itemsMainDiv).width();
      var bodyWidth = $("body").width();
      $(itemsDiv).each(function() {
          id = id + 1;
          var itemNumbers = $(this).find(itemClass).length;
          btnParentSb = $(this).parent().attr(dataItems);
          itemsSplit = btnParentSb.split(",");
          $(this).parent().attr("id", "MultiCarousel" + id);

          // Set itemWidth to show 3 items per row
          incno = itemsSplit[1]; // Assuming itemsSplit[1] corresponds to 3 items per row
          itemWidth = sampwidth / incno;

          $(this).css({ transform: "translateX(0px)", width: itemWidth * itemNumbers });
          $(this)
              .find(itemClass)
              .each(function() {
                  $(this).outerWidth(itemWidth);
              });

        //   $(".leftLst").addClass("over");
        //   $(".rightLst").removeClass("over");
      });
  }

  // 移動項目
  function ResCarousel(e, el, s) {
      var leftBtn = '.leftLst';
      var rightBtn = '.rightLst';
      var translateXval = '';
      var divStyle = $(el + ' ' + itemsDiv).css('transform');
      var values = divStyle.match(/-?[\d\.]+/g);
      var xds = Math.abs(values[4]);
      if (e == 0) {
          translateXval = parseInt(xds) - parseInt(itemWidth * s);
          $(el + ' ' + rightBtn).removeClass("over");

          if (translateXval <= itemWidth / 2) {
              translateXval = 0;
              $(el + ' ' + leftBtn).addClass("over");
          }
      } else if (e == 1) {
          var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
          translateXval = parseInt(xds) + parseInt(itemWidth * s);
          $(el + ' ' + leftBtn).removeClass("over");

          if (translateXval >= itemsCondition - itemWidth / 2) {
              translateXval = itemsCondition;
          }
      }
      $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
  }

  // 獲取按鈕元素
  function click(ell, ee) {
      var Parent = "#" + $(ee).parent().attr("id");
      var slide = $(Parent).attr("data-slide");
      ResCarousel(ell, Parent, slide);
  }
});
