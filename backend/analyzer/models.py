from django.db import models


class ImageRecord(models.Model):
    id = models.AutoField(primary_key=True)

    image = models.ImageField(upload_to="uploads/")

    processed_image = models.ImageField(
        upload_to="processed/",
        null=True,
        blank=True
    )

    enhanced_image = models.ImageField(
        upload_to="enhanced/",
        null=True,
        blank=True
    )

    leaf_mask = models.ImageField(
        upload_to="masks/",
        null=True,
        blank=True
    )

    edge_image = models.ImageField(
        upload_to="edges/",
        null=True,
        blank=True
    )

    disease_mask = models.ImageField(
        upload_to="disease_masks/",
        null=True,
        blank=True
    )

    # Module 7 - Quantitative Analysis
    leaf_pixel_count = models.PositiveIntegerField(
        default=0
    )

    disease_pixel_count = models.PositiveIntegerField(
        default=0
    )

    affected_area_percentage = models.FloatField(
        default=0.0
    )

    # Original Image Metadata
    width = models.PositiveIntegerField()
    height = models.PositiveIntegerField()
    channels = models.PositiveIntegerField()
    data_type = models.CharField(max_length=50)
    ai_plant = models.CharField(max_length=100, default="Unknown")
    ai_disease = models.CharField(max_length=200, default="Unknown")
    ai_confidence = models.FloatField(default=0.0)
    ai_severity = models.CharField(max_length=50, default="Unknown")
    ai_symptoms = models.JSONField(default=list, blank=True)
    ai_possible_causes = models.JSONField(default=list, blank=True)
    ai_recommendation = models.TextField(blank=True, default="")

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.id} - {self.image.name}"