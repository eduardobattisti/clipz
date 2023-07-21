import { Injectable } from '@angular/core';

interface IModal {
  id: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modals: IModal[] = [];

  private getModal(id: string): IModal | null {
    return this.modals.find(el => el.id === id) ?? null;
  }

  public register(id: string): void  {
    this.modals.push({
      id,
      visible: false
    });
  }

  public unregister(id: string) {
    this.modals = this.modals.filter(modal => modal.id !== id);
  }

  public isModalOpen(id: string): boolean {
    return Boolean(this.getModal(id)?.visible);
  }

  public toggleModal(id: string): void {
    const modal = this.getModal(id);

    if(modal) {
      modal.visible = !modal.visible;
    }
  }
}
