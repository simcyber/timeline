# coding=utf-8
from django.db import models


class TimelineItem(models.Model):
    create_time = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=40)
    content = models.TextField()

    class Meta:
        db_table = "timeline_item"