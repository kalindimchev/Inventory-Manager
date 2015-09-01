var expect = chai.expect;

describe('Templates', function () {
	it('expects templates to exist', function() {
		expect(templates).to.exist;
	});
	
	it('expects templates to have a getter', function () {
		expect(templates.get).to.not.equal(undefined);
	})
});