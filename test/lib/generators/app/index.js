import AppGenerator from "../../../../lib/generators/app";


describe("AppGenerator", function(){
  let generator;

  before(function(done){
    generator = sinon.createStubInstance(AppGenerator);
    generator.constructor.technologyStack = [ sinon.stub() ];

    done()
  })

  describe("_generateItem", function(){
    let item;

    before(function(done){
      generator._generateItem.restore()
      item = generator.constructor.technologyStack[0];
      generator.constructor.resolve = sinon.stub()
        .withArgs(`../${item}`)
        .returns(sinon.stub());

      done()
    })
    
    it("calls .composeWith with the correct args", function(done){
      generator._generateItem(item);

      expect(generator.composeWith).to.be.calledWith(generator.constructor.resolve())
      done()
    })

    context("when exception is raised", function(){
      before(function(done) {
	generator.composeWith = sinon.stub().throws();
	done()
      })
      it("returns nil", function(done) {
	expect(generator._generateItem(item)).to.be.undefined;
      	done()
      })
    })

    context("when exception is not raised", function(){
      let composeWithStub;

      before(function(done){
	composeWithStub = sinon.stub();
	generator.composeWith = sinon.stub().returns(composeWithStub);
        done()
      })

      it("returns the correct value", function(done) {
	expect(generator._generateItem(item)).to.equal(composeWithStub);
      	done()
      })
    })
  })

  describe("_generateAll", function(){
    before(function(done){
      generator._generateAll.restore()
      generator._generateItem = sinon.stub()

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
      generator.initializing.restore()

      generator._generateAll = sinon.stub();

      done()
    })

    it("calls _generateAll with the correct args", function(done){
      generator.initializing()

      expect(generator._generateAll).to.be.calledWith(generator.constructor.technologyStack)
      done()
    })
  })
})
