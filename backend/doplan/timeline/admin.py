# coding=utf-8
from django.contrib import admin

from .models import TimelineItem


class TimelineItemAdmin(admin.ModelAdmin):
    list_display = ["create_time", "title"]


admin.site.register(TimelineItem, TimelineItemAdmin)
