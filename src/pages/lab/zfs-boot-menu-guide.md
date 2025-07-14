---
layout: ../../layouts/BlogLayout.astro
title: "ZFS Boot Menu - I put that sh*t on everything (and how I do it)"
description: "A comprehensive guide to installing Debian with ZFS Boot Menu, covering disk preparation, ZFS pool creation, and system configuration for advanced Linux users."
tags: ["zfs", "debian", "boot-menu", "linux", "homelab", "systems-administration", "tutorial"]
time: 25
featured: true
timestamp: 2024-11-10T22:19:54+00:00
filename: zfs-boot-menu-guide
githubUrl: "https://github.com/NLaundry/zfsbootmenu-autoinstaller"
---

#BasedOn: https://docs.zfsbootmenu.org/en/v2.3.x/guides/debian/bookworm-uefi.html
#BasedOn: https://openzfs.github.io/openzfs-docs/Getting%20Started/Debian/Debian%20Bookworm%20Root%20on%20ZFS.html

### 1. create debian live install media
#MediaSource: https://www.debian.org/CD/live/ - choose the "default" don't need a DE
#Installer: https://etcher.balena.io/ (works on linux, mac, and windows)
#Requirements: install media (from debian), and an 8gb or larger USB

Once these are both installed:
1. Flash from file
2. Select target -> your USB stick
3. Flash!
4. wait for validation you speed fiend. Do not skip!

### 2. Boot from live media

1. plug that sucker in
2. it'll bring you to a screen like: #TODO add screenshot

### 3. Prepare packages

We're adding extra sources to apt's packages. 
To do so, we edit a file at /etc/apt/sources.list
I'm going to use vi for this, you can use nano or cat it in idc.

1. switch into super user `sudo su`
2. `vi /etc/apt/sources.list`
3. add contrib and non-free-firmware

`deb http://deb.debian.org/debian/ bookworm main contrib non-free-firmware`
leave the rest as is.

#Note: if yours doesn't say "bookworm" (maybe it's trixie), 
you're probably reading this tutorial past 2024, when bookworm was the 
current debian version. I can't guarantee that this tutorial will work 
anymore but it likely isn't too different. Use at your own risk.

4. update `apt update`

### 4. Install SSH (Optional but highly recommended)

You don't want to have to type a bunch of zfs commands yourself
- they're error prone
- they're lengthy
- save yourself the hassle. SSH in with another machine.

1. Install SSH  `apt install --yes openssh-server`
2. Restart the SSH service `systemctl restart ssh`
3. Find your ip address for SSH: `ip addr`

you'll get something like #TODO add screenshot
it's probably enp<NUMBER>s0 - where number is likely the lowest one
you can tell which is active because it won't say "NO-CARRIER"
and you'll likely have inet6 values too

4. ssh in with `ssh user@<IP ADDRESS>`
5. password is: live
6. switch back into root: `sudo su`

### 5. Create the ID var for later use

#DirectlyFrom ZFSBootMenu tutorial
Source /etc/os-release

The file /etc/os-release defines variables that describe the running distribution. In particular, the $ID variable defined within can be used as a short name for the filesystem that will hold this installation.

```sh
source /etc/os-release
export ID
```

### 6. Install Necessary Packages

we're installing: 
1. deboostrap - installs a minimal debian system later
2. gdisk - manages disks
3. dkms - dynamic kernel module support (need this to add zfs stuff I think)
4. linux-headers - .h files for linux kernel kind of like linux APIs #LearnMore below
5. zfsutils-linux - for configuring zfs on linux

```sh
apt install debootstrap gdisk dkms linux-headers-$(uname -r)
apt install zfsutils-linux
```

#LearnMore: linux headers: https://thelinuxcode.com/install-kernel-headers-linux/

### 7. generate hostid

"Creates /etc/hostid file and stores the host ID in it. If hostid was provided, validate and store that value. Otherwise, randomly generate an ID."

`zgenhostid -f 0x00bab10c`

#LearnMore: https://openzfs.github.io/openzfs-docs/man/master/8/zgenhostid.8.html

### 8. Set environment vars for devices

"Verify your target disk devices with lsblk. /dev/sda, /dev/sdb and /dev/nvme0n1 used below are examples."

`lsblk`
#TODO: add screenshot

For Boot 
```sh
export BOOT_DISK="/dev/nvme0n1"
export BOOT_PART="1"
export BOOT_DEVICE="${BOOT_DISK}p${BOOT_PART}"
```

For Boot 
```sh
export POOL_DISK="/dev/nvme0n1"
export POOL_PART="2"
export POOL_DEVICE="${POOL_DISK}p${POOL_PART}"
```

### 9. Prepare Disks
1. Wipe Partitions

In case the drive was used for anything before. Do this anyway just in case.

```sh
zpool labelclear -f "$POOL_DISK"

wipefs -a "$POOL_DISK"
wipefs -a "$BOOT_DISK"

sgdisk --zap-all "$POOL_DISK"
sgdisk --zap-all "$BOOT_DISK"
```

2. Create EFI boot partition

```sh
sgdisk -n "${BOOT_PART}:1m:+512m" -t "${BOOT_PART}:ef00" "$BOOT_DISK"
```

3. Create zpool partition

```sh
sgdisk -n "${POOL_PART}:0:-10m" -t "${POOL_PART}:bf00" "$POOL_DISK"
```

At this point, our disk has two partitions: 
one for booting, and one for storing the zpool which will house the system
Note how little of the disk the boot partition takes up.

#LearnMore: `man sgdisk`

### 10. Create Zpool

```sh
zpool create -f -o ashift=12 \
 -O compression=lz4 \
 -O acltype=posixacl \
 -O xattr=sa \
 -O relatime=on \
 -o autotrim=on \
 -o compatibility=openzfs-2.1-linux \
 -m none zroot "$POOL_DEVICE"
```

Note how we use the $POOL_DEVICE environment var from earlier
#LearnMore: `man zpool create`

Here's what each flag does in the `zpool create` command:
- `-f`: Forces the creation of the pool, even if the device appears in use.
- `-o ashift=12`: Sets the pool's sector size to 4K (2^12 bytes), optimizing for modern disks.
- `-O compression=lz4`: Enables LZ4 compression for better space efficiency.
- `-O acltype=posixacl`: Uses POSIX ACLs for fine-grained file permissions.
- `-O xattr=sa`: Stores extended attributes in a more efficient system attribute space.
- `-O relatime=on`: Updates file access times only if they are newer than the modification time.
- `-o autotrim=on`: Enables automatic trimming of free space for SSDs.
- `-o compatibility=openzfs-2.1-linux`: Ensures compatibility with OpenZFS 2.1 on Linux systems.
- `-m none`: Disables automatic mounting of the pool's root dataset.
- `zroot`: Names the new ZFS pool as "zroot".
- `"$POOL_DEVICE"`: Specifies the device to use for the pool creation.

Why this matters
- **`ashift=12`**: Aligns with modern disk sectors, enhancing performance.
- **`compression=lz4`**: Reduces disk space usage with minimal CPU overhead.
- **`acltype=posixacl` & `xattr=sa`**: Ensures compatibility with Linux file permissions and efficient storage of extended attributes.
- **`relatime=on`**: Minimizes disk writes by updating access times only when necessary.
- **`autotrim=on`**: Maintains SSD performance by automatically freeing unused space.
- **`compatibility=openzfs-2.1-linux`**: Ensures the pool is compatible with the specified OpenZFS version on Linux.
- **`-m none`**: Prevents conflicts with the root filesystem's mount points during installation.

### 11. Create ZFS Datasets for Home + Root

ZFS refers to datasets and filesystems as synonyms 