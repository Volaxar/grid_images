from django.contrib.admin.options import InlineModelAdmin
from django.db import models

from .widgets import GridImagesWidget


class GridImagesInline(InlineModelAdmin):
    extra = 1
    image_type_field = models.ImageField
    
    template = 'grid_images/grid_images.html'

    def formfield_for_dbfield(self, db_field, **kwargs):
        if isinstance(db_field, self.image_type_field):
            return db_field.formfield(widget=GridImagesWidget)
        
        return False

    def get_formset(self, request, obj=None, **kwargs):
        formset = super(GridImagesInline, self).get_formset(request, obj, **kwargs)

        formset.labels = '{"textButtonChange": "Изменить", "textImgReady": "Фото готово к загрузке"}'

        return formset

    class Media:
        css = {
            'all': ('grid_images/css/grid_images.css',)
        }
        
        js = [
            'grid_images/js/grid_images.js'
        ]
