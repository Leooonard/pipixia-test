import {
    saveRiderList,
    loadRiderList
} from '../src/store.js';

import chai from 'chai';
import sinon from 'sinon';

let expect = chai.expect;

describe('store.js', function () {
    describe('saveRiderList', function () {
        it('should return true when save riderList successfully', function () {
            const RIDER_LIST = [
                {
                    name: '皮皮虾',
                    status: 1,
                    statusText: '背影逐渐消失了'
                }
            ];

            let saveResult = saveRiderList(RIDER_LIST);
            expect(saveResult).to.be.true;
        });

        it('should return false when save riderList failed', function () {
            const RIDER_LIST = [
                {
                    name: '皮皮虾',
                    status: 1,
                    statusText: '背影逐渐消失了'
                }
            ];

            let originLocalStorage = window.localStorage;
            Object.defineProperty(window, 'localStorage', {
                configurable: true,
                enumerable: true,
                value: originLocalStorage,
                writable: true
            });
            window.localStorage = {
                setItem: sinon.stub.throws(),
                getItem: originLocalStorage.getItem
            };

            let saveResult = saveRiderList(RIDER_LIST);
            expect(saveResult).to.be.false;

            window.localStorage = originLocalStorage;
        });
    });

    describe('loadRiderList', function () {
        it('should return riderList when loadRiderList', function () {
            saveRiderList([
                {
                    name: '皮皮虾',
                    status: 1,
                    statusText: '背影逐渐消失了'
                }
            ]);

            let riderList = loadRiderList();
            expect(riderList).to.eql([
                {
                    name: '皮皮虾',
                    status: 1,
                    statusText: '背影逐渐消失了'
                }
            ]);

            saveRiderList(null);
        });

        it('should return undefined when nothing in store', function () {
            saveRiderList(null);

            let riderList = loadRiderList();
            expect(riderList).to.equal(null);
        });
    })
});
