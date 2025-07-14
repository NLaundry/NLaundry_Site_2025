---
layout: ../../layouts/ProjectLayout.astro
title: "MacAutoSetup: Building the Perfect Development Environment"
description: "How I automated macOS development environment setup with a terminal-first, keyboard-driven approach using Homebrew, AstroNvim, and carefully curated tools."
tags: ["macos", "automation", "development", "terminal", "neovim", "homebrew", "dotfiles", "productivity"]
time: 10
featured: true
timestamp: 2024-12-08T14:00:00+00:00
filename: macautosetup-automated-macos-configuration
githubUrl: "https://github.com/NLaundry/MacAutoSetup"
youtubeUrl: "https://www.youtube.com/watch?v=Im3b6dhnp04"
---

# MacAutoSetup: Building the Perfect Development Environment

Hey friends,

Setting up a new Mac for development is one of those tasks that should be straightforward but somehow always takes forever. You install Homebrew, configure your shell, set up development tools, tweak system preferences, and before you know it, you've spent an entire day just getting your environment to the point where you can actually start working.

I got tired of this process after setting up my third or fourth Mac over the years. More importantly, I realized I was never quite getting the same setup twice—I'd forget to install something, or configure a setting slightly differently, and end up with an inconsistent development environment.

So I decided to do what any developer would do: automate the problem away.

## The Philosophy: Terminal-First, Keyboard-Driven

Before diving into the technical details, I should explain the philosophy behind this setup. I'm a firm believer in terminal-first, keyboard-driven workflows. This automation is designed around:

- **Minimal mouse usage**: Everything should be accessible via keyboard
- **Terminal-centric development**: Most work happens in the terminal or terminal-based editors
- **Portable knowledge**: Learning tools that exist across different platforms
- **Community-maintained tools**: Preferring established tools over custom configurations

This approach means the setup focuses on tools like Neovim, tmux, and command-line utilities rather than GUI-heavy applications.

## What the Automation Does

MacAutoSetup handles the complete development environment setup by:

- **Installing Homebrew** and essential command-line tools
- **Configuring Zsh** with the Zap plugin manager
- **Setting up Neovim** with the AstroNvim distribution
- **Installing development languages** (Python, Node.js, etc.)
- **Configuring GUI applications** (Raycast, Aerospace, iTerm2)
- **Setting up system preferences** for development workflows
- **Managing dotfiles** with GNU Stow

## The Key Tools

### Zsh with Zap Plugin Manager

I chose Zsh as the default shell (which is already the macOS default) and paired it with [Zap](https://github.com/zap-zsh/zap) for plugin management. Zap is minimal, fast, and doesn't get in the way—exactly what I want from a shell plugin manager.

### Raycast for Application Launching

[Raycast](https://raycast.com/) replaced Spotlight for me years ago. It's incredibly fast, extensible, and has become the main way I interact with my system. The automation installs Raycast and configures it as the default launcher.

### Aerospace for Window Management

[Aerospace](https://github.com/nikitabobko/AeroSpace) is a tiling window manager for macOS that brings i3-style window management to Mac. It's keyboard-driven and makes managing multiple windows actually pleasant.

### AstroNvim for Development

Here's where I made an interesting choice. Instead of maintaining my own Neovim configuration, I went with [AstroNvim](https://astronvim.com/). This is a well-maintained, community-driven Neovim distribution that gives me a powerful development environment without the overhead of maintaining complex configurations.

As I mentioned in the README, this represents a shift in my approach: "I chose AstroNvim to reduce personal configuration overhead while maintaining a powerful development environment, emphasizing learning tools over managing complex personal configurations."

## The Installation Process

The automation provides two installation methods:

### With Git (if you already have it):
```bash
git clone https://github.com/NLaundry/MacAutoSetup.git ~/Projects/MacAutoSetup
cd ~/Projects/MacAutoSetup
./bootstrap.sh
```

### Without Git (fresh macOS install):
```bash
bash <(curl -fsSL https://raw.githubusercontent.com/NLaundry/MacAutoSetup/main/bootstrap-nogit.sh)
```

The script handles dependency installation, so you can run it on a completely fresh macOS installation.

## What Gets Installed

The automation installs a carefully curated set of tools:

**Command-Line Tools:**
- git, fzf, ripgrep, tmux, neovim
- kubectl (for Kubernetes work)
- Various development utilities

**GUI Applications:**
- Raycast (launcher)
- Aerospace (window manager)
- iTerm2 (terminal)
- VS Code (backup editor)

**Development Environment:**
- Python with pip
- Node.js with npm
- JetBrains Mono Nerd Font

## The Dotfiles Approach

I use GNU Stow for dotfile management, which creates symbolic links from a central repository to their proper locations. This approach means:

- All configurations are version-controlled
- Changes are immediately reflected across all machines
- Easy to add or remove specific configurations
- Simple backup and restore process

## What I Learned

Building this automation taught me several important lessons:

**Less is More**: I originally tried to include every possible tool and configuration. The final version focuses on essential tools and lets me add specifics as needed.

**Community Beats Custom**: Using AstroNvim instead of maintaining my own Neovim config has been liberating. I get a powerful, well-maintained environment without the overhead.

**Automation Should Be Maintainable**: The scripts are designed to be readable and modifiable. When tools change or I want to add something new, it should be straightforward.

**Testing is Essential**: I've run this automation on multiple fresh macOS installations to ensure it works consistently.

## The Results

Since building this automation, I've used it to set up:
- My main development machine
- Test VMs for experimentation
- Friends' systems (with their permission)
- Clean installs after major macOS updates

Each setup takes about 15-20 minutes instead of the hours it used to take manually. More importantly, I get the exact same environment every time, which means I can focus on work instead of configuration.

## Why This Approach Works

This setup reflects my broader philosophy about development environments: they should be reproducible, portable, and focused on productivity rather than customization for its own sake.

The terminal-first approach means the knowledge transfers across different systems. The keyboard-driven workflow eliminates the constant context switching between mouse and keyboard. And the community-maintained tools ensure I'm not spending time maintaining configurations that others have already solved.

## Building for Reproducibility

Like my other automation projects ([ProxBox](https://nathanlaundry.com/lab/proxbox-containerized-proxy-management) and [ZFS Boot Menu Autoinstaller](https://nathanlaundry.com/lab/zfs-boot-menu-autoinstaller)), this project is all about reproducibility. Whether I'm setting up a new machine or helping someone else get started with development, having a proven automation process saves time and reduces frustration.

The project is available on [GitHub](https://github.com/NLaundry/MacAutoSetup) with detailed installation instructions and configuration details.

## Looking Forward

This automation continues to evolve as I discover new tools or as my workflow changes. The beauty of having it automated is that improvements benefit all future setups.

Some areas I'm considering for future versions:
- Integration with cloud-based development environments
- More sophisticated backup and restore capabilities
- Better support for different development languages
- Enhanced security configurations

But for now, it does exactly what I need: transforms a fresh Mac into a fully-configured development environment with minimal effort.

That's the power of automation—you invest the time once, and it pays dividends forever.

Cheers,

Nathan 