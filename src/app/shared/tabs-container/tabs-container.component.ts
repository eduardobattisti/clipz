import { Component, ContentChildren, AfterContentInit, QueryList, Query } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.scss']
})
export class TabsContainerComponent implements AfterContentInit {

  @ContentChildren(TabComponent) tabs?: QueryList<TabComponent>;

  ngAfterContentInit(): void {
    const activeTabs = this.tabs?.filter(tab => tab.active);

    if (!activeTabs?.length) {
      this.selectTab(this.tabs!.first);
    }
  }

  public selectTab(tab: TabComponent) {
    this.tabs?.forEach(tab => {
      tab.active = false;
    })

    tab.active = true;

    return false;
  }

  public getTabClasses(tab: TabComponent) {
    return {
      'hover:text-indigo-400': !tab.active,
      'hover:text-white text-white bg-indigo-400': tab.active
    }
  }
}
