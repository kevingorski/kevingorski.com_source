template: projects-&-portfolio.jade
exclude: portfolio

Since getting my Computer Science degree in 2004, I've primarily been doing .NET web development at my day job, but I've been exploring other languages and environments in my own time. Most of my personal projects are in browser-based JavaScript or [Node.js](http://nodejs.org) when there's a server component. Both platforms have their advantages, but I'm more interested in working with Node.

Here are some cherry-picked examples of projects I've worked on in the past that you might find interesting. If you're more of a code person, my personal projects are all on [GitHub](https://github.com/kevingorski).


## B-Cycle Admin Site & Infrastructure

[B-Cycle](http://bcycle.com) was in a prototypical phase when we started working with them to build what would be the first production version of their automated bicycle rental system. This project was technically interesting because it required multiple physically and logically separated systems to act in concert to provide a responsive end-user experience and an information rich administration system.

Bikes are rented and returned to kiosks by users with either a credit card or an RFID card that had been previously purchased. Kiosks contact a central server to confirm the user account, manage payment details, and track the rented equipment. The central server bridged the distributed kiosks and the administration website, which aggregated user, equipment, and system level data. By tracking the RFID tag for each bike, usage patterns and equipment location was used to coordinated maintenance and customer service efforts.

The administration website included the usual create/update/delete pages, but there were also some unique features that made the system powerful:

* <span>Google Maps-based dashboard for geographic visualizations of near real-time data</span>
* <span>Configurable and templated messaging/alert system through email or SMS with localized messages</span>
* <span>Custom ticketing system based on user reports and maintenance schedules</span>
* <span>Remote hardware monitoring and control systems</span>
* <span>A public web service for supporting 1st and 3rd party mobile applications</span>

### My Role

As the architect of the central server and administration web site, I evaluated the high-level and detailed business requirements for technical feasibility and created the development plan that identified potential risks, provided a plan to mitigate them, and showed how we could use continuous integration to show our value and progress to the client throughout the project.

In addition to being the primary developer for most of the project, I was the technical lead for our team. I led design discussions, clarified requirements, and worked within our team and with the other teams lead to ensure that we were given well-defined tasks that made sense in the context of the larger project and that we could provide the best solution possible.

### Technologies

* <span>ASP.NET WebForms</span>
* <span>JavaScript and jQuery</span>
* <span>Google Maps API</span>
* <span><abbr title="Windows Communication Foundation">WCF</abbr> for web services</span>
* <span>Advanced NHibernate & Fluent NHibernate</span>
* <span>Autofac</span>
* <span>CruiseControl.NET</span>

### My Favorite Parts

* <span>A feel-good overall goal for the product: more biking, less driving, better city living.</span>
* <span>A great team that cared about the success and well-being of the project and had many productive and frank discussions that rooted out potential problems before they occurred.</span>
* <span>Building a map of user activity and seeing it work made everything seem much more real than most projects.</span>
* <span>Living in Denver, I'm constantly reminded of this project when passed by a B-Cycle or passing by a kiosk.</span>


## Lead Management System for HomeAway

Why multiple systems? HomeAway purchased several different vacation rental companies and is now supporting them all. Some are web-based and some are desktop-based. As part of a larger initiative to provide functionality across these systems a small team was assembled to build the first of many distributed application modules that would integrate and add functionoality to each of these systems with minimal effort-per-system.
Managing vacation rental inquiries, booking properties within multiple web-based systems

LMS consists of a few parts:

* <span>A UI bootstrapped by a single JavaScript file which leverages jQuery and Knockout for AJAX and UI logic, respectively.</span>
* <span>Shared .NET WebAPI service for the app UI</span>
* <span>An end system-specific web service implementation that will be called from the top-level API to read and manipulate existing data</span>
* <span>An email retreival and parsing daemon to associate the text in incoming messages with properties and people in the system</span>

### Technologies

* <span>jQuery, Knockout</span>
* <span>.NET Web API</span>
* <span>Entity Framework v5</span>

### My Favorite Parts

* <span>I wouldn't want to be working under a compressed timeline all the time, but there's nothing quite as galvanizing for a small team as a goal that seems on the edge of possible.</span>
* <span>This was one of the most sophisticated and complete JavaScript-based UIs I've worked on. A lot of theory-based opinions were tested and proven one way or the other.</span>


## Can You Read It Now?

[Can You Read It Now](http://canyoureaditnow.com/) (or CYRIN) is a two-part project: an [open-source jQuery plug-in](https://github.com/kevingorski/CanYouReadItNow) for generating a numeric analysis of the visual readability of text and [a bookmarklet](http://canyoureaditnow.com/) to demonstrate it in action and help drive specific style changes. I wrote it to help me learn about typography, readability, and bookmarklets.

### Technologies

* <span>jQuery</span>
* <span>Jasmine for testing the core analysis library</span>
* <span>Readability for finding the main content on a page</span>
* <span>Node.js for the bookmarklet hosting site and feedback</span>

### My Favorite Parts

* <span>It's a strange kind of fun evaluating specific pages for readability.</span>
* <span>This was one of my first attempts at a non-trivial JavaScript code-base for both client and server. There's a lot I'd do differently now, but I learned a lot.</span>
* <span>The design for the CYRIN homepage is less generic than most of my site designs end up being. Again, it could be better, but I don't hate it.</span>


## GitHub Commit Monitor

The [GitHub Commit Monitor](https://github.com/kevingorski/github-commitmonitor) is a [Node.js](http://nodejs.org/) example project from my now defunct blog [Node Nerd](http://nodenerd.net). It was based on V2 of the GitHub API   so it no longer works, but it made for a decent series of beginner Node articles (which are also now obsolete since they were based on V0.2-0.4 of Node).


## TrackBoard

[TrackBoard](https://github.com/kevingorski/TrackBoard) is a browser-based dashboard built with HTML5, CSS3, and JavaScript. You can [see a demo of TrackBoard here](http://kevingorski.github.com/TrackBoard). Many features have been prioritized to maximize the opportunity to combine progressive enhancement and new-at-the-time browser features rather than based upon delivering something immediately useful. The overall goal was to have something more visually pleasing and immediately useful to a development team like the [Panic Status Board](http://www.panic.com/blog/2010/03/the-panic-status-board/). There are other, more complete commercial products in the same vein like [Geckoboard](http://www.geckoboard.com/) that now exist in this space, but I was able to implement a decent set of features by utilizing open source libraries like [jQuery](http://jquery.com/) and [Modernizr](http://modernizr.com/), which are credited on the project page.