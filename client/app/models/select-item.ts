export class SelectItem {
  text: string;
  selected: boolean = false;
  constructor(l?: string) {
    this.text = l;
  }
}
