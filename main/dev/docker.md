# Docker

## 容器之间访问

### 方式1:  安装docker时，docker会默认创建一个内部的桥接网络docker0，每创建一个容器分配一个虚拟网卡，容器之间可以根据ip互相访问。

```bash
ifconfig
```

```text
eth0      Link encap:Ethernet  HWaddr 02:42:AC:11:00:02
          inet addr:172.17.0.2  Bcast:172.17.255.255  Mask:255.255.0.0
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:6650 errors:0 dropped:0 overruns:0 frame:0
          TX packets:4927 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:3122420 (2.9 MiB)  TX bytes:15055024 (14.3 MiB)

lo        Link encap:Local Loopback
          inet addr:127.0.0.1  Mask:255.0.0.0
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:645135 errors:0 dropped:0 overruns:0 frame:0
          TX packets:645135 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:220256664 (210.0 MiB)  TX bytes:220256664 (210.0 MiB)
```

### 方式2: --link

```bash
docker run -it --name centos-2 --link centos-1:centos-1 docker.io/centos:latest
```

### 方式3: 桥接到同一个网络上

```bash
docker run -it --name centos-1 --network testnet --network-alias centos-1 docker.io/centos:latest

docker run -it --name centos-2 --network testnet --network-alias centos-2 docker.io/centos:latest
```

## root 进入容器

```bash
docker exec -it -u root <container_id> /bin/bash
```

获取容器id

```bash
docker ps -a # 所有的
docker ps # 启动的
```

按照vim

```bash
apt-get install update # 需要先更新
apt-get install vim
```





---

参考文献:

[容器之间访问][https://www.cnblogs.com/shenh/p/9714547.html]

[按照 vim][https://jhooq.com/docker-edit-file-inside-container/]