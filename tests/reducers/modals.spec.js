import * as types from '../../app/actions/types';
import reducer from '../../app/reducers/modals';


describe('Reducers', () => {
    it('should add a modal object to array', () => {
        expect(
            reducer([], {
                type: types.OPEN_MODAL,
                modalId: 'modalId',
                data: {
                    test: 'test'
                }
            })
        ).toEqual(
            [{
                modalId: 'modalId', data: { test: 'test' }
            }]
        );
    });

    it('should remove a modal object to array', () => {
        const state =
        [{
            modalId: 'modalId',
            data: {
                test: 'test'
            }
        }];

        expect(
            reducer(state, {type: types.CLOSE_MODAL, modalId: 'modalId'})
        ).toEqual([]);
    });

    it('should remove the proper modal from the array', () => {
        const state =
        [{
            modalId: 'modalId',
            data: {}
        }, {
            modalId: 'modalId2',
            data: {}
        }];

        const expected =
        [{
            modalId: 'modalId2',
            data: {}
        }];


        expect(
            reducer(state, {type: types.CLOSE_MODAL, modalId: 'modalId'})
        ).toEqual(expected);
    });
});
