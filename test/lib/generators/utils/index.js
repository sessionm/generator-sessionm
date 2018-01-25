import {
  TechnologySelectionGenerator,
  FileConfirmationGenerator,
} from  "../../../../lib/generators/utils";

describe("Utils", function() {
  describe("TechnologySelectionGenerator", function() {
    let generator;

    before(function(done) {
      generator = sinon.createStubInstance(TechnologySelectionGenerator);

      generator.constructor.config = {};
      generator.constructor.config.items = [ sinon.stub() ];
      generator.constructor.config.slug = sinon.stub();
      generator.constructor.questions.get = [ sinon.stub() ];

      done()
    })

    describe("_generateItem", function() {
      let item;

      before(function(done) {
        generator._generateItem.restore()

        item = generator.constructor.config.items[0];
        generator.constructor.resolve = sinon.stub()
          .withArgs(`../${ item }`, { item })
          .returns(sinon.stub());

        done()
      })

      it("calls ._generateItem with the correct args", function(done) {
        generator._generateItem(item);

        expect(generator.composeWith).to.be.calledWith(
          generator.constructor.resolve())
        done()
      })

      context("when exception is thrown", function() {
        before(function(done) {
          generator.composeWith = sinon.stub().throws();
          generator.log = sinon.stub();
          done()
        })

        it("returns undefined", function(done) {
          expect(generator._generateItem(item)).to.be.undefined;
          done()
        })

        it("calls log", function(done) {
          generator._generateItem(item)

          expect(generator.log).to.be.called
          done()
        })
      })

      context("when exception is not thrown", function() {
        let composeWithStub;

        before(function(done) {
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

    describe("prompting", function() {
      let answers;
      let slug;

      before(function(done) {
        generator.__proto__._generateItem = sinon.stub();
        answers = {};
        slug = generator.constructor.config.slug;
        answers[slug] = sinon.stub();

        generator.__proto__.prompt = sinon.stub();
        generator.__proto__.prompt.resolves(answers);
        done()
      })

      it("calls .prompt with the correct args", function(done) {
        generator.__proto__.prompting.then(function(r){
          expect(generator.__proto__.prompt).to.be.calledWith(
            generator.constructor.questions)
          done()
        })
      })

      context("when .prompt promise resolves", function() {
        it("calls ._generateItem with the correct args", function(done) {
          generator.__proto__.prompting.then(function(){
            expect(generator._generateItem).to.be.calledWith(answers[slug])
            done()
          })
        })
      })
    })
  })

  describe("FileConfirmationGenerator", function() {
    let generator;

    before(function(done){
      generator = sinon.createStubInstance(FileConfirmationGenerator);

      generator.constructor.config = {};
      generator.constructor.config.items = [ sinon.stub() ];
      generator.constructor.config.slug = sinon.stub();
      generator.constructor.questions.get = [ sinon.stub() ];

      done()
    })

     describe("prompting", function() {
       before(function(done){
         generator.__proto__.prompt = sinon.stub().resolves();
         done()
       })

       it("calls .prompt with the correct args", function(done) {
         generator.__proto__.prompting

         expect(generator.__proto__.prompt).to.be.calledWith(
           generator.constructor.questions)
         done()
      })

     })
  })
})

