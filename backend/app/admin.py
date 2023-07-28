from django.contrib import admin
from .models import *

# Register your models here.
models = [Venue, VenueData]
admin.site.register(models)