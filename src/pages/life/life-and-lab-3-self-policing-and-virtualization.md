---
layout: ../../layouts/BlogLayout.astro
title: "Life and Lab 3: Self-Policing and Virtualization"
description: "Exploring the pernicious assumption of self-policing and how to trust yourself, plus a comprehensive overview of Type 1 vs Type 2 hypervisors and virtualization options for homelabs."
tags: ["philosophy", "productivity", "self-trust", "virtualization", "hypervisors", "kvm", "hyper-v", "proxmox", "homelab"]
time: 11
featured: true
timestamp: 2024-11-22T14:45:29+00:00
filename: life-and-lab-3-self-policing-and-virtualization
---

Hey Friends,

It's been a pretty mild week. I spent most of it working on my Windows 11 setup video for Youtube which, I think, has turned out pretty well. 

While working on that video I found a sneaky little assumption about my character that changes the way I plan my time. I assume that if I don't police myself, I will lay around doing nothing but playing league of legends and watching youtube all day long. This pernicious little idea will be the topic of our *life* section this week.

On the lab side, I tested out Microsoft's Hyper-v to virtualize microwin and a default win11 install. While doing so, I realized, I don't actually know much about different kinds of virtualization, or what sets Hyper-V apart from KVM, from QEMU, and how VMWare, ESXI, Virtual Box differ. So, for my education as much as yours, we're going to do a bird's eye view of virtualization. 

## Life

I often find myself writing the life section wondering "am I just uniquely crazy?" To be honest, it feels a little odd to openly state that I have just realized I implicitly assume that I'm a lazy, good for nothing, potato who needs to police himself into a diligent work ethic. Yet, I get the feeling that this mindset has seeped its way deep into the culture.

For me, it started with a healthy goal and a schedule.

Somewhere around the age of 19, I decided to revamp my academic process. I was tired of anxiously finishing projects the day before they were due, and so I got on Youtube to "research" how to manage myself. I was a chronic procrastinator, and I wanted to learn how to stop.

It was then, I started using VimWiki (a fantastic little Vim plugin that gives you org-mode-lite in vim) and a calendar. Pretty quickly, I got on track. I knew when my deadlines were, I had multiple shorter work periods prior to the deadline. And I got my stuff done a handful of days before the deadline which gave me room to have spontaneous realizations that I'd forgotten some feature. It was great! But, I couldn't leave it at that. I was riding a high of new found productivity.

I needed to know if there was more I could do and Youtube fed off my hunger for optimization.

As I recall, the wave of "motivation is for plebs. Diligence is the way." content was starting to mound and I got caught up in it. The message being sold was that you can't wait for motivation (which is true-ish in some situations), that you can't trust yourself to want healthy things, and left to your own devices, you will whither away into obscurity.

It was the sort of idea that pit the long-term self against the short-term self and, in hind-sight, it is how behavioural economics views the topic. Bastardizations of Tversky and Kahneman's work were really starting to permeate the public mind.

Nonetheless, it was then, under that belief-set that I learned to police myself.

I viewed procrastination as my default process and this new order I'd imposed on myself a healthier, but fragile, way of life. But it wasn't just procrastination, it was every aspect of life. I lived in fear of myself. I thought I'd be mean to others if I didn't actively try to be nice, I thought that I'd never exercise, I wouldn't eat healthy, I wouldn't study or work on my hobbies. The fear led to policing, and the policing led to exhaustion.

It took me years to unlearn this.

As far as stories go, there's no pivotal moment, no epiphany that I'm actually a pretty decent dude, just years of therapy and self-reflection, slowly learning about myself. But these days, I do, more or less, believe that my default state is not JUST league, youtube, and being mean to others. I have hobbies and projects I'm excited about. I get bored pretty easily, and when that happens, I use that boredom for a mix of things: to learn something new, read, do a project, or, if I want some social time, play some damn video games with my friends. It's not so bad. I'm not so bad.

And that brings us to this week as I worked on the Windows 11 Youtube video. 

While, I've mostly rewritten my beliefs, the behaviours and the thoughts of self-policing are deeply ingrained habits. It takes time to weed them all out. And they reared their heads about this Youtube thing I'm doing.

The whole time I fretted. My mind raced: "I need to commit myself to a video every other week" "What if things get busy and I fall off the wagon and then I let this opportunity slide" "I can't allow myself to let that happen"

Those thoughts are the remnants of a younger, self-policing Nathan. 

The truth is, one that I'm grateful to have witnessed, I love this stuff. I woke up on Monday, had no major research work to do (waiting on ethics approval ... sigh) and just got to recording. I did it for 6 hours and forgot to eat (I'll work on that). I didn't need a schedule, the motivation came in ample supply, and I was happy working.

With enough space in the day and some active hobbies, boredom will lead to action - that's boredom's function in the mind. Maybe the best way to make sure you get things done is to give yourself sime time and space to rest and get bored. Then, trust yourself to explore away the boredom in ways that you like. A little nudge of willpower here or there might help when you're in a rut, but for the most part, you've got values, and you'll probably act on them if you've got the resources to do so.

### Guiding Questions

Okay, that's my rant. Here are some things you can reflect on if you're like me.

1. Are you policing yourself? If so, why do you think that is? Do your reasons seem fair and accurate?
2. Do you have enough time and space to rest and get bored?
3. What are things you do when you get bored? I imagine you'll find at least some of the time, it's in line with hobbies you're interested in or goals you have.

## Lab

Wanting to get into virtualization and VM orchestration, I've been finding little ways I can tinker with VMs in other projects until I can shift my focus to a VM-centric project. So, in my last video, I figured I'd compare the windows 11 install process to the microwin install process #TODO: you can find that section here. The windows 11 install process was a nightmare, but I did learn a bunch about hyper-v which prompted me to look a little deeper into virtualization as a whole. 

Here's some stuff I learned.

---

### **Type 1 vs. Type 2 Hypervisors**

There are, broadly, two types of virtualization: **Type 1 (bare metal)** and **Type 2 (hosted)**. 

A **Type 1 hypervisor** runs directly on the physical hardware of a machine, acting as a minimal control layer that allows virtual machines (VMs) to directly execute operations on the physical CPU, memory, and other hardware resources. In contrast, a **Type 2 hypervisor** runs on top of a host operating system and typically relies on hardware virtualization features (like Intel VT-x or AMD-V) to pass CPU instructions from the VM to the physical CPU. In some cases, a Type 2 hypervisor can also emulate an entirely different CPU architecture in software, creating a virtual CPU for the VM to run on.

It's fairly obvious that Type 1 hypervisors have a massive performance advantage for same-architecture virtualization. They allow VMs to directly utilize hardware resources without the overhead of a host OS or software emulation. However, there is one significant limitation: **Type 1 hypervisors cannot run VMs of operating systems designed for a different CPU architecture than the host machine.** For example, a Type 1 hypervisor on an x86 CPU cannot run an ARM-based VM because it lacks the ability to emulate a different CPU in software.

This is where Type 2 hypervisors shine. If your goal is to run VMs designed for a different architecture than your physical machine (e.g., ARM VMs on an x86 host, or vice versa), a Type 2 hypervisor with CPU emulation capabilities, like QEMU, becomes essential. However, this flexibility comes at the cost of performance, as software emulation of a CPU is far slower than hardware virtualization.

So, naturally, both types of hypervisors have their time and place.

- If your goal is to efficiently partition massive compute resources for tasks like cloud hosting (AWS, Azure, GCP), **Type 1 hypervisors** are the workhorses of choice. They power most enterprise and data center virtualization workloads due to their performance and scalability.
- If you need to test or run software for a different CPU architecture than your host hardware (like running ARM-based applications on an x86 desktop), **Type 2 hypervisors** with CPU emulation are the way.

For Apple Silicon Mac users who want to run VMs, this is a pretty big deal.

**Type 1 hypervisors** like macOS's built-in **Virtualization Framework** can only run ARM-based VMs, such as Linux distributions compiled for ARM or ARM versions of macOS. Do, running x86-based operating systems (like Windows - let's be honest, ARM for windows ain't there yet - or x86 Linux distros) on Apple Silicon requires a **Type 2 hypervisor** with CPU emulation, such as **QEMU**. 

This comes with the performance hit of emulating an x86 processor making, say, gaming in a Windows VM, untenable. For Apple Silicon users, this means a shift toward ARM-native virtualized environments, and while tools like UTM (a user-friendly front-end for QEMU) provide a workaround for running x86 VMs, the experience will not match the speed or efficiency of same-architecture virtualization.

### Type 1 Differences: KVM (Linux) vs Hyper-V (Windows)

Hyper-V and KVM take fundamentally different approaches to how they manage the operating system you boot into, and this difference impacts desktop and server users in distinct ways.

With **Hyper-V**, the OS you boot into (the Parent Partition) is virtualized, running alongside other VMs atop the hypervisor. For desktop users, this can introduce quirks, such as changes in how hardware is managed or slight complexity in handling tasks that rely on direct hardware access. By contrast, **KVM** allows your Linux host OS to remain the "real" operating system, with VMs running as kernel-managed processes, making it feel more seamless for everyday desktop use.

In server environments, Hyper-V's consistent abstraction is a strength, providing strict isolation and consistent environments ideal for hosting multiple VMs securely. Meanwhile, KVM's integration with Linux is advantageous when the host OS also runs essential server processes, offering flexibility and direct hardware control without sacrificing performance. 

#TODO: remove for my blog, leave in for medium: Both excel in their ecosystems, but their different approaches suit distinct workflows. Hyper-V shines in Windows-centric infrastructures, while KVM is the natural choice for Linux-based setups.

To be honest with you, that's what I've read. I don't have the practical knowledge to tell you much about how this shakes out in practice. I imagine, like with anything technical, there are highly oppinionated people on either end of this argument cursing Hyper-V and KVM. However, given how affordable Linux machines is (and by that I mean free), I would also imagine that the vast majority of virtualization is done on Linux aside from folks on Azure. 

### Virtualization for the Homelab

If you're looking to run some VMs in your home lab, you're probably in one of two camps:
1. You have a dedicated box, among a number in your lab, to host a bunch of VMs
2. You've already got one box that's hosting a few things and you're thinking of trying a VM

#### **Scenario 1: Proxmox for the Dedicated VM Host**

If you've got a dedicated box for VMs, **Proxmox** is awesome! It's built on Debian (and you know I'm into that), provides a great web interface for management, and can integrate nicely with Hashicorp stuff like Terraform. It's designed to manage VMs at scale, offering features like:
- Snapshots and backups.
- Clustering for multiple nodes.
- Support for **LXC containers** alongside traditional VMs.

It's a quick and easy way to manage a bunch of VMs without needing the CLI. I know a few folks in the Homelab game use Proxmox as their single homelab box by virtualizing truenas to manage their storage. It's a pretty cool approach.

#### **Scenario 2: KVM + QEMU for the All-in-One Box**

If you're running everything on a single machine, adding Proxmox might feel like overkill and you may not want to reinstall the host OS.**KVM + QEMU** fits perfectly into an environment where the host OS is also running other services. KVM integrates directly into the Linux kernel, turning it into a Type 1 hypervisor, while QEMU handles device emulation for your VMs. This approach doesn't take over the entire machine, so you can:
- Run your base OS to handle your router, NAS, or media server duties.
- Spin up VMs as needed, managed via command line or tools like **Virt-Manager**.

With KVM + QEMU, the host OS remains fully functional and connected to the hardware, which is ideal when your box needs to multitask. You're not locked into a dedicated VM manager, and the setup is lightweight and resource-efficient. Both are great options. Setting up KVM + QEMU yourself will probably take long but it'll also expose you to more stuff and thus help you learn some core Linux. Proxmox will get you up and running a little faster and is a decent test-bed to learn some higher level cloud-engineering-y VM and container orchestration. 

You'll have fun with either approach.

## Wrap up

Anyway, that's my story for this week. Hope it was interesting. I'll catch ya later!

Cheers,

Nathan Laundry 