from django.db import IntegrityError
from django.shortcuts import render, reverse, redirect
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import login
from django.views.generic import View, TemplateView
from django.core.exceptions import ValidationError

from .forms import AppLoginForm, AppUserRegisterForm
from .models import AppUser, MstPomodoroSetting, MstUserPomodoroSetting


class AppIndexView(TemplateView):
    template_name = "todo/pages/index.html"


class AppLoginView(LoginView):
    template_name = "todo/pages/auth/login.html"
    form_class = AppLoginForm

    """
    ログイン成功時のリダイレクト先を設定します
    """

    def get_success_url(self):
        return reverse("todo:app_top")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context


class AppLogoutView(LogoutView):
    template_name = "todo/pages/index.html"

    def get_next_page(self):
        return reverse("todo:app_index")


class AppUserRegisterView(View):
    """
    User登録を行うビュークラスです
    """

    def get(self, request, *args, **kwargs):
        form = AppUserRegisterForm()
        context = {"form": form}
        return render(request, "todo/pages/auth/register.html", context)

    def post(self, request, *args, **kwargs):
        form = AppUserRegisterForm(request.POST)
        if form.is_valid():
            cleaned_data = form.cleaned_data

            user = AppUser()
            try:
                user.username = cleaned_data["username"]
                user.set_password(cleaned_data["password"])

                user.email = cleaned_data["email"]
                user.save()
                # ポモドーロのマスタ設定（テンプレート）をユーザ設定として作成する
                mst_setting_instance = MstPomodoroSetting.objects.all()[0]
                user_setting_instance = MstUserPomodoroSetting()
                user_setting_instance.user = user
                user_setting_instance.work_time = mst_setting_instance.work_time
                user_setting_instance.short_break_time = (
                    mst_setting_instance.short_break_time
                )
                user_setting_instance.long_break_time = (
                    mst_setting_instance.long_break_time
                )
                user_setting_instance.long_break_pomodoro = (
                    mst_setting_instance.long_break_pomodoro
                )
                user_setting_instance.save()

                # ここですでにユーザ情報が取得できているためauthenticateは不要
                # 実施しようとすると、loginの部分で
                # AttributeError: 'AnonymousUser' object has no attribute '_meta'が発生する

                login(
                    request,
                    user,
                    backend="django.contrib.auth.backends.ModelBackend",
                )
                return redirect(reverse("todo:app_top"))
            except ValidationError:
                context = {"form": form}
                return render(request, "todo/pages/auth/register.html", context)
            except IntegrityError:
                context = {
                    "form": form,
                    "err_msg": "指定されたユーザIDは利用できません。別のIDを指定してください。",
                }
                return render(request, "todo/pages/auth/register.html", context)
        else:
            context = {"form": form}
            return render(request, "todo/pages/auth/register.html", context)


# サービスインデックスページ
app_index = AppIndexView.as_view()

# ログインページ
app_login = AppLoginView.as_view()

# ログアウトページ
app_logout = AppLogoutView.as_view()

# ユーザ登録ページ
app_user_register = AppUserRegisterView.as_view()
