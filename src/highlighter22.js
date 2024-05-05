/**
 * Author: Monir Saikat
 * Email: monirsaikat1@gmail.com 
 */

(function ($) {
  $.fn.highlighter22 = function (options) {
    var settings = $.extend({
      color: 'black',
      backgroundColor: '#FFFF00',
      padding: 0,
      targets: [],
      filter: false,
      animation: false
    }, options);

    const animateTypes = {
      'fade': {
        first: 'fadeIn',
        second: 'fadeOut'
      },
      'bounce1': {
        first: 'bounceIn',
        second: 'bounceOut'
      },
      'bounce2': {
        first: 'bounceInDown',
        second: 'bounceOutUp'
      },
    }

    function markStyle() {
      return `color: ${settings.color}; background-color: ${settings.backgroundColor}; padding: ${settings.padding}px;`;
    }

    const pluginContainer = $('[data-highlighter-22]');

    function countOccurrences(string, substring) {
      if (!substring) return 1;
      const regex = new RegExp(substring, 'gi');
      const matches = string.match(regex);
      return matches ? matches.length : 0;
    }

    function sortObjectByValue(obj, desc = false) {
      return Object.entries(obj).sort(function (a, b) {
        return desc ? (b[1] - a[1]) : (a[1] - b[1]);
      });
    }

    const initValues = $('[data-filter]');

    return this.each(function () {
      var $input = $(this);

      $input.on('input', function () {
        var inputValue = $input.val().toString().trim();
        var lowerCaseValue = inputValue.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        // filter feature
        if (settings.filter) {
          const cnt = {};

          pluginContainer.find('[data-filter]').each(function (_index, item) {
            var filterableContent = $(this)
              .text()
              .toString()
              .toLowerCase()
              .trim();

            // json data
            if ($(this).data('json') !== undefined) {
              filterableContent += ' ';
              filterableContent += eval($(this).data('json'))
                .map(key => key.toLowerCase())
                .join(' ');
            }

            cnt[_index] = countOccurrences(filterableContent, lowerCaseValue);

            const display = $(this).css('display');
            const first = settings.animation ? animateTypes[settings.animation].first : null;
            const second = settings.animation ? animateTypes[settings.animation].second : null;

            if (cnt[_index]) {
              if (!settings.animation) {
                $(this).show();
              } else {
                if (display == 'none') {
                  $(this).addClass(first).removeClass(second).show();
                } else {
                  $(this).removeClass(first);
                }
              }
            } else {
              if (!settings.animation) {
                $(this).hide();
              } else {
                if (display == 'block' && !$(this).hasClass(first)) {
                  $(this).addClass(second).removeClass(first);
                  setTimeout(() => {
                    $(this).hide();
                  }, 500)
                }
              }
            }

          });

          const elements = [];

          pluginContainer.children().each(function (index) {
            elements[index] = $(this);
          });

          pluginContainer.empty();

          var sortedElements = sortObjectByValue(cnt, true);
          if (lowerCaseValue.length == 0) {
            pluginContainer.html(initValues);
          } else {
            sortedElements.map(function (array) {
              pluginContainer.append(elements[Number(array[0])])
            });
          }
        }

        const targets = pluginContainer.find('[data-key]')
        if (targets.length > 0) {
          $.each(targets, function (index, targetEl) {
            $(targetEl).each(function (_index, target) {
              var highlightedText = $(target).text().replace(new RegExp(lowerCaseValue, 'gi'), function (match) {
                return `<mark style="${markStyle()}">${match}</mark>`;
              });

              $(target).html(highlightedText);
            });
          });
        }
      });
    });
  };
})(jQuery);