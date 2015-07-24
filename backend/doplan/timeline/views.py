# coding=utf-8
import json

from django.core import serializers
from django.core.paginator import Paginator
from django.http import HttpResponse

from .models import TimelineItem


def timeline_data(request):
    try:
        page = int(request.GET.get("page", 1))
    except ValueError:
        page = 1
    try:
        items = Paginator(TimelineItem.objects.all(), 6).page(page)
    except Exception:
        items = []
    response = HttpResponse(serializers.serialize("json", items), content_type="application/json")
    response["Access-Control-Allow-Origin"] = "*"
    return response
