# Generated by Django 3.2 on 2021-05-04 08:08

from django.db import migrations, models
import todo.utils


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0002_add_tomayto_me_models'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='deadline',
            field=models.DateTimeField(blank=True, null=True, verbose_name='締め切り'),
        ),
        migrations.AlterField(
            model_name='project',
            name='explain',
            field=models.CharField(blank=True, max_length=1000, null=True, verbose_name='説明'),
        ),
        migrations.AlterField(
            model_name='project',
            name='thumbnail',
            field=models.FileField(blank=True, null=True, upload_to=todo.utils.upload_to_info, verbose_name='サムネイル'),
        ),
        migrations.AlterField(
            model_name='projectmember',
            name='join_date',
            field=models.DateField(blank=True, null=True, verbose_name='参加日'),
        ),
        migrations.AlterField(
            model_name='task',
            name='end_date_time',
            field=models.DateTimeField(blank=True, null=True, verbose_name='終了日時'),
        ),
        migrations.AlterField(
            model_name='task',
            name='memo',
            field=models.TextField(blank=True, null=True, verbose_name='メモ'),
        ),
        migrations.AlterField(
            model_name='task',
            name='start_date_time',
            field=models.DateTimeField(blank=True, null=True, verbose_name='開始日時'),
        ),
    ]
