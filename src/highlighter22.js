

(function ($) {
  $.fn.highlighter22 = function (options) {
    var settings = $.extend({
      color: 'black',
      backgroundColor: '#FFFF00',
      padding: 0,
      escapeSpace: true,
      targets: []
    }, options);

    function markStyle() {
      return `color: ${settings.color}; background-color: ${settings.backgroundColor}; padding: ${settings.padding}px;`;
    }

    return this.each(function () {
      var $input = $(this);
      var $target = $(settings.target);

      $input.on('input', function () {
        var inputValue = $input.val();
        var lowerCaseValue;

        if (settings.escapeSpace) {
          lowerCaseValue = inputValue.toLowerCase().replace(/[.*+?^${}()|[\]\\\s]/g, '\\$&');
        } else {
          lowerCaseValue = inputValue.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }

        if (settings.targets.length > 0) {
          $.each(settings.targets, function (index, targetEl) {

            $(targetEl).each(function (_index, target) {
              var highlightedText = $(target).text().replace(new RegExp(lowerCaseValue, 'gi'), function (match) {
                return `<mark style="${markStyle()}">${match}</mark>`;
              });

              console.log(target);
              $(target).html(highlightedText);

            });
          });
        }


      });
    });
  };
})(jQuery);