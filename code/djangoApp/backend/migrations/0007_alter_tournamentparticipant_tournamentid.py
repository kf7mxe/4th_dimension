# Generated by Django 3.2.8 on 2021-11-17 21:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0006_merge_20211110_1315'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tournamentparticipant',
            name='tournamentid',
            field=models.IntegerField(blank=True, db_column='tournamentId', null=True),
        ),
    ]
