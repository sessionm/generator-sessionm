import chai from 'chai';
import faker from 'faker';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

global.expect = chai.expect;
global.faker = faker;
global.sinon = sinon;
