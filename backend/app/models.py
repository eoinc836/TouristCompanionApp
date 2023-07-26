from django.db import models

# Create your models here.
class Venue(models.Model):
    venue_id = models.CharField(max_length=100, primary_key=True)
    venue_name = models.CharField(max_length=100)
    venue_address = models.CharField(max_length=100)
    longitude = models.FloatField()
    latitude = models.FloatField()
    opening_hours = models.CharField(max_length=100)

    class Meta:
        db_table = "Venue"

class VenueData(models.Model):
    venue_id = models.ForeignKey(Venue, on_delete=models.CASCADE, db_column="venue_id", primary_key=True)
    busyness_monday = models.CharField(max_length=100)
    busyness_tuesday = models.CharField(max_length=100)
    busyness_wednesday = models.CharField(max_length=100)
    busyness_thursday = models.CharField(max_length=100)
    busyness_friday = models.CharField(max_length=100)
    busyness_saturday = models.CharField(max_length=100)
    busyness_sunday = models.CharField(max_length=100)
    rating = models.DecimalField(max_digits=2, decimal_places=1, null=True)
    scrape_date = models.BigIntegerField()

    class Meta:
        db_table = "VenueData"