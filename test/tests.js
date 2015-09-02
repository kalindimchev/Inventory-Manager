var expect = chai.expect;

describe('Templates tests', function () {
	it('expects templates to exist', function() {
		expect(templates).to.exist;
	});
	
	it('expects templates to have a getter', function () {
		expect(templates.get).to.exist;
	});
});

describe('Factory tests', function () {
	
	it('expects factory to exist', function () {
		expect(create).to.exist;
	});
	
	it('expects factory to have admin, manager and confidential data creation function', function () {
		expect(create.admin).to.exist;
		expect(create.siteManager).to.exist;
		expect(create.confidentialData).to.exist;
	});
	
	it('expects factory to create a new admin object with correct properties', function () {
		var admin = create.admin('doncho');
		
		expect(typeof admin).to.equal('object');
		expect(admin.InventoryList).to.exist;
		expect(admin.Username).to.exist;
		expect(admin.AvatarUrl).to.exist;
		expect(admin.RequestList).to.exist;
		expect(admin.ReservationList).to.exist;
		
		expect(admin.Username).to.equal('doncho');
	});
	
	it('expects factory to create a new manager object with correct properties', function () {
		var manager = create.siteManager('doncho', 'Remonta na bdj');
		
		// "ConstructionSite": undefined,
        //     "InventoryList": [],
        //     "AvatarUrl": undefined,
        //     'RequestHistory': [],
        //     "Username": undefined
		
		expect(typeof manager).to.equal('object');
		expect(manager.InventoryList).to.exist;
		expect(manager.Username).to.exist;
		expect(manager.ConstructionSite).to.exist;
		expect(manager.RequestHistory).to.exist;
		
		expect(manager.Username).to.equal('doncho');
		expect(manager.ConstructionSite).to.equal('Remonta na bdj');
	});
	
});

describe('Template manager', function () {
	
	it('expects loadTemplate, getTemplate and init to exist as properties in the manager and to be functions', function () {
		var templateManager = generalModule().getTemplateManager();
		
		expect(typeof templateManager.loadTemplate).to.equal('function');
		expect(typeof templateManager.getTemplate).to.equal('function');
		expect(typeof templateManager.init).to.equal('function');
	});
	
	it('expects getTemplate to return a template with correct template name as parameter', function () {
		var template = generalModule().getTemplateManager().getTemplate('login.html');
		
		expect(template).to.exist;
		console.log(template);
	});
});