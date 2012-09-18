template: projects-&-portfolio.jade

Since getting my Computer Science degree in 2004, I've primarily been doing .NET web development at my day job, but I've been exploring other languages and environments in my own time. Most of my personal projects are in browser-based JavaScript or [Node.js](http://nodejs.org) when there's a server component. Both platforms have their advantages, but I'm more interested in working with Node.

Here are some cherry-picked examples of projects I've worked on in the past that you might find interesting. If you're more of a code person, my personal projects are all on [GitHub](https://github.com/kevingorski).


## B-Cycle Admin Site & Infrastructure

[B-Cycle](http://b-cycle.com] was in a prototypical phase when we started working with them to build what would be the first production version of their automated bicycle rental system. This project was technically interesting because it required multiple physically and logically separated systems to act in concert to provide a responsive end-user experience and an information rich administration system.

Bikes are rented and returned to kiosks by users with either a credit card or an RFID card that had been previously purchased. Kiosks contact a central server to confirm the user account, manage payment details, and track the rented equipment. The central server bridged the distributed kiosks and the administration website, which aggregated user, equipment, and system level data. By tracking the RFID tag for each bike, usage patterns and equipment location was used to coordinated maintenance and customer service efforts.

The administration website included the usual create/update/delete pages, but there were also some unique features that made the system powerful:

* Google Maps-based dashboard for geographic visualizations of near real-time data
* Configurable and templated messaging/alert system through email or SMS with localized messages
* Custom ticketing system based on user reports and maintenance schedules
* Remote hardware monitoring and control systems
* A public web service for supporting 1st and 3rd party mobile applications

### My Role

As the architect of the central server and administration web site, I evaluated the high-level and detailed business requirements for technical feasibility and created the development plan that identified potential risks, provided a plan to mitigate them, and showed how we could use continuous integration to show our value and progress to the client throughout the project.

In addition to being the primary developer for most of the project, I was the technical lead for our team. I led design discussions, clarified requirements, and worked within our team and with the other teams lead to ensure that we were given well-defined tasks that made sense in the context of the larger project and that we could provide the best solution possible.

### Technologies

* ASP.NET WebForms
* JavaScript and jQuery
* Google Maps API
* WCF for web services
* Advanced NHibernate & Fluent NHibernate
* Autofac
* CruiseControl.NET

### My Favorite Parts

* A feel-good overall goal for the product: more biking, less driving, better city living.
* A great team that cared about the success and well-being of the project and had many productive and frank discussions that rooted out potential problems before they occurred.
* Building a map of user activity and seeing it work made everything seem much more real than most projects.
* Living in Denver, I'm constantly reminded of this project when passed by a B-Cycle or passing by a kiosk.


## Personnel Scheduling & Optimization Web Application

This web application helps law clerks optimize the schedules of their personnel, where each employee and location has their own list of possible event types. The goals were to minimize each employee's travel during the day and suggest the best combination of person, time and location, optionally accepting user input for each variable. The system had to be aware of real-world travel data, so we used Google Maps for both calculating driving distances and times and generating a daily agenda for each user with driving directions.

### My Role

I primarily worked with the Google Maps and calendaring implementations, but I also provided feedback on the design of the optimization algorithm during the project and applied changes to the system as the requirements changed.

### Technologies

* ASP.NET WebForms
* jQuery FullCalendar, customized for additional functionality
* Google Maps
* NHibernate & Fluent NHibernate
* Autofac
* CruiseControl.NET

### My Favorite Parts

* Working with a team that was deep into the theory behind what they were building and often had challenging discussions about the implementation that constantly improved it. 
* Time and location are easy things to talk about, but complex to deal with in code and in a UI, so the investigation phase was intense and rewarding.


## Can You Read It Now?

[Can You Read It Now](http://canyoureaditnow.com/) (or CYRIN) is a two-part project: an [open-source jQuery plug-in](https://github.com/kevingorski/CanYouReadItNow) for generating a numeric analysis of the visual readability of text and [a bookmarklet](http://canyoureaditnow.com/) to demonstrate it in action and help drive specific style changes. I wrote it to help me learn about typography, readability, and bookmarklets.

### Technologies

* jQuery
* Jasmine for testing the core analysis library
* Readability for finding the main content on a page
* Node.js for the bookmarklet hosting site and feedback

### My Favorite Parts

* It's a strange kind of fun evaluating specific pages for readability.
* This was one of my first attempts at a non-trivial JavaScript code-base for both client and server. There's a lot I'd do differently now, but I learned a lot.
* The design for the CYRIN homepage is less generic than most of my site designs end up being. Again, it could be better, but I don't hate it.


## GitHub Commit Monitor

The [GitHub Commit Monitor](https://github.com/kevingorski/github-commitmonitor) is a [Node.js](http://nodejs.org/) example project from my now defunct blog [Node Nerd](http://nodenerd.net). It was based on V2 of the GitHub API   so it no longer works, but it made for a decent series of beginner Node articles (which are also now obsolete since they were based on V0.2-0.4 of Node).


## TrackBoard

[TrackBoard](https://github.com/kevingorski/TrackBoard) is a browser-based dashboard built with HTML5, CSS3, and JavaScript. You can [see a demo of TrackBoard here](http://kevingorski.github.com/TrackBoard). Many features have been prioritized to maximize the opportunity to combine progressive enhancement and new-at-the-time browser features rather than based upon delivering something immediately useful. The overall goal was to have something more visually pleasing and immediately useful to a development team like the [Panic Status Board](http://www.panic.com/blog/2010/03/the-panic-status-board/). There are other, more complete commercial products in the same vein like [Geckoboard](http://www.geckoboard.com/) that now exist in this space, but I was able to implement a decent set of features by utilizing open source libraries like [jQuery](http://jquery.com/) and [Modernizr](http://modernizr.com/), which are credited on the project page.