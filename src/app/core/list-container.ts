import { OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router'
import { Observable, merge, Subject } from 'rxjs'
import { tap, switchMap } from 'rxjs/operators'
import { omitBy } from 'lodash'
import { isUndefined } from 'util';
import { Activity } from 'untils/activity';
import { QueryResult } from 'types/model';

export abstract class ListContainer<T> implements OnInit {
  items: T[]
  refreshTrigger$ = new Subject()
  page: number
  sort: string
  query: string
  params: { [key: string]: any } = {}
  activity = new Activity()
  total: number

  get currentParams() {
    return this.route.snapshot.params
  }

  constructor(
    protected route: ActivatedRoute,
    protected router: Router,
    public quantity: number = 10
  ) {

  }

  ngOnInit() {
    this.subscribe()
  }

  protected abstract fetch(): Observable<T>

  onPageChanged(pageNumber: string) {
    this.navigate({ ...this.currentParams, page: pageNumber })
  }

  onQuantityChanged(quantity: number) {
    this.navigate({ ...this.currentParams, page: 1, quantity: quantity })
  }

  onQueryChange(query: string) {
    this.navigate({ ...this.currentParams, page: 1, query: query })
  }

  onSorted(sort: string) {
    this.navigate({ ...this.currentParams, page: 1, sort: sort })
  }

  refresh() {
    this.refreshTrigger$.next(this.route.snapshot.params)
  }

  getSort() {
    return this.sort
  }

  subscribe() {
    const next = (res) => {
      this.activity.stop('loading')
      this.handleResult(res)
    }

    const error = reason => {
      this.activity.stop('loading')
      this.handleError(reason)
    }

    merge(this.refreshTrigger$, this.route.params).pipe(
      tap(this.readRouteParams.bind(this)),
      switchMap(() => {
        this.activity.start('loading')
        return this.fetch()
      })
    ).subscribe(next, error)
  }

  readRouteParams(params: { [key: string]: any }) {
    const { page, quantity, sort, query } = params
    this.page = +page || 1
    this.quantity = +quantity || this.quantity
    this.sort = sort
    this.query = query
    const pasedParams = {}

    for (const key in params) {
      try {
        pasedParams[key] = JSON.parse(params[key])
      } catch (e) {
        pasedParams[key] = params[key]
      }
    }
    this.params = pasedParams
  }

  navigate(params: Params) {
    params = omitBy(Object.assign({}, params), isUndefined)
    this.router.navigate([params], { relativeTo: this.route })
  }

  mergeParams(params: Params) {
    this.page = params.page || 1
    this.quantity = params.quantity || this.quantity
    this.params = Object.assign({}, this.params, params)
  }

  protected handleResult(result: QueryResult<T>) {
    this.total = result.total
    this.items = result.items
  }

  protected abstract handleError(reason: any)
}