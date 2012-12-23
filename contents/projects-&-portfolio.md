template: projects-&-portfolio.jade
exclude: portfolio

Since getting my Computer Science degree in 2004, I&rsquo;ve primarily been doing .NET web development at my day job, but I&rsquo;ve been exploring other languages and environments in my own time. Most of my personal projects are in browser-based JavaScript or [node.js](http://nodejs.org). Both .NET and node have their advantages, but I&rsquo;m more interested in working with node in the future.

Here are some cherry-picked examples of projects I&rsquo;ve worked on in the past that you might find interesting. If you&rsquo;re more of a code person, my personal projects are all on [GitHub](https://github.com/kevingorski). I&rsquo;ve also got [a more formal résumé](Kevin%20Gorski%20-%20Resume.pdf) (<abbr title="Portable Document Format">PDF</abbr>) and a [LinkedIn profile](https://www.linkedin.com/in/kevingorski/).


## B-Cycle Admin Site & Infrastructure

[B-Cycle](http://bcycle.com) was in a prototypical phase when we started working with them to build what would be the first production version of their automated bicycle sharing system. This project was technically interesting because it required multiple physically and logically separated systems to act in concert to provide a responsive end-user experience and an information rich administration system.

Bikes are rented and returned to kiosks by users with either a credit card or an <abbr title="Radio Frequency Identification">RFID</abbr> card that had been previously purchased. Kiosks contact a central server to confirm the user account, manage payment details, and track the rented equipment. The central server bridged the distributed kiosks and the administration website, which aggregated user, equipment, and system level data. By tracking the <abbr title="Radio Frequency Identification">RFID</abbr> tag for each bike, usage patterns and equipment location was used to coordinated maintenance and customer service efforts.

The administration website included some unique features that made the system powerful:

* <span>[Google Maps](http://maps.google.com/)-based dashboard for geographic visualizations of near real-time data</span>
* <span>Configurable and templated messaging/alert system through email or <abbr title="Short Message Service">SMS</abbr> with localized messages</span>
* <span>Custom ticketing system based on user reports and maintenance schedules</span>
* <span>Remote hardware monitoring and control systems</span>
* <span>A public web service for supporting first- and third-party mobile applications</span>

### My Role

As the primary developer and architect of the central server application and administration web site I evaluated the high-level and detailed business requirements for technical feasibility, created a development plan that identified potential risks, provided plans to mitigate them, and used continuous integration to show our progress throughout the project.

### Technologies

* <span>ASP.NET WebForms</span>
* <span><abbr title="Windows Communication Foundation">WCF</abbr> for web services</span>
* <span>NHibernate & Fluent NHibernate</span>
* <span>Autofac</span>
* <span>CruiseControl.NET</span>
* <span>jQuery</span>
* <span>Google Maps <abbr title="Application Programming Interface">API</abbr></span>

### My Favorite Parts

* <span>A feel-good goal for the product: more biking, less driving, and better city living</span>
* <span>The development team cared about the success and well-being of the project and had many productive discussions about both the software and business</span>
* <span>I&rsquo;m often reminded of this project when passing a B-Cycle or kiosk</span>


## Lead Management System for HomeAway

Managing vacation rental leads is a manual and unstructured process for many property managment companies, even if they use software to manage availability and the booking process. [<abbr title="Lead Management System">LMS</abbr>](http://software.homeaway.com/vacation-rentals/products/lead-management) is a &ldquo;modular application&rdquo; that tightly integrates into such systems with minimal changes to the existing codebase.

There are two technical aspects of <abbr title="Lead Management System">LMS</abbr> that make it modular: the <abbr title="User Interface">UI</abbr> that is loaded via JavaScript from a shared location into any of the participating end-systems and the web service that can transparently call end system-specific implementations as necessary.

### Technologies

* <span>Knockout</span>
* <span>jQuery</span>
* <span>ASP.NET MVC</span>
* <span>.NET Web API</span>
* <span>Entity Framework 5</span>
* <span>RabbitMQ</span>

### My Favorite Parts

* <span>This is the most complete <abbr title="Single Page App">SPA</abbr> I&rsquo;ve worked on</span>
* <span>Working with a motivated and talented development team</span>

## Can You Read It Now?

[Can You Read It Now](http://canyoureaditnow.com/) (or <abbr title="Can You Read It Now">CYRIN</abbr>) is a two-part project: an [open-source jQuery plug-in](https://github.com/kevingorski/CanYouReadItNow) for analyzing the visual readability of text and [a bookmarklet](http://canyoureaditnow.com/) to help users make specific style changes to improve readability. I wrote it to help me learn about typography, readability, and bookmarklets.

### Technologies

* <span>jQuery</span>
* <span>Jasmine for testing the core analysis library</span>
* <span>Node.js & MongoDB for the bookmarklet hosting site as well as accepting and responding to feedback</span>

### My Favorite Parts

* <span>It&rsquo;s a strange kind of fun evaluating specific pages for readability</span>
* <span>This was one of my first attempts at a non-trivial JavaScript codebase for both client and server</span>
* <span>I made the design for the <abbr title="Can You Read It Now">CYRIN</abbr> homepage and I don&rsquo;t hate it</span>


## TrackBoard

[TrackBoard](https://github.com/kevingorski/TrackBoard) is a browser-based dashboard built with <abbr title="Hypertext Markup Language">HTML</abbr>5, <abbr title="Cascading Style Sheets">CSS</abbr>3, and JavaScript. You can [see a demo of TrackBoard here](http://kevingorski.github.com/TrackBoard). Many features have been prioritized to maximize the opportunity to combine progressive enhancement and new-at-the-time browser features rather than based upon delivering something immediately useful. The overall goal was to have something more visually pleasing and immediately useful to a development team like the [Panic Status Board](http://www.panic.com/blog/2010/03/the-panic-status-board/). There are other, more complete commercial products in the same vein like [Geckoboard](http://www.geckoboard.com/) that now exist in this space, but I was able to implement a decent set of features by utilizing open source libraries like [jQuery](http://jquery.com/) and [Modernizr](http://modernizr.com/).