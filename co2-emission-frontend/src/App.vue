<template>
    <el-container class="full_height">
      <el-header class="header">
        <HeaderImage :alignment=alignment />
        <HeaderBar 
          @goto="goto" 
          @reload="reload"
          :alignment=alignment
          />
      </el-header>
      <el-main class="content height_100">
          <EmissionTable v-if="this.currentPage=='main'"
          class="padding_r"
          :json_data=emissions 
          :filter_unternehmen=filter_unternehmen 
          :filter_land=filter_land />

          <InfoContent v-if="this.currentPage=='info'" 
          class="padding_r"/>    
          
          <ImpressumContent v-if="this.currentPage=='impressum'" class="padding_r"/>

          <DatenschutzContent v-if="this.currentPage=='datenschutz'" class="padding_r"/>
      </el-main>
      <el-footer class="footer">
        <Footer  @goto="goto"/>
      </el-footer>
    </el-container>
</template>


<script>
import EmissionTable from "./components/EmissionTable";
import HeaderImage from "./components/HeaderImage";
import HeaderBar from './components/HeaderBar';
import InfoContent from "./components/InfoContent";
import Footer from "./components/Footer";
import ImpressumContent from './components/ImpressumContent';
import DatenschutzContent from './components/DatenschutzContent';


export default {
  name: 'App',
  components: {
    EmissionTable,
    HeaderImage,
    HeaderBar,
    InfoContent,
    Footer,
    ImpressumContent,
    DatenschutzContent
},
  data: () => ({
    currentPage: "main",
    //Test-Dummys, Backend kommt später
    emissions: [
      {id: "1", unternehmen: "MusterA", land: "China", wert: 45.002},
      {id: "2", unternehmen: "MusterB", land: "China", wert: 1134.002},
      {id: "3", unternehmen: "MusterC", land: "Amerika", wert: 415.002},
      {id: "4", unternehmen: "MusterD", land: "Amerika", wert: 314.002},
      {id: "5", unternehmen: "MusterB", land: "Deutschland", wert: 31.002},
      {id: "6", unternehmen: "MusterC", land: "Deutschland", wert: 143.002},
      {id: "7", unternehmen: "MusterD", land: "Hawaii", wert: 12.002}
    ],
    filter_unternehmen: [
      {text: "MusterA", value: "MusterA"},
      {text: "MusterB", value: "MusterB"},
      {text: "MusterC", value: "MusterC"},
      {text: "MusterD", value: "MusterD"},
    ],
    filter_land: [
      {text: "China", value: "China"},
      {text: "Amerika", value: "Amerika"},
      {text: "Deutschland", value: "Deutschland"},
      {text: "Hawaii", value: "Hawaii"},
    ],
    //Sprachen, die das Right-to-Left-Schreibsystem verwenden
    rtl_languages: ["ar", "arc", "dv", "fa", "ha", "he", "khw", "ks", "ku", "ps", "ur", "yi"]
  }),
  computed: {
    alignment(){
      let language = navigator.language;
      console.log(language);
      if(this.rtl_languages.includes(language)){
        return "rtl";
      }
      return "ltr";
    }
  },
  methods:{
    goto(target){
      this.currentPage=target;
    },
    reload(obj){
      console.log(obj);
    }
  }
}
</script>

<style>
html, body {
 height:100vh;
 margin: 0;
 padding: 0;
 background-color: #87d5ca;
 display: flex;
 justify-content: center;
}

html, body, button {
  font-family: lekton;
}

:root {
  --el-color-primary: #398378; 
}

h1 {
  text-align: center;
  margin-top: 0;
}

@font-face {
    font-family: lekton;
    src: url('~@/assets/fonts/lekton_regular.ttf');
}

.full_height{
  width: 80vw;
  border: 1px solid #398378;
  background-color: #398378;
  border-radius: 1%;
  height: 96vh;
  margin-top: 1%;
  margin-bottom: 1%;
}

.padding_l{
  padding-left: 5%;
  padding-right: 2%;

}

.padding_r {
  padding-right: 5%;
  padding-left: 2%;
}

.padding_lr {
  padding-right: 5%;
  padding-left: 5%;
}

.header{
  padding-left: 0%;
  padding-right: 0%;
  padding-top: 0%;
  padding-bottom: 0%;
  height: auto;
}

.content{
  background-color: white;
  padding-right: 0%;
  padding-left: 0%;
}

.footer {
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 2%;
  padding-bottom: 2%;
  height: auto;
}

.height_100{
  height: 100%;
  padding: 0;
}

</style>
