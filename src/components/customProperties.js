import { DmnPropertiesProviderModule, DmnPropertiesPanelModule } from 'dmn-js-properties-panel';

const DmnPropertiesPanelRenderer = DmnPropertiesPanelModule.propertiesPanel[1];

class CustomDmnPropertiesProvider extends DmnPropertiesProvider {
  constructor(eventBus, modeling, commandStack) {
    super(eventBus, modeling, commandStack);
  }

  /**
   * 扩展你想要自定义的属性面板的函数
   */
  getTabs(element) {
    const generalTab = super.getTabs(element);

    // 在属性面板的通用标签上找到 Name 属性
    const nameEntry = generalTab.find(tab => tab.id === 'general-name');

    if (nameEntry) {
      // 修改 Name 属性的标签名称
      nameEntry.label = '决策名';
    }

    return generalTab;
  }
}

CustomDmnPropertiesProvider.$inject = ['eventBus', 'modeling', 'commandStack'];


export const customDmnPropertiesProviderModule = {
  __init__: ['customDmnPropertiesProvider'],
  customDmnPropertiesProvider: ['type', CustomDmnPropertiesProvider],
};