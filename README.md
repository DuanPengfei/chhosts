# chhosts

Quickly switch hosts.

## Install

```
npm install -g chhosts
```

## Usage

```
mkdir ~/chhosts
```

```
# put preset hosts file in ~/chhosts

└── chhosts
   ├── some_other
   └── default
```

```
sudo chhosts
```

## Preview

```shell
➜  chhosts ll
total 16
-rw-r--r--  1 huaiyu  staff   365B  8 27 10:14 default
-rw-r--r--  1 huaiyu  staff   850B  8 27 10:28 some_other
```

```shell
➜  chhosts cat default
##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
127.0.0.1	localhost
255.255.255.255	broadcasthost
::1             localhost

# Added by Docker Desktop
# To allow the same kube context to work on the host and the container:
127.0.0.1 kubernetes.docker.internal
# End of sectio
```

```shell
➜  chhosts sudo chhosts
Password:
? please select hosts file (Press <space> to select, <a> to toggle all, <i> to invert selection)
❯◉ default
 ◯ some_other
```
