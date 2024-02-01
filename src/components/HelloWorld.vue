<template>
  <section class="bpmn-edit">
    <div ref="bpmn" class="card_bpmn__container"></div>
    <div
      ref="propertiesContainer"
      id="propertiesPanel"
      style="
        position: absolute;
        top: 100px;
        right: 0;
        width: 300px;
        height: 500px;
      "
    ></div>
    <!-- <properties
      v-if="showAttr"
      ref="property"
      :error-note="errorNote"
      :msg="businessObject"
      :c-name="cNameIn"
      :type="selectType"
      :result-vars="resultVars"
      :model-list="modelList"
      :rule-list="ruleList"
      :weight-rule-list="weightRuleList"
      :exp-list="expList"
      :sub-process-list="subProcessList"
      :rule-type-enum="ruleTypeEnum"
      @change="change"
      :viewer="bpmnViewer"
    /> -->
  </section>
</template>
<script>
// import BpmnModeler from 'bpmn-js/lib/Modeler'
import DmnModeler from "dmn-js/lib/Modeler";

// import 'bpmn-js/dist/assets/diagram-js.css'
// import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
// import 'diagram-js-minimap/assets/diagram-js-minimap.css'

import "dmn-js/dist/assets/dmn-font/css/dmn.css";
import "dmn-js/dist/assets/diagram-js.css";
import "dmn-js/dist/assets/dmn-js-shared.css";
import "dmn-js/dist/assets/dmn-js-drd.css";
import "dmn-js/dist/assets/dmn-js-decision-table.css";
import "dmn-js/dist/assets/dmn-js-decision-table-controls.css";
import "dmn-js/dist/assets/dmn-js-literal-expression.css";

// import propertiesPanelModule from 'dmn-js-properties-panel'
// import propertiesProviderModule from "dmn-js-properties-panel/lib/provider/camunda";
// import drdAdapterModule from "dmn-js-properties-panel/lib/adapter/drd";
import "dmn-js-properties-panel/dist/assets/properties-panel.css";

// import Properties from './Properties'
import {
  DmnPropertiesPanelModule,
  DmnPropertiesProviderModule,
} from "dmn-js-properties-panel";
// import { customDmnPropertiesProviderModule } from "./customProperties";

import { migrateDiagram } from "@bpmn-io/dmn-migrate";

export default {
  props: {
    // bpmn: {
    //   type: String,
    //   required: true
    // },
    // assetName: {
    //   type: String,
    //   required: true
    // },
    // cName: {
    //   type: String,
    //   required: true
    // },
    // artifactId: {
    //   type: String,
    //   required: true
    // },
    // nodeErrors: {
    //   type: Object,
    //   require: true
    // },
    // resultVars: {
    //   type: Array
    // }
  },
  components: {
    // Properties
  },
  data() {
    return {
      dmnModeler: null,
      scale: 0,
      showAttr: false,
    };
  },
  computed: {},
  watch: {
    // dmnModeler: {
    //   deep: true,
    //   handler(newModeler) {
    //     // 获取当前的DMN模型
    //     const modeling = newModeler.getActiveViewer().get('modeling')
    //     const elementRegistry = newModeler.getActiveViewer().get('elementRegistry')
    //     // 监听属性面板的变化
    //     modeling.on('selection.changed', (event) => {
    //       const selectedElement = event.newSelection[0]
    //       const propertiesPanel = document.getElementById('properties')
    //       // 清空属性面板内容
    //       propertiesPanel.innerHTML = ''
    //       if (selectedElement) {
    //         const propertiesElement = elementRegistry.get(selectedElement.id)
    //         const definition = propertiesElement.businessObject.definition
    //         // 在属性面板中显示相关信息
    //         // ...
    //         console.info('definition', definition)
    //       }
    //     })
    //   }
    // }
  },
  mounted() {
    this.initBpmn();
  },
  methods: {
    // zoom(action) {
    //   if (action === 'reset') {
    //     this.bpmnViewer.get('canvas').zoom('fit-viewport')
    //     return
    //   }
    //   if (action === 'zoom-in')  {
    //     this.scale += 0.3
    //   } else if (this.scale > 0.3) {
    //     this.scale -= 0.3
    //   } else {
    //     return
    //   }
    //   this.bpmnViewer.get('canvas').zoom(this.scale)
    // },
    async initBpmn() {
      // this.bpmnViewer = new BpmnModeler({
      //   container: this.$refs.bpmn,
      //   height: Math.max(360, document.body.clientHeight),
      //   moddleExtensions: {
      //     drools: droolsExtension
      //   },
      //   keyboard: {
      //     bindTo: window
      //   },
      //   additionalModules: [customElement, commonWorkDrawModule, minimapModule]
      // })
      // this.bpmnViewer.get('minimap').open()
      // this.bpmnViewer.get('canvas').zoom('fit-viewport')
      // const xmlData = this.bpmn ? this.bpmn : initProcess(this.artifactId, this.assetName)
      // await this.bpmnViewer.importXML(xmlData)
      // this.modeling = this.bpmnViewer.get('modeling')
      // this.setClickAction() // 监听点击元素的事件
      // this.setChangeLink() // 设置下载链接
      // this.setKeyboardEvent() // 监听Command+Z 事件
      // this.setInitColor(xmlData)
      // this.scale = 1
      // this.cNameIn = this.cName

      this.dmnModeler = new DmnModeler({
        container: this.$refs.bpmn,
        height: Math.max(360, document.body.clientHeight),
        width: "100%",
        keyboard: {
          bindTo: this.$refs.bpmn,
        },
        // additionalModules: [
        //   // 将右侧面板添加为额外的模块
        //   propertiesPanelModule
        // ],
        // propertiesPanel: {
        //   parent: '#propertiesPanel'
        // }
        drd: {
          propertiesPanel: {
            parent: "#propertiesPanel",
          },
          additionalModules: [
            DmnPropertiesPanelModule,
            DmnPropertiesProviderModule
          ],
        },
      });

      // 获取右侧属性面板容器，并将其绑定到编辑器
      // const propertiesPanel = this.dmnModeler.get('propertiesPanel')
      // const propertiesContainer = this.$refs.propertiesContainer
      // propertiesPanel.attachTo(propertiesContainer)

      this.scale = 1;
      // const CLASS_NAMES = {
      //   drd: 'dmn-icon-lasso-tool',
      //   decisionTable: 'dmn-icon-decision-table',
      //   literalExpression: 'dmn-icon-literal-expression'
      // }
      // this.dmnModeler.attachTo('.card_bpmn__container')
      await this.openDmnDiagram(`<?xml version="1.0" encoding="UTF-8"?>
<dmn:definitions xmlns:dmn="http://www.omg.org/spec/DMN/20180521/MODEL/" xmlns="https://github.com/kiegroup/kie-dmn" xmlns:dc="http://www.omg.org/spec/DMN/20180521/DC/" xmlns:di="http://www.omg.org/spec/DMN/20180521/DI/" xmlns:dmndi="http://www.omg.org/spec/DMN/20180521/DMNDI/" xmlns:feel="http://www.omg.org/spec/DMN/20180521/FEEL/" xmlns:kie="http://www.drools.org/kie/dmn/1.2" id="_0001-input-data-string" name="data-sum" typeLanguage="http://www.omg.org/spec/DMN/20180521/FEEL/" namespace="com.xiaomi.mifi">
  <dmn:extensionElements/>
  <dmn:decision id="d_GreetingMessage" name="r">
    <dmn:extensionElements/>
    <dmn:variable id="_F0DFCB5B-891B-4A44-B6CC-B8D4D98404DF" name="r" typeRef="number"/>
    <dmn:informationRequirement id="_2DB354D9-8292-4AC9-BB1E-8FF8D68C66CA">
      <dmn:requiredInput href="#i_FirstName"/>
    </dmn:informationRequirement>
    <dmn:informationRequirement id="_8AAFC3BC-4945-466A-92D2-7940B3C49758">
      <dmn:requiredInput href="#i_LastName"/>
    </dmn:informationRequirement>
    <dmn:literalExpression id="_DC628FA6-37EF-47E9-A8F2-20BDBCED720B">
      <dmn:text>x + y</dmn:text>
    </dmn:literalExpression>
  </dmn:decision>
  <dmn:inputData id="i_FirstName" name="x">
    <dmn:extensionElements/>
    <dmn:variable id="_F60DDD18-E7C3-44C8-B58B-3F3F202D34D0" name="x" typeRef="number"/>
  </dmn:inputData>
  <dmn:inputData id="i_LastName" name="y">
    <dmn:extensionElements/>
    <dmn:variable id="_BFA917BD-4AF8-4AEB-88F5-C74BC0C3F246" name="y" typeRef="number"/>
  </dmn:inputData>
  <dmndi:DMNDI>
    <dmndi:DMNDiagram id="_09AE9FE9-3FA4-4EFD-B95F-B9450F14EED3" name="DRG">
      <di:extension>
        <kie:ComponentsWidthsExtension>
          <kie:ComponentWidths dmnElementRef="_DC628FA6-37EF-47E9-A8F2-20BDBCED720B">
            <kie:width>190</kie:width>
          </kie:ComponentWidths>
        </kie:ComponentsWidthsExtension>
      </di:extension>
      <dmndi:DMNShape id="dmnshape-drg-d_GreetingMessage" dmnElementRef="d_GreetingMessage" isCollapsed="false">
        <dmndi:DMNStyle>
          <dmndi:FillColor red="255" green="255" blue="255"/>
          <dmndi:StrokeColor red="0" green="0" blue="0"/>
          <dmndi:FontColor red="0" green="0" blue="0"/>
        </dmndi:DMNStyle>
        <dc:Bounds x="137" y="50" width="100" height="50"/>
        <dmndi:DMNLabel/>
      </dmndi:DMNShape>
      <dmndi:DMNShape id="dmnshape-drg-i_FirstName" dmnElementRef="i_FirstName" isCollapsed="false">
        <dmndi:DMNStyle>
          <dmndi:FillColor red="255" green="255" blue="255"/>
          <dmndi:StrokeColor red="0" green="0" blue="0"/>
          <dmndi:FontColor red="0" green="0" blue="0"/>
        </dmndi:DMNStyle>
        <dc:Bounds x="50" y="225" width="100" height="50"/>
        <dmndi:DMNLabel/>
      </dmndi:DMNShape>
      <dmndi:DMNShape id="dmnshape-drg-i_LastName" dmnElementRef="i_LastName" isCollapsed="false">
        <dmndi:DMNStyle>
          <dmndi:FillColor red="255" green="255" blue="255"/>
          <dmndi:StrokeColor red="0" green="0" blue="0"/>
          <dmndi:FontColor red="0" green="0" blue="0"/>
        </dmndi:DMNStyle>
        <dc:Bounds x="225" y="225" width="100" height="50"/>
        <dmndi:DMNLabel/>
      </dmndi:DMNShape>
      <dmndi:DMNEdge id="dmnedge-drg-_2DB354D9-8292-4AC9-BB1E-8FF8D68C66CA" dmnElementRef="_2DB354D9-8292-4AC9-BB1E-8FF8D68C66CA">
        <di:waypoint x="100" y="250"/>
        <di:waypoint x="187" y="75"/>
      </dmndi:DMNEdge>
      <dmndi:DMNEdge id="dmnedge-drg-_8AAFC3BC-4945-466A-92D2-7940B3C49758" dmnElementRef="_8AAFC3BC-4945-466A-92D2-7940B3C49758">
        <di:waypoint x="275" y="250"/>
        <di:waypoint x="187" y="75"/>
      </dmndi:DMNEdge>
    </dmndi:DMNDiagram>
  </dmndi:DMNDI>
</dmn:definitions>`);
    },
    async openDmnDiagram(dmnXML) {
      try {
        const xml = await migrateDiagram(dmnXML);
        const { warnings } = await this.dmnModeler.importXML(xml);

        if (warnings.length) {
          console.log("import with warnings", warnings);
        } else {
          console.log("import successful");
        }

        // fetch currently active vie
        const activeEditor = this.dmnModeler.getActiveViewer();

        const canvas = activeEditor.get("canvas");

        // zoom to fit full viewport
        canvas.zoom("fit-viewport");
      } catch (err) {
        console.error("could not import DMN 1.3 diagram", err);
      }
    },
    //   async openDmnView(viewIdx) {
    //       const view = this.dmnModeler.getViews()[viewIdx]
    //       try {
    //           await this.dmnModeler.open(view)
    //       } catch (err) {
    //           console.error('error opening tab', err)
    //       }
    //   }
  },
};
</script>
