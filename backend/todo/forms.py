from django.contrib.auth.forms import AuthenticationForm
from django import forms


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


class AppUserRegisterForm(forms.Form):
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
