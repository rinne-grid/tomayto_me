FROM nginx:stable

RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install -y openssh-server

# https://qiita.com/kuboshu83/items/f827ad7068550cded72d
RUN mkdir -p /var/run/sshd

RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin prohibit-password/' /etc/ssh/sshd_config

RUN sed -i 's/#Port 22/Port 22222/' /etc/ssh/sshd_config

COPY ./ssh/id_ed25519.pub /root/.ssh/authorized_keys

EXPOSE 22222
CMD ["/usr/sbin/sshd", "-D"]
