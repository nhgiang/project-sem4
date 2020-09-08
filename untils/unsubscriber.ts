import { ɵComponentDef, ɵComponentType } from '@angular/core'
import { Subject } from 'rxjs'

// TODO: move models to their own file.

// We need this interface override the readonly keyword
// on the properties that we want to re-assign.
export interface ComponentDef<T> extends ɵComponentDef<T> {
  factory: FactoryFn<T>
  onDestroy: (() => void) | null
}

// tslint:disable-next-line interface-over-type-literal
export type FactoryFn<T> = {
  <U extends T>(t: ComponentType<U>): U;
  (t?: undefined): T;
}

export type ComponentType<T> = ɵComponentType<T>

/**
 * Class decorator to automatically unsubscribe in component classes on Angular 9 with Ivy.
 *
 * @example
 * ```ts
 * @Unsubscriber()
 * @Component({})
 * export class MyContainerComponent {
 *   ngOnInit(): void {
 *    this.observable$.pipe(takeUntil((this as any).destroyed$)).subscribe();
 *   }
 *
 *   ngOnDestroy(): void {
 *    // Optionally we can do anything we want here.
 *   }
 * }
 * ```
 *
 * Only 1 condition: we need to access `this.destroyed$` as `(this as any).destroyed$`.
 * `ngOnDestroy(): void {}` does not have to be present in the component class! :)
 */
export function Unsubscriber(): any {
  return (cmpType: ComponentType<any>) => {
    const cmp: ComponentDef<typeof cmpType> = getComponentProp(cmpType, 'ɵcmp')
    const cmpOndestroy: (() => void) | null = cmp.onDestroy
    cmpType.prototype.destroyed$ = new Subject<void>()
    // This cannot be an arrow function
    // So that we get the correct context of `this`.
    cmp.onDestroy = function() {
      (this as any).destroyed$.next()
      /**
       * Normally you would pass the method arguments to the function:
       * ```ts
       * cmpOndestroy.apply(this, arguments);
       * ```
       * But ngOnDestroy() does not take any arguments.
       */
      if (cmpOndestroy !== null) {
        cmpOndestroy.apply(this)
      }
    }
  }
}

// TODO: move utils to their own file.

export function getComponentProp<T, K extends keyof T>(t: ComponentType<T>, key: string): T[K] {
  if (t.hasOwnProperty(key)) {
    return t[key]
  }

  throw new Error('No Angular property found for ' + t.name)
}