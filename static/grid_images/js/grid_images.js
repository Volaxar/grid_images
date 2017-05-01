(function ($) {
    'use strict';

    var updateElementIndex = function (el, prefix, ndx) {
        var id_regex = new RegExp('(' + prefix + '-(\\d+|__prefix__))');
        var replacement = prefix + "-" + ndx;

        if (el.id) {
            el.id = el.id.replace(id_regex, replacement);
        }
        if (el.name) {
            el.name = el.name.replace(id_regex, replacement);
        }
    };

    $.fn.addGridItem = function () {
        var options = $(this).data('inline-formset').options;

        var totalForms = $('#id_' + options.prefix + '-TOTAL_FORMS').prop('autocomplete', 'off');
        var maxForms = $('#id_' + options.prefix + '-MAX_NUM_FORMS').prop('autocomplete', 'off');

        if (maxForms.val() === '' || (maxForms.val() - totalForms.val()) > 0) {
            // var nextIndex = parseInt(totalForms.val(), 10);

            var template = $('.grid-item.empty-form');
            var item = template.clone(true);

            item.removeClass('empty-form');

            item.find("*").each(function () {
                updateElementIndex(this, options.prefix, totalForms.val());
            });

            item.insertBefore($(template));

            $(totalForms).val(parseInt(totalForms.val(), 10) + 1);
        }
    };

    var fileChanged = function () {
        var $grid = $('.grid');
        var $parent = $(this).parents('.grid-item');

        if ('files' in this && this.files[0]) {
            $parent.find('.help').text(this.files[0].name);
            $parent.find('.button').text($grid.data('button-change'));
            $parent.find('.file-empty > :header').text($grid.data('img-ready'));
        }

        $parent.parents('.js-inline-admin-formset').addGridItem()
    };

    $(function () {
        $('.file-upload :file').change(fileChanged);
    });

})(django.jQuery);
