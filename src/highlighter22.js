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
    }, options);

    function markStyle() {
      return `color: ${settings.color}; background-color: ${settings.backgroundColor}; padding: ${settings.padding}px;`;
    }

    const pluginContainer = $('[data-highlighter-22]');

    return this.each(function () {
      var $input = $(this);

      $input.on('input', function () {
        var inputValue = $input.val().toString().trim();
        var lowerCaseValue = inputValue.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        // filter feature
        if (settings.filter) {
          pluginContainer.find('[data-filter]').each(function (item) {
            var filterableContent = $(this)
              .text()
              .toString()
              .toLowerCase()
              .trim();

            // json data
            if($(this).data('json') !== undefined) {
              filterableContent += Array($(this).data('json'))
                .map(key => key)
                .join(' ');
            }

            $(this).hide();

            if (filterableContent.includes(lowerCaseValue)) {
              $(this).show();
            }
          });
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