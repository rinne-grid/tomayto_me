from django import forms
from . import models
from . import consts


class ProjectForm(forms.ModelForm):
    """プロジェクトのフォーム"""

    class Meta:
        model = models.Project
        fields = (
            "name",
            "status",
            "explain",
            "thumbnail",
            "deadline",
        )
        widgets = {
            "name": forms.TextInput(
                attrs={
                    "class": "input",
                    "type": "text",
                    "placeholder": "プロジェクト名",
                },
            ),
            "status": forms.Select(
                choices=consts.CHOICES_PROJECT_STATUS,
                attrs={
                    "class": "select",
                    "placeholder": "ステータス",
                },
            ),
            "explain": forms.Textarea(
                attrs={
                    "class": "textarea",
                    "rows": "5",
                    "placeholder": "説明",
                }
            ),
            "thumbnail": forms.FileInput(
                attrs={
                    "class": "file-input",
                }
            ),
            "deadline": forms.DateTimeInput(
                attrs={
                    "type": "date",
                    "class": "rngd_date_picker",
                }
            ),
        }
