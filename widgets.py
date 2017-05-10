from django import forms
from django.conf import settings
from django.utils.safestring import mark_safe


class GridImagesWidget(forms.ClearableFileInput):

    template_with_initial = ('<label class="file-upload">'
                             '<span class="button">%(input_text)s</span>'
                             '%(input)s'
                             '</label>'
                             )
    
    def render(self, name, value, attrs=None):
        output = super(GridImagesWidget, self).render(name, value, attrs)
        
        if value and hasattr(value, 'url'):

            path = str(value)
            rs = path.rfind('/') + 1
            
            output = ('<img src="%s">'
                      '<p class="help">%s</p>'
                      '%s'
                      ) % ('/'.join([settings.MEDIA_URL, path]), path[rs:], output)
        else:
            output = ('<div class="file-empty"><h1>Фото не загруженно</h1></div>'
                      '<p class="help"></p>'
                      '<label class="file-upload file-choose">'
                      '<span class="button">Загрузить</span>'
                      '%s'
                      '</label>'
                      ) % (output,)
        
        return mark_safe(output)
