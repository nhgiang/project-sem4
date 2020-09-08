import { Component, Output, EventEmitter, Input } from '@angular/core'

@Component({
  selector: 'search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {
  @Input() query: string
  @Input() placeholder: string
  @Output() changed = new EventEmitter()

  onKeyUp(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.update()
    }
    if (event.keyCode === 27) {
      this.clear()
    }
  }

  clear() {
    this.query = ''
    this.update()
  }

  private update() {
    this.changed.emit(this.query)
  }

}
