# Generated by Django 4.1.10 on 2023-08-01 11:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('app', '0005_savedplace'),
    ]

    operations = [
        migrations.RenameField(
            model_name='savedplace',
            old_name='place',
            new_name='saved_place',
        ),
        migrations.AddField(
            model_name='savedplace',
            name='username',
            field=models.ForeignKey(db_column='username', null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterUniqueTogether(
            name='savedplace',
            unique_together={('username', 'saved_place')},
        ),
        migrations.RemoveField(
            model_name='savedplace',
            name='user',
        ),
    ]
