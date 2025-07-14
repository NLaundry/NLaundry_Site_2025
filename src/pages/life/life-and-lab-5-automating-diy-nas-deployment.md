---
layout: ../../layouts/BlogLayout.astro
title: "Life and Lab 5: Automating DIY NAS Deployment"
description: "Planning a comprehensive NAS setup using Ansible, ZFS, and Tailscale for data safety, reliability, and reproducibility in content creation workflows."
tags: ["nas", "ansible", "zfs", "tailscale", "automation", "homelab", "content-creation", "backup"]
time: 8
featured: true
timestamp: 2024-11-29T16:27:40+00:00
filename: life-and-lab-5-automating-diy-nas-deployment
---

## Life

## Lab

I'm planning out my next youtube video which will be a part 2, to the DIY NAS series I'm working on. The ZFSBootMenu video I released a few weeks ago (#TODO: Link) was the unofficial part 1, since I'm using that on My NAS as well as other devices to eventually backup the root filesystems of all the machines on the network. But, that's a cooler problem for a later date. For this next video, I'll be using Ansible, ZFS, and tailscale, to setup this Debian box as proper, usable, network attached storage, with tailscale and zfs for creating an offshore backup.

For my videos I like to summarize the key value of the video in 4 points
1. What's the context/story - what's the problem and why is it worth solving?
2. What's the solution and why is it the right solution for me in this context? what other solutions could work
3. What's the main joke (keeping things light and humorous is part of my brand and how I am as a person)
4. What's the moral of the story - I like to hook this into the joke and kinda flip the joke  on its head

For this video, for example, it could be

1. Context -> I'm getting into content creation (obviously) and want to setup Network attached storage in a data-safe, reliable, repeatable way. I have multiple computers that could edit: workstation + macbook pro. The workstation dualboots windows and linux, and the mac is obviously macos. 
2. Solution -> to achieve data-safety and reliability, we're using zfs functionality (scrub) + following the 3-2-1 rule with dad's offsite NAS. for reproducibility we're using Ansible so if we ever wanted to register a new device to the network (say I hired an editor) they could gain access to the NAS easily and if something catastrophic happens with the NAS or I need to upgrade, I can reconfigure it using ZFSBootMenu auto installer + Ansible. 
3. Joke -> Taking 10 hours to automate a 2 hour task. I could just as easily set all this up manually without Ansible.
4. Moral -> Buuut, I'm doing two things: learning cool technologies, AND, more critically, I think there's a big difference in the value of 10 hours during prep before I rely on these tools, and 2 hours during a crisis. If I were in a professional environment, I'd happily spend the extra time making my steps repeatable and robust so that if a crisis comes up and stuff goes down, we can spin up a replacement more quickly and easily. That crisis time is way more costly than the 10 hours of prep prior to people being reliant on the tools. The same goes for homelab though. If stuff goes down, you don't want to spend your saturday trying to remember how to setup your NAS because you didn't write anything down. You'll be thanking yourself for taking the extra time.

## Lab - Automating DIY NAS Deployment with Ansible, ZFS, and Tailscale  

A few weeks ago, I released a video on installing Debian with **ZFSBootMenu**, showing how I set up my NAS with root on ZFS. (#TODO: Link) While that laid the groundwork, it didn't make my NAS particularly *useful*. So now it's time for **Part 2**: turning this box into a proper, network-attached storage system that's data-safe, reliable, and easy to replicate. 

As a new video maker person (content creator feels like such an ugly phrase), I'm experimenting with different editing workflows on Mac, Linux, and Windows. So, setting up reliable Network Attached Storage for my videos makes it way easier to ferry files from one machine to the next as I edit on different devices. I'm also a lot less concerned about losing my files. 

If this goes well, I'd love to start consulting on homelabs for content creators, so reproducibility is key.

Anyway, here's the plan: I'll use **Ansible** to automate the installation/setup process, **ZFS** to manage snapshots, pruning, backups, and scrubs, and **Tailscale** to connect my NAS to an offsite backup at my dad's house.

Might I be *spending 10 hours to automate a task that would take me 2?* Could be. But, my hope is that these ten hours of prep will save me headaches when something inevitably breaks or I have to migrate to a new host. Crisis time is always more expensive than prep time - especially when crisis time happens on Saturday morning and I'm in no mood to deal with nonsense. And besides, I've been meaning to learn Ansible for 6 months now!

---

### The Plan  

This project isn't just about building storage—it's about making that storage **data-safe** and **reliable**, as well as making the configuration **repeatable** in a crisis or if a new host joins the network. So, here's the plan:  

1. **Data integrity and backups with ZFS**:  
   - **Scrubs** to ensure data integrity.  
   - **Snapshots** for quick, space-efficient backups.  
   - **Send/Receive** to replicate data to an offsite NAS.  

2. **Remote Access and Backups with Tailscale**:  
   - Tailscale creates a secure, private network using **WireGuard**, making it easy to connect my NAS to an offsite backup (in this case, my dad's almost identical NAS).
   - I can also still access, albeit slowly, the NAS from anywhere in the world without making it publicly accessible.

3. **Reproducibility with Ansible**:  
   - Ansible is a powerful automation tool that lets you define infrastructure as code. Think of it as a script that sets up your system exactly how you want it—every time.  
   - For this project, I'll use Ansible to:  
     - Install and configure **SMB** for cross-platform file sharing.  
     - Set up **Tailscale** for secure, remote access.  
     - Automate client configurations so any new device (say, an editor's laptop) can connect to the NAS without manual setup.  
   - I'll set up dad's NAS with the same Ansible playbook too. So we're already saving a little time with automation

---

### Why Bother Automating?  

Could I set all this up manually? Sure. It would take me a couple of hours, tops. But here's the thing:  
1. **Preparation vs. Crisis**: Those ten hours of automation will save me exponentially more time when things go wrong—because they *will* go wrong. Whether it's a hardware failure or an OS upgrade, I'll be able to rebuild my system with minimal effort.  
2. **Scalability**: If I add new devices or need to migrate to a different machine, Ansible makes it painless.  
3. **Learning Opportunity**: Ansible is a key tool in system administration, and this project gives me a chance to practice and learn.  

So yes, I'm spending ten hours to automate a two-hour task—but I'm also future-proofing my setup and leveling up my skills.  

---

### Wrapping Up  

I'm still in the planning phase for this project, but I'm excited to see how it comes together. Automating my NAS with **Ansible**, **ZFS**, and **Tailscale** isn't just about building storage—it's about building *better systems*.  

The moral? Preparation time is always cheaper than crisis time. Whether you're in a professional environment or tinkering in a homelab, investing a little extra time up front pays off when something goes wrong. And trust me, if you're like me, you don't want to spend your Saturday night trying to remember how you set up your NAS.  

Cheers,  
Nathan Laundry 