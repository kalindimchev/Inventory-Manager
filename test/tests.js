var expect = chai.expect;

describe('Templates tests', function () {
	it('expects templates to exist', function () {
		expect(templates).to.exist;
	});

	it('expects templates to have a getter', function () {
		expect(templates.get).to.exist;
	});

	it('expects templates to query with the provided url', function () {
		var url = 'templates/login.html';
		sinon.stub($, 'ajax');
		templates.get(url, sinon.spy());
		
		expect($.ajax.calledWithMatch({url: url})).to.be.true;
		
		$.ajax.restore();
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
	
	it('expects factory to create confidential data with valid properties', function () {
		var nfo = create.confidentialData('UIlo Kendov', 'edna lekciika');
		
		expect(typeof nfo.User).to.equal('string');
		expect(typeof nfo.Pass).to.equal('string');
		expect(nfo.Role).to.equal('manager');
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
	
	it('expects init function of template manager to correctly initialize the manager', function (){
		var manager = generalModule().getTemplateManager().init();
		
		expect(typeof manager.templates).to.equal('object');
		expect(typeof manager.container).to.equal('object');
	});
});

describe('Validator', function () {

	var vu = validator.isValidUsername,
		vp = validator.isValidPassword;

	it('expects validator to return false with null, empty, whitespace and undefined usernames', function () {
		var results = [vu(null), vu(), vu(''), vu('    ')];

		results.forEach(function (result) {
			expect(result).to.be.false;
		});
	});

	it('expects validator to return false with usernames that contain bad characters', function () {
		var badUsernames = ['domcho.minkov', 'kon_simeonov', 'dobi!boycheva', '><(((*)>'];

		badUsernames.forEach(function (name) {
			expect(vu(name)).to.be.false;
		});
	});

	it('expect validator to return true with valid usernames', function () {
		var validUsernames = ['Domcho Minkov', 'Kon Simeonov', 'Dobi Boycheva', 'Penka Karahadjimiteva'];

		validUsernames.forEach(function (name) {
			expect(vu(name)).to.be.true;
		});
	});

	it('expects validator to return false with null, empty, whitespace and undefined passwords', function () {
		var results = [vp(null), vp(), vp(''), vp('    ')];

		results.forEach(function (result) {
			expect(result).to.be.false;
		});
	});

	it('expects validator to return false with password that has incorrect length', function () {
		var badPasswords = ['gg', 'lol', 'js', 'T.T', new Array(16).join('hero' - 3) + ' batman', 'otivamee na kopon, shte se kulchim do sutrintaaaa, zaredeni sus emociyaaaaaaaaaaaaa'];

		badPasswords.forEach(function (name) {
			expect(vp(name)).to.be.false;
		});
	});

	it('expect validator to return true with valid passwords', function () {
		var validUsernames = ['koche', 'Pesh0', 'html5', 'penkA'];

		validUsernames.forEach(function (name) {
			expect(vp(name)).to.be.true;
		});
	});

	it('expects validator to return false for instruments with non-uniq model-brand', function () {
		var instruments = [
			{
				Brand: 'bosh',
				Model: '1'
			},
			{
				Brand: 'justInstrument',
				Model: '2'
			}
		];

		var instr = {
			Brand: 'justInstrument',
			Model: '2'
		};

		expect(validator.hasUniqueBrandModelPair(instr, instruments)).to.be.false;
	});

	it('expects validator to return true for instruments with uniq model-brand', function () {
		var instruments = [
			{
				Brand: 'bosh',
				Model: '1'
			},
			{
				Brand: 'justInstrument',
				Model: '2'
			}
		];

		var instr = {
			Brand: 'justInstrument',
			Model: '1'
		};

		var instr2 = {
			Brand: 'bosh',
			Model: '2'
		};

		expect(validator.hasUniqueBrandModelPair(instr, instruments)).to.be.true;
		expect(validator.hasUniqueBrandModelPair(instr2, instruments)).to.be.true;
	});
});

describe('Login tests', function () {

	it('expects login function to use a GET query to authenticate user', function () {
		sinon.stub($, 'ajax');
		logUser(sinon.spy());
		expect($.ajax.calledWithMatch({
			method: 'GET'
		})).to.be.true;
		
		$.ajax.restore();
	});

});

describe('Registration tests', function () {
	
	it('expects registration to NOT query the db with provided invalid name and password', function () {
		var invalidName = '...';
		var invalidPass = '###';
		
		$('<input>').css('display', 'none').add('username').attr('value', invalidName).appendTo('#mocha');
		$('<input>').css('display', 'none').addClass('password').attr('value', invalidPass).appendTo('#mocha');
		
		sinon.stub($, 'ajax');
		
		regButtonFunction(sinon.spy());
		
		expect($.ajax.calledOnce).to.be.false;
		
		$.ajax.restore();
	});
	// 
	// it('expects registration to NOT query the db with provided invalid name and password', function () {
	// 	var invalidName = 'Domcho';
	// 	var invalidPass = 'Minkov';
	// 	
	// 	$('<input>').css('display', 'none').add('username').attr('value', invalidName).appendTo('#mocha');
	// 	$('<input>').css('display', 'none').addClass('password').attr('value', invalidPass).appendTo('#mocha');
	// 	
	// 	sinon.stub($, 'ajax');
	// 	
	// 	regButtonFunction(sinon.spy());
	// 	
	// 	expect($.ajax.calledWithMatch({type: "GET"})).to.be.true;
	// 	
	// 	$.ajax.restore();
	// });
	
});