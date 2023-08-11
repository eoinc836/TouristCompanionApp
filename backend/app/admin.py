from django.contrib import admin
from .models import *

# Register your models here.
models = [Venue, VenueData, SavedPlace]
admin.site.register(models)