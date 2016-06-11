---
layout:     post
title:      "Speed Testing the eUP Homepage"
subtitle:   "The eUP homepage seems to load fast. But how long does it really fully load?"
date:       2016-05-12 14:33
author:     "Sean Francis N. Ballais"
permalink:  /blog/speed-testing-the-eup-homepage/
header-img: "img/posts/speed-testing-the-eup-homepage/header.jpg"
comments: true
description: ""
---

Recently, I have read that the university I am currently studying in, University of the Philippines Visayas Tacloban College, will slowly be shifting to use a new system called [eUP](http://e.up.edu.ph/) that provides university functionalities such as student enrollment, and data management that can be accessed by all University of the Philippines campuses in one website. This new system has issues that came along with it but I will not  delve much into that.

This shift made me curious about the website. So, I checked out the website. The homepage seems to load fast. I cannot stop having a cringing feeling on the design. The design is modern to say the least but needs some improvements. I can't help but also notice that sections of the website use images instead of `div`s.

![I cringe.](/static/img/posts/speed-testing-the-eup-homepage/cringe.jpg)

I also noticed that a few of the images load slowly. This behaviour is quite peculiar as the other images load faster. With this question in my head, I decided to speed test the homepage and get the exact number of seconds the homepage fully loads. By fully load, I mean when all the resources has finished downloading. In layman's terms, no more spinning circle thing on the right of the page tab.

### The Speed Test

For the speed test, I used [my ASUS X454L laptop running Ubuntu 16.04](/blog/why-linux/) (64-bit) and Google Chrome 51.0.2704.84. I also closed all applications that are running in my system except Chrome and gEdit. [Chrome Web Developer Tools](https://developers.google.com/web/tools/chrome-devtools/?hl=en) was used to get the loading times. The download speed of my wifi connection is around 870Kbps from PLDT with a 2 MBps plan. The router used is a [PLDT Ultera Home](http://pldthome.com/ultera) router. I started the test at 4:39 PM and ended at 4:50 PM.

I hard loaded the homepage ten times giving me a data set of ten elements where each element is a loading time. I hard loaded the homepage so that the browser would have to redownload every asset (images, javascript files, CSS files, etc.) of the page.

![Chrome Web Developer Tools](/static/img/posts/speed-testing-the-eup-homepage/web-developer-tools.png)

The exact loading times (in seconds) that I got from the site are (sorted ascendingly) `44.87`, `44.89`, `44.96`, `44.98`, `44.99`, `45.17`, `45.40`, `45.67`, `45.87`, and `46.65`. Based on the data that I got, the site fully loads between 44.87s and 46.65s giving us a mean loading time of 45.345s and a median loading time of 45.08s. However, the site can already show the contents within a few seconds.

![Graph](/static/img/posts/speed-testing-the-eup-homepage/chart.png)

Given the data, I became curious with the speed of the homepage. The homepage has the potential to probably fully load in less than 30 seconds. I inspected the data Chrome Web Developer Tools has given me. The page is 6.6 MB big. I am suspecting that the cause of this size is the use of a lot of images. So I inspected the files that has long spikes in the resource graph.

![Resource spike](/static/img/posts/speed-testing-the-eup-homepage/spikes.png)

I was surprised. The bottleneck of the page are three images that are above the *Visit the Gallery* button. Each of them is around 1.0MB big. Those three images make up 46.97% of the total page size. It is probably best if they [compress the three "heavy" images to take up less space](https://blog.codinghorror.com/a-comparison-of-jpeg-compression-levels-and-recompression/) and reduce the total page size to probably 3.5 MB. That may depend on the final size of the optimized images.

![The three heavy images](/static/img/posts/speed-testing-the-eup-homepage/three-images.png)

After a quick scan of the page source code, I discovered that eUP is using WordPress. Relics of WordPress is visible in the source code. From what I can see from the source code alone, eUP is using the WordPress plugins, [Content Views](https://wordpress.org/plugins/content-views-query-and-display-post-page/), and [Pirate Form](https://wordpress.org/plugins/pirate-forms/). Even though eUP is using WordPress, that does not mean that its components are using WordPress as well.

![The source code](/static/img/posts/speed-testing-the-eup-homepage/wordpress.png)

### Conclusion

To be frank, despite the homepage taking nearly two-thirds of a minute to fully load, it is not necessary for them to immediately reduce the page loading time. The page content can already be seen in a few seconds. Generally, the whole site loads fast perception-wise.

In the software development industry, there are some tradeoffs you have to make just to meet the deadline. These tradeoffs may be having to choose to dump a feature, remove cosmetic features, or [fixing that annoying bug](http://www.joelonsoftware.com/articles/fog0000000014.html). These are just some of the possible scenarios. Others may have different scenarios.

With this in mind, maybe, for the developers of eUP, [they have to skip optimizing some assets](/blog/5-lessons-learned-from-developing-a-school-election-system/) to finish the other parts of eUP...or maybe not. Who knows? Let us wait and see.

*What do you think of the eUP's homepage loading speed? What do you think of eUP? Do you have any experience with eUP? Or do you have an opinion you want to share? Let us know in the comments below.*

<div class="row" style="background-color: rgb(93, 191, 213); color: #ffffff; padding: 10px;">
    <div class="col-xs-3">
        <img src="/static/img/posts/speed-testing-the-eup-homepage/octojekyll.png" width="140" height="140">
    </div>
    <div class="col-xs-9">
        <p style="margin-top: 0;">
            <small>
                <strong>Advertisement (Not sponsored by GitHub nor Jekyll developers)</strong><br />
                Create static websites with <a href="https://pages.github.com/">GitHub Pages</a> for you and your projects. Powered by <a href="http://jekyllrb.com">Jekyll</a>. Sign up now at <a href="https://www.github.com/">GitHub</a> and <a href="https://pages.github.com/">get started</a>.
            </small>
        </p>
    </div>
</div>
