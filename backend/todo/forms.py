from django.contrib.auth.forms import AuthenticationForm
from django import forms
from django.core.exceptions import ValidationError


class AppLoginForm(AuthenticationForm):
    """
    ログイン情報を入力するフォームです
    """

    username = forms.CharField(
        max_length=50,
        required=True,
        widget=forms.TextInput(
            attrs={
                "class": "input",
                "placeholder": "ユーザ名",
            }
        ),
    )
    password = forms.CharField(
        required=True,
        widget=forms.PasswordInput(
            attrs={
                "class": "input",
                "placeholder": "パスワード",
            }
        ),
    )


def validate_password(password, password_confirm):
    """パスワードと確認用パスワードが一致しているかどうかを確認します"""
    if not password == password_confirm:
        raise ValidationError("パスワードと確認用パスワードが一致していません。")


class AppUserRegisterForm(forms.Form):
    def clean(self):
        """Formの相関チェックを行います"""
        cleaned_data = super().clean()
        password = cleaned_data["password"]
        password_confirm = cleaned_data["password_confirm"]
        validate_password(password, password_confirm)

    username = forms.CharField(
        max_length=50,
        required=True,
        widget=forms.TextInput(
            attrs={
                "class": "input",
                "placeholder": "ユーザ名",
            }
        ),
    )
    password = forms.CharField(
        required=True,
        widget=forms.PasswordInput(
            attrs={
                "class": "input",
                "placeholder": "パスワード",
            }
        ),
    )
    password_confirm = forms.CharField(
        required=True,
        widget=forms.PasswordInput(
            attrs={
                "class": "input",
                "placeholder": "パスワード確認",
            }
        ),
    )
    email = forms.EmailField(
        required=True,
        widget=forms.EmailInput(
            attrs={
                "class": "input",
                "placeholder": "メールアドレス",
            }
        ),
    )
