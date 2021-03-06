/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {createLView, createTNode, createTView} from '@angular/core/src/render3/instructions/shared';
import {TNodeType} from '@angular/core/src/render3/interfaces/node';
import {domRendererFactory3} from '@angular/core/src/render3/interfaces/renderer';
import {HEADER_OFFSET, LViewFlags, TVIEW, TViewType} from '@angular/core/src/render3/interfaces/view';
import {enterView, getBindingRoot, getLView, setBindingIndex} from '@angular/core/src/render3/state';



/**
 * Setups a simple `LView` so that it is possible to do unit tests on instructions.
 *
 * ```
 * describe('styling', () => {
 *  beforeEach(enterViewWithOneDiv);
 *  afterEach(leaveView);
 *
 *  it('should ...', () => {
 *     expect(getLView()).toBeDefined();
 *     const div = getNativeByIndex(1, getLView());
 *   });
 * });
 * ```
 */
export function enterViewWithOneDiv() {
  const renderer = domRendererFactory3.createRenderer(null, null);
  const div = renderer.createElement('div');
  const tView =
      createTView(TViewType.Component, -1, emptyTemplate, 1, 10, null, null, null, null, null);
  const tNode = tView.firstChild = createTNode(tView, null !, TNodeType.Element, 0, 'div', null);
  const lView = createLView(
      null, tView, null, LViewFlags.CheckAlways, null, null, domRendererFactory3, renderer, null,
      null);
  lView[0 + HEADER_OFFSET] = div;
  tView.data[0 + HEADER_OFFSET] = tNode;
  enterView(lView, tNode);
}

export function clearFirstUpdatePass() {
  getLView()[TVIEW].firstUpdatePass = false;
}
export function rewindBindingIndex() {
  setBindingIndex(getBindingRoot());
}

function emptyTemplate() {}