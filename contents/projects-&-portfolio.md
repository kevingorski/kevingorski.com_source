template: projects-&-portfolio.jade

Content forthcoming.

In seven years of primarily .NET custom software development, I've worked on projects across industries and with a variety of constantly evolving technology. What follows is a small selection of the projects that I've worked on professionally, but it should give you a good idea of what I've done.
If you'd like to see some of my code, you can review my personal projects on GitHub.


## Enterprise System For Equipment Rental Startup

### Project Description

This project involved working with an equipment rental startup to both define their business processes and architect the technical solution needed to run their business. This was a unique project because it required multiple physically and logically separated systems to act in concert to provide a responsive end-user experience and an information rich administration system.
Equipment is rented and returned to kiosks by users with either a credit card or an RFID card that had been previously purchased. These kiosks would contact a central server to confirm the user account, manage payment details, and track the rented equipment.
The central server bridged the distributed kiosks and the administration Web site, which aggregated user, equipment, and system level data. By tracking the RFID tag for each piece of equipment, usage patterns and equipment location was used to coordinated maintenance and customer service efforts.
The administration Web site included the usual create/update/delete pages, but there were also some unique features that made the system powerful:
Google Maps-based dashboard for geographic visualizations of near real-time data
Configurable and templated messaging/alert system through email or SMS with localized messages
Custom ticketing system based on user reports and maintenance schedules
Remote hardware monitoring and control systems
A public web service for supporting 1st and 3rd party mobile applications

### My Role
As the architect of the central server and administration web site, I evaluated the high-level and detailed business requirements for technical feasibility and created the development plan that identified potential risks, provided a plan to mitigate them, and showed how we could use continuous integration to show our value and progress to the client throughout the project.
In addition to being the primary developer for most of the project, I was the technical lead for the team that did form. I led design discussions, clarified requirements, and worked with the team lead to ensure that the development team was given well-defined tasks that made sense in the context of the larger project and that we could provide the best solution possible.

### Technologies

* C#
* ASP.NET WebForms
* Telerik RadGrid
* JavaScript and jQuery
* Google Maps API
* WCF for web services
* Advanced NHibernate & Fluent NHibernate
* Autofac for Dependency Injection
* CruiseControl.NET for continuous integration


## Outlook Plug-In For Managing Child Visitation

### Project Description

We took a code base that had already been worked on by two separate development teams over several years and turned it into a sellable product. As a plug-in that had to work across versions of Windows and Outlook for managing the complex details of child visitation between divorced parents, it was clear from the outset that both the technology and the domain would be challenging.
Details that made this project unique:
Decidedly not [greenfield development](http://en.wikipedia.org/wiki/Greenfield_project)
Advanced rule-based scheduling, calculations, and reports
Data synchronization across an arbitrary number of end clients

### My Role

As the architect, I had to quickly evaluate the large existing codebase and determine where the most critical changes needed to be made to get the application to a working state. After that, a small team and I began building new features and fixing existing issues. Throughout the project, we worked with client to resolve UI and domain consistency issues, which resulted in a stronger product.

### Technologies

* VB.NET
* Add-in Express


## eCommerce SaaS Startup

### Project Description

A [SaaS](http://en.wikipedia.org/wiki/Software_as_a_service) product that hosted branded online stores for its customers, who then sold merchandise to the end customer. This project involved keeping the codebase manageable as the product grew to have more features and scaling it to support more customers.
Features:
Multiple payment processors
Third party system integration / Single Sign On
Flexible reporting
Inventory management
Coupon and discount system

### My Role

I started on this project as part of a small team, but over time became the sole developer and eventually trained others to work with the system. During the course of the project I was in constant communication with both technical and non-technical stakeholders in the project to better understand their requirements and support requests. In order to keep the independent features of this system running correctly, I employed object-oriented design techniques and design patterns.

### Technologies

* C#
* ASP.NET WebForms
* T-SQL
* ADO.NET


## Personnel Scheduling & Optimization Web Application

### Project Description

This web application helps clerks optimize the schedules of their personnel, where each employee and location has their own list of possible event types. The goals were to minimize each employee's travel during the day and suggest the best combination of person, time and location, optionally accepting user input for each variable. The system had to be aware of real-world travel data, so we used Google Maps for both calculating driving distances and times and generating a daily agenda for each user with driving directions.

### My Role

I primarily worked with the Google Maps and calendaring implementations, but I also provided feedback on the design of the optimization algorithm during the project and applied changes to the system as the requirements changed.

### Technologies

* C#
* ASP.NET WebForms
* ASP.NET AJAX
* jQuery FullCalendar, customized for additional functionality
* Google Maps
* NHibernate & Fluent NHibernate
* Autofac
* CruiseControl.NET


## Other Achievements as an Architect

Improved the project estimation process by helping create better documentation of high-level design decisions
Created and improved a standardized build & continuous integration process
Evaluated new tools and processes to integrate into everyday development
Presented on topics like Dependency Injection, IoC Containers, and Introduction to jQuery
Educated team with individual mentoring, including code and design reviews


## Can You Read It Now?

[Can You Read It Now](http://canyoureaditnow.com/) (or CYRIN) is a two-part project: an [open-source jQuery plug-in](https://github.com/kevingorski/CanYouReadItNow) for generating a numeric analysis of the visual readability of text and [a bookmarklet](http://canyoureaditnow.com/) to demonstrate it in action and help drive specific style changes.


## GitHub Commit Monitor

The [GitHub Commit Monitor](https://github.com/kevingorski/github-commitmonitor) is a [Node.js](http://nodejs.org/) example project from my blog Node Nerd.


## TrackBoard

[TrackBoard](https://github.com/kevingorski/TrackBoard) is a browser-based dashboard built with HTML5, CSS3, and JavaScript. You can [see a demo of TrackBoard here](http://kevingorski.github.com/TrackBoard). Many features have been prioritized to maximize the opportunity to combine progressive enhancement and new browser features rather than based upon delivering something immediately useful. The overall goal was to have something more visually pleasing and immediately useful to a development team like the [Panic Status Board](http://www.panic.com/blog/2010/03/the-panic-status-board/). There are other, more complete commercial products in the same vein like [Geckoboard](http://www.geckoboard.com/) that now exist in this space, but I was able to implement a decent set of features by utilizing open source libraries like [jQuery](http://jquery.com/) and [Modernizr](http://modernizr.com/), which are credited on the project page.