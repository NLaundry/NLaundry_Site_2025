---
layout: ../../layouts/BlogLayout.astro
title: "Code Smells as a Framework for Automated Feedback for Novice Programmers"
description: "Research paper on using code smells as a framework for automated feedback for novice programmers"
tags: ["research", "education", "programming", "feedback", "code-smells", "novice-programmers"]
time: 10
featured: false
timestamp: 2020-02-23T20:09:26-00:00
filename: code-smells-framework
---

# Code Smells as a Framework for Automated Feedback for Novice Programmers

**ICERI2021**

[Full Paper Here](https://library.iated.org/view/LAUNDRY2021COD)

## Abstract

Students who receive high quality, rapid feedback about their work are advantaged. The absence of feedback within a reasonable timeline can reinforce incorrect learning, instigate student frustration, and ultimately lead to student disengagement. Automated feedback has been shown to be an effective tool that can scale easily to large class sizes and has positive impacts on student learning. Existing feedback mechanisms for computer programmers such as messages produced by compilers and linters are cryptic and not aimed at novice coders. Furthermore, these existing tools do not attempt to address programming design issues, rather they simply point out a potential error in the code without explantion about why the error is problematic or what the underlying misconception might be.

Critical thinking and problem solving are crucial skills for software developers. A common programming-related use of those critical thinking skills for novice programmers is to understand their own errors and refactor their work accordingly. Unfortunately, many students are extrinsically motivated to learn and may rely on superficial approaches to learning, such as memorization, to minimize the time and effort required to receive their desired grade. This superficial approach to understanding is supported by traditional automated tools for programming, which means that extrinsically motivated novice programming students can too easily avoid the extra cognitive work associated with deep learning and critical thinking about errors. Automated feedback that identifies the underlying mistakes and helps novices identify the cause of their programming errors could help support the development of critical and creative thinking about programming.

Software developers use a set of metaphors, called code smells, as a shared language for describing common software design mistakes. A code smell identifies the characteristics of code that indicates a problem and also provides an explanation of why the characteristic is problematic as well as programming constructs that can avoid the problem. We propose adapting the notion of code smells to characterize mistakes that are made frequently by beginner programmers. The adapted code smells can be used to produce feedback that situates the errors and the feedback about them in the language and tools of the computing professional workplace. Through using such a feedback system, novice programmers can develop problem solving and critical thinking skills while gaining valuable "real world" knowledge and experience.

In this work we identify two common programming mistakes made by programmers, develop a code smell to describe and explain those mistakes and show that attributes of novice code associated with the two code smells can be automatically identified and discuss how those attributes can be used to produce feedback about the code. The adapted code smells are part of a framework for labeling, and addressing novice programming mistakes in a way that supports deep learning. 