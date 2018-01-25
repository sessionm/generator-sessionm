import AppGenerator from "../../../../lib/generators/app";

describe("AppGenerator", function() {
  let generator;

  before(function(done){
    generator = sinon.createStubInstance(AppGenerator);
    generator.constructor.technologyStack = [ sinon.stub() ];

    done()
  })

  describe("_generateItem", function() {
    let item;
    let composeWithStub;

    before(function(done){
      generator._generateItem.restore()

      item = generator.constructor.technologyStack[0];
      generator.constructor.resolve = sinon.stub()
        .withArgs(`../${ item }`)
        .returns(sinon.stub());

      composeWithStub = sinon.stub();
      generator.composeWith = sinon.stub().returns(composeWithStub);

      done()
    })

    it("calls .composeWith with the correct args", function(done) {
      generator._generateItem(item);

      expect(generator.composeWith).to.be.calledWith(
        generator.constructor.resolve())
      done()
    })

    it("returns the correct value", function(done) {
      expect(generator._generateItem(item)).to.equal(composeWithStub);
      done()
    })
  })

  describe("_generateAll", function(){
    before(function(done){
      generator._generateAll.restore()

      generator._generateItem = sinon.stub();
      done()
    })

    it("calls ._generateItem with the correct args", function(done){
      generator._generateAll(generator.constructor.technologyStack);

      generator.constructor.technologyStack.map(function(item){
        expect(generator._generateItem).to.be.calledWith(item)
      })
      done()
    })
  })

  describe("initializing", function(){
    before(function(done){
      generator.__proto__._generateAll = sinon.stub();
      done()
    })

    it("calls _generateAll with the correct args", function(done){
      generator.__proto__.initializing

      expect(generator._generateAll).to.be.calledWith(
        generator.constructor.technologyStack)
      done()
    })
  })
})
