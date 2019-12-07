
export class <%= classify(name) %>VM {
  id: string; // Document ID
  name: string; // Item Name
  isActive: boolean; // Active flag


  /**
   * Add all params with a default value
   * that need to be included in the
   * associated reactive form generated
   * in the corresponding service
   */
  constructor(){
    this.id = null;
    this.name = null;
    this.isActive = true;
  }
}
