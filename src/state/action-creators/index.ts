import { ActionType } from '../action-types';
import { Action } from '../actions';

export const addBoard = (): Action => ({
  type: ActionType.ADD_BOARD,
});

export const addPostIt = (positions: number[]): Action => ({
  type: ActionType.ADD_POST_IT,
  payload: positions,
});

export const selectBoard = (id: number): Action => ({
  type: ActionType.SELECT_BOARD,
  payload: id,
});
