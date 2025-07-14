---
layout: ../../layouts/ProjectLayout.astro
title: "ProxBox: Learning Infrastructure as Code Through Homelab Projects"
description: "My journey into infrastructure automation using Terraform and Ansible to deploy Kubernetes and SLURM clusters on Proxmox, built for reproducibility during a homelab rebuild."
tags: ["infrastructure-as-code", "terraform", "ansible", "kubernetes", "slurm", "proxmox", "homelab", "devops"]
time: 12
featured: true
timestamp: 2024-12-12T16:00:00+00:00
filename: proxbox-containerized-proxy-management
githubRepos:
  - name: "ProxBox-Kube"
    url: "https://github.com/NLaundry/proxbox-kube"
  - name: "ProxBox-SLURM" 
    url: "https://github.com/NLaundry/proxbox-slurm"
youtubeUrl: "https://www.youtube.com/watch?v=u483SMqihZ8"
---

# ProxBox: Learning Infrastructure as Code Through Homelab Projects

Hey friends,

I've been fascinated by the concept of infrastructure as code for a while now, but I'd never really dug into it properly. You know how it is—you read about Terraform and Ansible, maybe watch a few YouTube videos, but there's nothing quite like building something real to force you to understand how it all fits together.

The timing was perfect for diving into this. I knew I was moving apartments and would be rebuilding my entire homelab from scratch, so I figured: why not build everything to be quickly and easily reproducible? I wanted to learn both Kubernetes and SLURM, but I'd never actually run either in my homelab before. Instead of setting them up manually and having to figure it out all over again after the move, I decided to learn infrastructure as code and build automated deployment systems from the start.

This led me to create ProxBox—not just one project, but two parallel explorations into infrastructure automation. What started as "I want to learn these technologies in a reproducible way" turned into a deep dive into modern DevOps practices and gave me hands-on experience with both container orchestration and HPC resource management.

## The Learning Goals

My main objective was to understand infrastructure as code from the ground up. I believe the best way to learn DevOps and infrastructure concepts is through a homelab where you can break things without consequences. Specifically, I wanted to explore:

- **Terraform** for infrastructure provisioning
- **Ansible** for configuration management  
- **Kubernetes** for container orchestration
- **SLURM** for HPC resource management
- **The patterns** that make infrastructure automation actually work

I ended up building two complementary systems: ProxBox-Kube for Kubernetes clusters and ProxBox-SLURM for HPC environments. Both use the same underlying automation tools but solve completely different problems.

## ProxBox-Kube: My First Real Terraform Project

### The Problem

I'd never actually run Kubernetes in my homelab, but I wanted to learn it properly. Since I knew I'd be rebuilding everything after my move, I figured the smart approach was to build the deployment automation first, then learn Kubernetes through that reproducible infrastructure.

### What I Built

ProxBox-Kube automates the entire Kubernetes cluster deployment process on Proxmox VMs. Here's what it handles:

- **VM Provisioning**: Uses Terraform with the Proxmox provider to create VMs
- **Cluster Configuration**: Ansible playbooks that configure kubeadm, networking, and services
- **High Availability**: Sets up HAProxy and Keepalived for load balancing
- **Networking**: Configures Calico CNI for pod networking
- **Container Runtime**: Uses containerd instead of Docker

The architecture I settled on creates:
- A prime control node (192.168.100.101+) that bootstraps the cluster
- Secondary control nodes for redundancy
- Worker nodes (192.168.101.101+) where pods actually run
- A virtual HA IP (192.168.100.100) for seamless failover

### What I Learned

**Terraform is More Intuitive Than Expected**: Once I got over the initial learning curve, describing infrastructure as code felt natural. The ability to `terraform destroy` and rebuild identical environments completely changed how I approach experimental infrastructure.

**Ansible Makes Sense**: YAML everywhere can be annoying, but the declarative approach to configuration management is incredibly powerful. Instead of maintaining shell scripts, I could describe the desired state and let Ansible figure out the implementation.

**Kubernetes Complexity is Real**: Even with kubeadm handling the heavy lifting, there are so many moving pieces. Network policies, storage classes, ingress controllers—each component taught me something new about how container orchestration actually works.

**High Availability Isn't Magic**: HAProxy and Keepalived seemed scary at first, but the patterns are well-established. The hardest part was understanding how all the networking pieces fit together.

## ProxBox-SLURM: Exploring HPC Resource Management

### Why SLURM?

After getting comfortable with Kubernetes, I wanted to explore a completely different approach to resource management. SLURM represents decades of HPC wisdom, and I was curious how it would compare to the container-centric world I'd been learning about. Again, I'd never actually run SLURM before, but I figured building the automation would be the best way to learn it.

### The Different Paradigm

Where Kubernetes assumes ephemeral workloads that can be killed and restarted, SLURM is built for long-running scientific computing jobs that might run for days or weeks. This fundamental difference affects everything from scheduling to resource allocation to monitoring.

### What I Discovered

**HPC and Containers Are Different Beasts**: SLURM's job queues, resource partitions, and accounting systems solve problems that don't exist in the Kubernetes world. Multi-user environments, fair-share policies, and batch processing require entirely different thinking.

**The Automation Patterns Are Similar**: Even though SLURM and Kubernetes are completely different, the infrastructure automation approach was remarkably similar. Terraform for provisioning, Ansible for configuration, the same basic workflow.

**Configuration Complexity Varies**: Where Kubernetes has complex networking but straightforward deployment, SLURM has complex resource management but simpler networking. Different complexity, not necessarily more or less.

The codebase ended up being 48.2% HCL (Terraform), 44.6% Shell scripts, and 7.2% Jinja templates—quite different from the more YAML-heavy Kubernetes approach.

## Key Scripts and Automation

Through both projects, I developed several reusable automation scripts:

- `create_proxmox_user_and_get_key.sh`: Automates the tedious Proxmox API credential setup
- `qemu_template_setup.sh`: Creates consistent VM templates with cloud-init
- `setup_cloudinit_snippet.sh`: Handles cloud-init configuration for both projects

These scripts eliminate the manual setup steps that I used to dread.

## What This Taught Me About DevOps

### Infrastructure as Code is Liberating

Once I had these systems working, I could tear down and rebuild entire compute environments in minutes. This completely changed how I approach experimental infrastructure—I'm not afraid to break things anymore because I know I can recreate them.

### The Homelab Advantage

Having a dedicated homelab environment where I could experiment freely was crucial. I broke things constantly, made questionable architectural decisions, and learned from my mistakes without any pressure. You can't get that kind of learning experience in a production environment.

### Different Technologies, Same Principles

Whether I was deploying Kubernetes or SLURM, the core principles remained consistent:
1. Describe your infrastructure as code
2. Use configuration management for consistency
3. Automate everything you can
4. Version control your configurations
5. Test your deployments

### The Learning Never Stops

These projects gave me confidence with Terraform and Ansible, but they also showed me how much I still don't know. Each deployment taught me something new about networking, storage, security, or monitoring.

## Building for Reproducibility

The whole motivation for this approach came from knowing I'd be rebuilding my homelab after moving. This same principle guided other projects I was working on around the same time, like my [ZFSBootMenu autoinstaller script](https://github.com/NLaundry/zfsbootmenu-autoinstaller). As I mentioned in my [YouTube video about ZFSBootMenu](https://www.youtube.com/watch?v=u483SMqihZ8), having reproducible infrastructure means you can confidently tear things down and rebuild them without losing weeks of configuration work.

## Looking Back

ProxBox represents my first serious exploration into infrastructure automation, and honestly, it opened up a whole new world of possibilities. Every time I need to deploy something new now, I find myself thinking: "How would I automate this?"

The projects are available on GitHub if you want to explore similar territory:
- [ProxBox-Kube](https://github.com/NLaundry/proxbox-kube)
- [ProxBox-SLURM](https://github.com/NLaundry/proxbox-slurm)

Fair warning though—these are learning projects, not production systems. They represent my journey of figuring out how infrastructure automation works, complete with all the questionable decisions and over-engineered solutions that come with exploration.

But that's the whole point, right? The best way to learn DevOps is by building something real, breaking it, and figuring out how to fix it. Your homelab is the perfect place to do exactly that.

## Next Steps

These projects have given me a solid foundation in infrastructure as code, but they've also shown me how much more there is to learn. I'm particularly interested in exploring:

- GitOps workflows with ArgoCD
- Infrastructure security and compliance
- Monitoring and observability patterns
- Multi-cloud deployments

The beautiful thing about homelab learning is that each project builds on the last. ProxBox taught me the fundamentals, and now I can tackle more complex infrastructure challenges with confidence.

That's the power of project-based learning—you don't just read about infrastructure as code, you live it.

Cheers,

Nathan 