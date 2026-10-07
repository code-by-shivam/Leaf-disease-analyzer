from django.urls import path

from .views import (
    ImageUploadView,
    ImageResultView,
)

urlpatterns = [
    path(
        "upload/",
        ImageUploadView.as_view(),
        name="image-upload",
    ),

    path(
        "results/<int:pk>/",
        ImageResultView.as_view(),
        name="image-result",
    ),
]