<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div ref="dmn"></div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import { open as DmnEditorOpen } from 'DmnEditor';

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  data() {
    return {
      dmn: `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="https://www.omg.org/spec/DMN/20191111/MODEL/" 
xmlns:dmndi="https://www.omg.org/spec/DMN/20191111/DMNDI/" 
xmlns:dc="http://www.omg.org/spec/DMN/20180521/DC/" 
xmlns:di="http://www.omg.org/spec/DMN/20180521/DI/" 
xmlns:camunda="http://camunda.org/schema/1.0/dmn" 
id="definitions_dish" name="DMN 1.3 Diagram" 
namespace="http://camunda.org/schema/1.0/dmn">
  <inputData id="dayType_id" name="Type of day">
    <variable id="dayType_ii" name="Type of day" typeRef="string" />
  </inputData>
  <inputData id="temperature_id" name="Weather in Celsius">
    <variable id="temperature_ii" name="Weather in Celsius" typeRef="integer" />
  </inputData>
  <knowledgeSource id="host_ks" name="Host" />
  <knowledgeSource id="guest_ks" name="Guest Type">
    <authorityRequirement id="AuthorityRequirement_04cnqj5">
      <requiredDecision href="#guestCount" />
    </authorityRequirement>
  </knowledgeSource>
  <businessKnowledgeModel id="elMenu" name="El menú" />
  <decision id="dish-decision" name="Dish Decision">
    <informationRequirement id="InformationRequirement_0tysaih">
      <requiredDecision href="#season" />
    </informationRequirement>
    <informationRequirement id="InformationRequirement_0q2n6w2">
      <requiredDecision href="#guestCount" />
    </informationRequirement>
    <authorityRequirement id="AuthorityRequirement_0gfalay">
      <requiredAuthority href="#host_ks" />
    </authorityRequirement>
    <decisionTable id="dishDecisionTable">
      <input id="seasonInput" label="Season" camunda:inputVariable="seasonInput">
        <inputExpression id="seasonInputExpression" typeRef="string" expressionLanguage="javascript">
          <text>return getSeason();</text>
        </inputExpression>
        <inputValues id="UnaryTests_0twhp5w">
          <text>"Winter","Summer","Spring"</text>
        </inputValues>
      </input>
      <input id="guestCountInput" label="How many guests">
        <inputExpression id="guestCountInputExpression" typeRef="integer">
          <text>guestCount</text>
        </inputExpression>
      </input>
      <output id="output1" label="Dish" name="desiredDish" typeRef="string">
        <outputValues id="UnaryTests_0y5qdnh">
          <text>"Spareribs","Pasta","Light salad","Beans salad","Stew","Steak"</text>
        </outputValues>
      </output>
      <rule id="row-495762709-1">
        <inputEntry id="UnaryTests_1nxcsjr">
          <text>if
  foo
then
  "Winter"
else
  "Summer"</text>
        </inputEntry>
        <inputEntry id="UnaryTests_1r9yorj">
          <text>&lt;= 8</text>
        </inputEntry>
        <outputEntry id="LiteralExpression_1mtwzqz">
          <text>"Spareribs"</text>
        </outputEntry>
      </rule>
      <rule id="row-495762709-2">
        <inputEntry id="UnaryTests_1lxjbif">
          <text>"Winter"</text>
        </inputEntry>
        <inputEntry id="UnaryTests_0nhiedb">
          <text>&gt; 8</text>
        </inputEntry>
        <outputEntry id="LiteralExpression_1h30r12" expressionLanguage="feel">
          <text>"Pasta"</text>
        </outputEntry>
      </rule>
      <rule id="row-495762709-3">
        <description></description>
        <inputEntry id="UnaryTests_0ifgmfm">
          <text>"Summer"</text>
        </inputEntry>
        <inputEntry id="UnaryTests_12cib9m">
          <text>&gt; 10</text>
        </inputEntry>
        <outputEntry id="LiteralExpression_0wgaegy" expressionLanguage="feel">
          <description>Best for the hot season!</description>
          <text>"Light salad"</text>
        </outputEntry>
      </rule>
      <rule id="row-495762709-7">
        <inputEntry id="UnaryTests_0ozm9s7" expressionLanguage="javascript">
          <description>The "YEA" season</description>
          <text>seasonInput.endsWith("YEA")</text>
        </inputEntry>
        <inputEntry id="UnaryTests_0sesgov">
          <text>&lt;= 10</text>
        </inputEntry>
        <outputEntry id="LiteralExpression_1dvc5x3">
          <text>"Beans salad"</text>
        </outputEntry>
      </rule>
      <rule id="row-445981423-3">
        <description></description>
        <inputEntry id="UnaryTests_1er0je1">
          <text>"Spring"</text>
        </inputEntry>
        <inputEntry id="UnaryTests_1uzqner">
          <text>&lt; 10</text>
        </inputEntry>
        <outputEntry id="LiteralExpression_1pxy4g1">
          <text>"Stew"</text>
        </outputEntry>
      </rule>
      <rule id="row-445981423-4">
        <inputEntry id="UnaryTests_06or48g">
          <text>"Spring"</text>
        </inputEntry>
        <inputEntry id="UnaryTests_0wa71sy" expressionLanguage="javascript">
          <description>&lt;= 10</description>
          <text>Math.min(
  cellInput, 10
) == 10</text>
        </inputEntry>
        <outputEntry id="LiteralExpression_09ggol9">
          <text>"Steak"</text>
        </outputEntry>
      </rule>
    </decisionTable>
  </decision>
  <decision id="season" name="Season decision">
    <informationRequirement id="InformationRequirement_1dla552">
      <requiredInput href="#temperature_id" />
    </informationRequirement>
    <decisionTable id="seasonDecisionTable">
      <input id="temperatureInput" label="Weather in Celsius">
        <inputExpression id="temperatureInputExpression" typeRef="integer">
          <text>temperature</text>
        </inputExpression>
      </input>
      <output id="seasonOutput" label="season" name="season" typeRef="string" />
      <rule id="row-495762709-5">
        <inputEntry id="UnaryTests_1fd0eqo">
          <text>&gt;30</text>
        </inputEntry>
        <outputEntry id="LiteralExpression_0l98klb">
          <text>"Summer"</text>
        </outputEntry>
      </rule>
      <rule id="row-495762709-6">
        <inputEntry id="UnaryTests_1nz6at2">
          <text>&lt;10</text>
        </inputEntry>
        <outputEntry id="LiteralExpression_08moy1k">
          <text>"Winter"</text>
        </outputEntry>
      </rule>
      <rule id="row-445981423-2">
        <inputEntry id="UnaryTests_1a0imxy">
          <text>[10..30]</text>
        </inputEntry>
        <outputEntry id="LiteralExpression_1poftw4">
          <text>"Spring"</text>
        </outputEntry>
      </rule>
    </decisionTable>
  </decision>
  <decision id="guestCount" name="Guest Count">
    <informationRequirement id="InformationRequirement_1w1qupa">
      <requiredInput href="#dayType_id" />
    </informationRequirement>
    <knowledgeRequirement id="KnowledgeRequirement_137wcuy">
      <requiredKnowledge href="#elMenu" />
    </knowledgeRequirement>
    <decisionTable id="guestCountDecisionTable">
      <input id="typeOfDayInput" label="Type of day">
        <inputExpression id="typeOfDayInputExpression" typeRef="string">
          <text>dayType</text>
        </inputExpression>
      </input>
      <output id="guestCountOutput" label="Guest count" name="guestCount" typeRef="integer" />
      <rule id="row-495762709-8">
        <inputEntry id="UnaryTests_0l72u8n">
          <text>"Weekday"</text>
        </inputEntry>
        <outputEntry id="LiteralExpression_0wuwqaz">
          <text>4</text>
        </outputEntry>
      </rule>
      <rule id="row-495762709-9">
        <inputEntry id="UnaryTests_03a73o9">
          <text>"Holiday"</text>
        </inputEntry>
        <outputEntry id="LiteralExpression_1whn119">
          <text>10</text>
        </outputEntry>
      </rule>
      <rule id="row-495762709-10">
        <inputEntry id="UnaryTests_12tygwt">
          <text>"Weekend"</text>
        </inputEntry>
        <outputEntry id="LiteralExpression_1b5k9t8">
          <text>15</text>
        </outputEntry>
      </rule>
    </decisionTable>
  </decision>
  <decision id="Decision_1koag35" name="It&#39;s lit">
    <variable id="InformationItem_10cg57g" name="itsLit" typeRef="string" />
    <literalExpression id="LiteralExpression_0bhgyiw" expressionLanguage="javascript">
      <text>return "It's lit!";</text>
    </literalExpression>
  </decision>
  <textAnnotation id="TextAnnotation_1t4zaz9">
    <text>foobar</text>
  </textAnnotation>
  <association id="Association_1c4jixb">
    <sourceRef href="#dayType_id" />
    <targetRef href="#TextAnnotation_1t4zaz9" />
  </association>
  <dmndi:DMNDI>
    <dmndi:DMNDiagram>
      <dmndi:DMNShape dmnElementRef="dayType_id">
        <dc:Bounds height="45" width="125" x="240" y="270" />
      </dmndi:DMNShape>
      <dmndi:DMNShape dmnElementRef="temperature_id">
        <dc:Bounds height="45" width="125" x="5" y="270" />
      </dmndi:DMNShape>
      <dmndi:DMNShape dmnElementRef="host_ks">
        <dc:Bounds height="63" width="100" x="493" y="4" />
      </dmndi:DMNShape>
      <dmndi:DMNShape dmnElementRef="guest_ks">
        <dc:Bounds height="63" width="100" x="495" y="147" />
      </dmndi:DMNShape>
      <dmndi:DMNEdge dmnElementRef="AuthorityRequirement_04cnqj5">
        <di:waypoint x="410" y="172" />
        <di:waypoint x="495" y="172" />
      </dmndi:DMNEdge>
      <dmndi:DMNShape dmnElementRef="elMenu">
        <dc:Bounds height="46" width="135" x="450" y="250" />
      </dmndi:DMNShape>
      <dmndi:DMNShape dmnElementRef="dish-decision">
        <dc:Bounds height="80" width="180" x="140" y="5" />
      </dmndi:DMNShape>
      <dmndi:DMNEdge dmnElementRef="InformationRequirement_0tysaih">
        <di:waypoint x="80" y="132" />
        <di:waypoint x="140" y="81" />
      </dmndi:DMNEdge>
      <dmndi:DMNEdge dmnElementRef="InformationRequirement_0q2n6w2">
        <di:waypoint x="345" y="138" />
        <di:waypoint x="257" y="85" />
      </dmndi:DMNEdge>
      <dmndi:DMNEdge dmnElementRef="AuthorityRequirement_0gfalay">
        <di:waypoint x="493" y="24" />
        <di:waypoint x="320" y="25" />
      </dmndi:DMNEdge>
      <dmndi:DMNShape dmnElementRef="season">
        <dc:Bounds height="80" width="180" x="10" y="132" />
      </dmndi:DMNShape>
      <dmndi:DMNEdge dmnElementRef="InformationRequirement_1dla552">
        <di:waypoint x="80" y="270" />
        <di:waypoint x="80" y="212" />
      </dmndi:DMNEdge>
      <dmndi:DMNShape dmnElementRef="guestCount">
        <dc:Bounds height="80" width="180" x="230" y="138" />
      </dmndi:DMNShape>
      <dmndi:DMNEdge dmnElementRef="InformationRequirement_1w1qupa">
        <di:waypoint x="340" y="270" />
        <di:waypoint x="340" y="218" />
      </dmndi:DMNEdge>
      <dmndi:DMNEdge dmnElementRef="KnowledgeRequirement_137wcuy">
        <di:waypoint x="450" y="275" />
        <di:waypoint x="410" y="209" />
      </dmndi:DMNEdge>
      <dmndi:DMNShape dmnElementRef="Decision_1koag35">
        <dc:Bounds height="80" width="180" x="670" y="141" />
      </dmndi:DMNShape>
      <dmndi:DMNShape dmnElementRef="TextAnnotation_1t4zaz9">
        <dc:Bounds height="45" width="125" x="240" y="400" />
      </dmndi:DMNShape>
      <dmndi:DMNEdge dmnElementRef="Association_1c4jixb">
        <di:waypoint x="275" y="315" />
        <di:waypoint x="240" y="400" />
      </dmndi:DMNEdge>
    </dmndi:DMNDiagram>
  </dmndi:DMNDI>
</definitions>
`
    }
  },
  mounted() {
    console.info('DmnEditor', DmnEditorOpen);
    console.info('dmn.Editor', window.DmnEditor?.Editor);
    this.dmnEditor = DmnEditorOpen({
        container: this.$refs.dmn,
        initialContent: Promise.resolve(this.dmn || ''),
        readOnly: false,
        // resources: new Map([
        //   [
        //     'data-sum.dmn',
        //     {
        //       contentType: 'text',
        //       content: Promise.resolve('')
        //     }
        //   ]
        // ])
      })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
