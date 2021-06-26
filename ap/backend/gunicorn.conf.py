import multiprocessing

bind = "0.0.0.0:8000"
# workers = multiprocessing.cpu_count() * 2 + 1
workers = multiprocessing.cpu_count() + 2
# daemon = True
forwarded_allow_ips = "*"
