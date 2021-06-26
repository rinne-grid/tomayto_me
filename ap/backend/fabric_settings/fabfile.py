from fabric.api import env, run, local
from fabric.contrib import project

env.hosts = ["web"]
env.use_ssh_config = True


def test():
    run("echo 'Hello web'")
    run("hostname")


def collectstatic():
    collectstatic_cmd = "python manage.py collectstatic"
    local(collectstatic_cmd)

    project.rsync_project(
        remote_dir="/var/www/app",
        local_dir="/app/backend/static",
        delete=True,
    )
    run("chmod -R 777 /var/www/app")
