---
layout: ../../layouts/BlogLayout.astro
title: "Life and Lab 2: The 'Done List' and Windows"
description: "Exploring Oliver Burkeman's 'Done List' concept for productivity anxiety relief, plus a comprehensive guide to tiling window management on Windows using open source tools."
tags: ["philosophy", "productivity", "anxiety", "windows", "tiling", "glazewm", "komorebi", "autohotkey"]
time: 10
featured: true
timestamp: 2024-11-15T15:16:59+00:00
filename: life-and-lab-2-the-done-list-and-windows
---

Hey friends,

Last week I released my first properly edited Youtube video on ZFSBootMenu and it got a ton of positive feedback. So, to all of you who watched it, commented, subscribed, and so on, thank you so much! It was a tough week in academia, and that little boost did a lot for me. If you haven't watched it yet, I'll link it here.

#TODO: Link youtube video

On the docket for this issue of Life and Lab, are insights from Olver Burkeman's new(ish) book, meditations for mortals, and a little bit on the surprising wealth of open source tools for tiling window management experiences on Windows. Without further adue, let's get into it.

## Life

---

I've always struggled with the feeling that I'm not doing enough work, not going fast enough, not living up to my potential. This feeling stands staunchly, despite the contrasting feedback I get from loved ones, mentors, and colleagues that everything is actually going pretty well. It's something I've been working on for a while.

Few things have helped me as much as reading Oliver Burkeman's 4000 weeks (and some of Cal Newport's work). So, naturally, when I heard Oliver released a more practice-oriented book, *Meditations for Mortals*, I was excited.

### Meditations for Mortals

Meditations for Mortals, has 4 weeks worth of little chapters, and is intended to be read 1 chapter per day. I'm currently on Day 9, and have found each day to be interesting food for thought and have spent a little time journaling on them. As a little nugget here, I'll share my thoughts on Day 4's meditation, what Oliver calls "the Done List."

If you're like me, you keep at least one, but probably more, todo lists of varying sorts. Kanban boards, sprint thingamabobs, Notion's variuos views with little cards and "databases", and still, somehow, you end up writing more todos on sticky notes "to capture this one quickly." 

I won't deny the value of a todo list, and neither does Oliver, however he brings up an interesting point that the todo list can feel like a sort of productivity debt that we pay off throughout the day. When we take our todos too seriously, it can feel like the only real purpose of the day, is to grind through todos until all the boxes are checked. Once the boxes are ticked and the cards moved to the done column, we'll have reached a neutral state for the day - one where we've just earned worthiness for our spot on Earth.

This is how I feel a lot of the time. Instead of seeing the completed boxes as a win, I see all the unchecked boxes in today's list as a mounting argument that I haven't done enough to, I'm not moving fast enough, I'm not living up to my potential. In reality, Oliver argues in a Satrean bad faith sense, you didn't truly have to do any of that. The list isn't written into the paste of existence, it's in your head. 

If, as Oliver continues, each day we start from 0, without truly having to do anything, anything we do from there is gravy. So, perhaps not instead of, but in addition to the todo list, Oliver recommends we keep a **done list**. A list of all the things we've accomplished, on any time frame we like, without the encumbrance of all the things we aspired to do but didn't do. Because that's what they are, those empty tick boxes, aspirations. But, the things we actually did, those are real. And we can, and should, take pride in the very real things we did.

### TakeAways and Guiding Questions

I've been practicing the done list on a loosely weekly schedule and plan to do monthly, semesterly, and anually. In the thick of it, on the day to day, I still struggle with empty tick boxes. However, I've found I get a huge sigh of relief when I see what I've accomplished on longer time frames. Afterall, the little todos are all there in service of some bigger goals. So, if I'm making progress toward the big goals, which we can only see on those longer time frames anyway, then does it really matter if I dropped a checkbox along the way? The checkbox only existed to help me get *there* and it looks like I am, so whatever I "missed" probably wasn't that important.

Anyway, here's some guiding questions for you to think about, if, like me, you struggle with this kind of anxious productivity:

1. When you look at your todos at the end of the day, do you focus on what you did manage to do, what you didn't, or maybe somewhere in between?
2. How does that focus make you feel?
3. Do you think a done list would help you feel less anxious, feel a greater sense of pride, or even just see your progress more objectively?

I hope you give the done list a try. It's helped me quite a bit lately! If you do, I'd love if you shared in the substack subscribers chat!

## Lab

---

I believe that any respectable systems administrator should have a home base OS/environment, one they know in and out, but still maintain at least a modicum of proficiency on other major operating systems. For this reason, and definitely not because I need Windows to play league of legends with my friends, I, a staunch Linux acolyte, maintain a Windows PC. I also have MacOS on my laptop, and had a stint with FreeBSD as a workstation (that was tough).

As much hate as I jokingly lob at Windows (I'm going to meme co-pilot recall until I die), it's not that bad when you use Chris Titus Tech's microwin installer. WSL makes development easier, but, honestly, powershell is great if you want to stay in the windows environment. Software availability is, unsurprisingly, fantastic and Windows still is the home of PC Gaming. It's Windows ... the most popular consumer PC operating system ever. 

The irony of it all is that the worst part of Windows is its window management. Windows sucks at windows. ... Like ... What??

Luckily, there's a growing base of open source software bringing the glorious tiling revolution to Windows. It's these great folks and this fantastic software that I want to highlight today.

### Windows sucks at windows ... but we can fix it

I see the tiling experience as composed of 5 ingredients:

1. Automatic Tiling
2. App Runner (win +r does not cut it)
3. Virtual desktops/workspaces
4. Hotkey management for keyboard driven workflow
5. Status Bar

Today, all of these can be satisfied on Windows thanks to the hard work of open source devs, and, surprisingly, Microsoft. Let's take a look at some of the options.

#### Tiling on Windows

Two projects stand out here: **GlazeWM** and **Komorebi**. Both are great in their own right, but they definitely come at tiling from different angles.

**GlazeWM** is the seasoned player in this space. Inspired by i3wm, it's solid, reliable, and super straightforward to setup. Its YAML configuration is intuitive, and it even comes prepackaged with Zebar, a simple, batteries-included, status bar. If you want tiling on Windows to "just work" without spending hours tweaking, GlazeWM is the way to go. ([GitHub](https://github.com/glzr-io/glazewm))

**Komorebi**, on the other hand, is much more DIY. The core philosophy is to hook into Microsoft's Desktop Window Manager (DWM but not that one), and make as few changes as possible to the desktop and operating system by default. So, if you want more control, a little more time tinkering, and maybe to gain an understanding of what goes on under Window's hood, Komorebi might be your guy. ([GitHub](https://github.com/LGUG2Z/komorebi))

I'm personally using GlazeWM right now because I wanted something quick, easy, and a little more mature for stability's sake. I don't want to be fixing bugs on my Windows PC all day. Komorebi does look really cool and one day, if I have time, I'll take a crack at it. 

It's also worth noting that the primary Komorebi dev shares great content on his youtube channel [Jeezy Codes](https://www.youtube.com/@LGUG2Z).

#### App Runner: PowerToys Run

For an app runner on Windows, **PowerToys Run** isn't half bad. It's part of Microsoft's [PowerToys suite](https://github.com/microsoft/PowerToys), offering a clean, fast search bar you can access with `alt + space` (or customize the shortcut to your liking). It lets you launch apps, open files, and run system commands with ease, and its plugin system adds even more functionality, like calculator support and process searching. Since it's a Microsoft project, it integrates well with the Windows ecosystem and feels like the app runner Windows should have had from the start.

#### Virtual Desktops: Windows Built-in + GlazeWM

Windows has supported virtual desktops since Windows 10, and activating them is straightforward. Just press `win + tab` to open the Task View, then click the "+ New Desktop" button at the top to create a new workspace. Switching between them is just as easy with `ctrl + win + left/right arrow`. 

While this built-in functionality is useful, **GlazeWM** makes managing virtual desktops much smoother. Its default configuration uses keyboard shortcuts to move windows between desktops or switch workspaces quickly, all without leaving your workflow. Check out the GlazeWM github for more details on configuration and functionality [GlazeWM on GitHub](https://github.com/glzr-io/glazewm).

#### Hotkey Management: AutoHotkey

For hotkey management, [**AutoHotkey (AHK)**](https://www.autohotkey.com/) is not my cup of tea but it's undeniably powerful. I'd love something simpler like raycast's hotkeying on MacOS or i3's simple configuration, but it'll do. 

I use autohotkey to make launching apps like my terminal (`alt + t`) or browser (`alt + e`) effortless. With AHK, you can create custom shortcuts, automate repetitive tasks, or remap keys to fit your preferences. The [official AHK documentation](https://www.autohotkey.com/docs/) is comprehensive and includes plenty of examples to get started. Whether you're looking to streamline basic workflows or automate complex sequences, AHK offers the flexibility to shape your Windows experience to your needs.

#### Status Bar: Zebar

[**Zebar**](https://github.com/glzr-io/zebar) is a lightweight status bar that comes pre-packages with GlazeWM. It displays workspace indicators, system stats, and other key information, all while staying out of your way. Unlike some status bar solutions that require heavy configuration, Zebar works out of the box, making it an easy addition to your setup. If you're using Komorebi, Zebar is available as standalone software so, I'm fairly certain you can make use of zebar all the same. 

#### Windows Wrap up

And that's all the ingredients. I'm planning on making a more complete tutorial article and Youtube video on Windows tiling, but I was excited and wanted to share in this week's newsletter. Keep your eyes peeled for more in-depth content on this if you're on a Windows system and have been oggling r/unixp\*rn

## Bye for now

Alright folks, that's all I've got this week. Thanks again for reading! I hope you have a great week. 

If you've got some cool tech you'd like to chat about or want me to cover, feel free to reach out on substack DMs, subscriber chat, or even just by email.

Cheers,

Nathan Laundry 