from django.contrib.admin.options import InlineModelAdmin
from django.db import models

from .widgets import GridImagesWidget


class GridImagesInline(InlineModelAdmin):
    extra = 1
    
    template = 'grid_images/grid_images.html'
    
    def formfield_for_dbfield(self, db_field, **kwargs):
        if isinstance(db_field, models.ImageField):
            return db_field.formfield(widget=GridImagesWidget)
        
        return False
    
    class Media:
        css = {
            'all': ('grid_images/css/grid_images.css',)
        }
        
        js = [
            'grid_images/js/grid_images.js'
        ]
