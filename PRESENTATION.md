#Inventory-Manager: Team Planter's Punch

*Javascript Applications Teamwork*


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
		
* **Modules**:
		
	- _app.js_: responsible for the routing
			
	- login.js: responsible for logging the user
			
	- registration.js: responsible for registration
			
	- general-module.js: responsible for template loading
			
	- inventory-module.js: ??
			
	- factory.js: provides model creation
			
	- validator.js: provides validation for other modules
