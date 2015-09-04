#Inventory-Manager: Javascript Applications Teamwork

*Team Planter's Punch*

- Kalin Dimchev([TelerikAcademy profile](http://telerikacademy.com/Users/kalin.dimchev), [GitHub profile](https://github.com/kalindimchev))
- Kristina Mileva([TelerikAcademy profile](http://telerikacademy.com/Users/KMileva), [GitHub profile](https://github.com/ChrisChrisi))
- Ekaterina Martiniuk([TelerikAcademy profile](http://telerikacademy.com/Users/Katya), [GitHub profile](https://github.com/KatGitHub))
- Ivelina Popova([TelerikAcademy profile](http://telerikacademy.com/Users/iwelina.popova), [GitHub profile](https://github.com/iwelina-popova))
- Konstantin Simeonov([TelerikAcademy profile](http://telerikacademy.com/Users/kon.simeonov), [GitHub profile](https://github.com/KonstantinSimeonov))


##Application goals:

Facilitate distribution, management and locating of construction instruments and
	
tools for different construction managers across different construction sites.

##This is achieved by:

1. Providing a registration platform with different roles for admins and construction site managers
	
2. Managers have a list of instruments, can request new tools and return tools from their inventory
	
2. Managers can view their instruments, their construction site and all available instruments
	
3. Admins can resolve requests, create constructions sites and assign managers to sites
	
	
##Project description according to the requirements:
We used:
	
* **jQuery** for DOM manipulations and AJAX queries
		
* **Twitter Bootstrap** for styling
		
* **Mocha** and **Chai** for simple unit testing, **Sinon** for AJAX testing and mocking
		
* **Telerik Backend Services** for web data storage
		
* **localStorage** for storing the logged user

* **Sammy.js** for the routing
		
* **Modules**:
		
	- _app.js_: responsible for the routing
	
	- _factory.js_: provides model creation
	
	- _construction-sites-module.js_: responsible for submitting constructions sites to and fetching constructions sites from the backend
			
	- _general-module.js_: responsible for template loading
			
	- _validator.js_: provides validation for other modules
	
	- _session-module.js_: provides login and registration logic