from django.utils import timezone


def upload_to_info(instance, file_name):
    """アップロード先のパス情報を編集します
    :param instance: Model
    :param file_name:
    :return: str
    """
    current_date = timezone.now()
    year_str = str(current_date.year).zfill(4)
    month_str = str(current_date.month).zfill(2)
    day_str = str(current_date.day).zfill(2)
    date_str = f"{year_str}/{month_str}/{day_str}"
    return f"uploads/{date_str}/{instance.user.id}/{file_name}"
