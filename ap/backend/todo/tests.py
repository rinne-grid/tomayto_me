from django.core.exceptions import ValidationError
from django.test import TestCase

from todo.forms import validate_password


class AppUserRegisterFormTests(TestCase):
    def test_validate_password_not_same_password(self):
        """パスワード検証においてパスワードと確認用パスワードが不一致の場合にValidationエラーが発生するかどうか"""
        password = "This_is_password"
        password_confirm = "Is_this_password"
        with self.assertRaises(ValidationError):
            validate_password(password, password_confirm)

    def test_validate_password_same_password(self):
        """パスワード検証においてパスワードと確認用パスワードが一致した場合Noneが返るかどうか"""
        password = "This_is_same_password"
        self.assertIsNone(validate_password(password, password))
