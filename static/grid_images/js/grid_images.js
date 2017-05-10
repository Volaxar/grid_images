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

    var addGridItem = function (el) {
        var prefix = el.data('inline-prefix');

        var totalForms = $('#id_' + prefix + '-TOTAL_FORMS');
        var maxForms = $('#id_' + prefix + '-MAX_NUM_FORMS');

        if (maxForms.val() === '' || (maxForms.val() - totalForms.val()) > 0) {
            var template = el.find('.gi-grid-item.empty-form');
            var item = template.clone(true);

            item.removeClass('empty-form');

            item.find("*").each(function () {
                updateElementIndex(this, prefix, totalForms.val());
            });

            item.insertBefore($(template));

            $(totalForms).val(parseInt(totalForms.val(), 10) + 1);
        }
    };

    var fileChanged = function () {

        var $gridItem = $(this).parents('.gi-grid-item');
        var $formset = $gridItem.parents('.gi-formset');
        var labels = $formset.data('inline-labels');

        if ('files' in this && this.files[0]) {
            $gridItem.find('.help').text(this.files[0].name);
            $gridItem.find('.button').text(labels.textButtonChange);
            $gridItem.find('.file-empty > :header').text(labels.textImgReady);
        }

        addGridItem($formset)
    };

    $(function () {
        $('.file-upload :file').change(fileChanged);
    });

})(django.jQuery);
