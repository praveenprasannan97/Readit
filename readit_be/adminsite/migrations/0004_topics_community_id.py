# Generated by Django 5.0.6 on 2024-09-06 10:19

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adminsite', '0003_comments_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='topics',
            name='community_id',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='adminsite.community'),
            preserve_default=False,
        ),
    ]
