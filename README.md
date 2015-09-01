# Inventory-Manager
JS Apps Teamwork

TODO:

1. Content types:

  1.1. User
  
    1.1.1. Admin
    
        - Avatar URL
        
        - Total Inventory List - Item, Total Count, Available Count, Not Available Count
        
        - Request List - Item, From Whom, Count, Status
        
        - Reservation List - Includes all Instruments that are transfered in Construction Sites
        
    1.1.2. Site Manager
    
        - Avatar URL
        
        - Construction site inventory list - Item, Count
        
        - Request History - Item, Count, Status
        
        - Construction site /property/
        
  1.2. Instrument /ID is automatically generated/
  
    - Brand
    
    - Model
    
    - Total Count
    
  1.3. Request
  
    - Instrument ID
    
    - Site manager ID
    
    - Count
    
    - Status - Initially Pending
    
  1.4. Reservation
  
    - Instrument ID
    
    - Site manager ID
    
    - Count
    
    
2. Application screen and Logic

  2.1. Initial Screen
  
    - username input
    
    - password input
    
    - login button - check in Dictionary if there is User with given Username and Password
    
  2.2. Admin Screen
  
    2.2.1. Approve Request
    
      - Create Reservation and Update Reservation List
      
      - Update Request status
      
      - Update Instrument count in Admin and Site manager Inventory List
      
    2.2.2. Deny Request
    
      - Update Request status
      
    2.2.4. Add Instrument to Inventory List - Create new Instrument item.
    
      Request inventory list is reloading every 10 sec /for example/ or when Single Request change its status.
      
    2.2.3. Assign Site manager to Construction site. Construction site is only property
    
  2.3. Site manager Screen
  
      - Make request button - Create Request object. Display Request inputs and submit button. Update all tables, related with requests.
      
      - Release request button - Delete Reservation. Update counts in Admin and Site manager count.
      
  2. Application screen and Logic

  2.1. Initial Screen - Kalin
  
    - username input - Kalin
    
    - password input - Kalin
    
    - login button - check in Dictionary if there is User with given Username and Password - Kalin
    
  2.2. Admin Screen
  
    2.2.1. Approve Request - Christina
    
      - Create Reservation and Update Reservation List - Christina
      
      - Update Request status - Christina
      
      - Update Instrument count in Admin and Site manager Inventory  - Christina
      
    2.2.2. Deny Request - Christina
    
      - Update Request status Christina
      
    2.2.4. Add Instrument to Inventory List - Create new Instrument item. - Christina
    
      Request inventory list is reloading every 10 sec /for example/ or when Single Request change its status. - Katya
      
    2.2.3. Assign Site manager to Construction site. Construction site is only property - Katya
    
  2.3. Site manager Screen - Ivelina
  
      - Make request button - Create Request object. Display Request inputs and submit button. Update all tables, related with requests. - Ivelina
      
      - Release request button - Delete Reservation. Update counts in Admin and Site manager count. - Ivelina
    
  2.4 Asynchronous module loading with Systemjs
  
      - Implement module loading with Systemjs - Konstantin
      
      - Improve the testability of the different modules - Konstantin



DONE Tasks:

Add all Content types in Telerik BackEnd Services

