<template>
  <el-container class="full_height">
    <el-header class="header">
      <HeaderImage :alignment=alignment />
      <HeaderBar @goto="goto" @reload="reload" :alignment=alignment />
    </el-header>
    <el-main class="content height_100">
      <EmissionTable v-if="this.currentPage == 'main'" class="padding_r" :json_data=backend_data
        :filter_unternehmen=filter_unternehmen :filter_land=filter_land />

      <InfoContent v-if="this.currentPage == 'info'" class="padding_r" />

      <ImpressumContent v-if="this.currentPage == 'impressum'" class="padding_r" />

      <DatenschutzContent v-if="this.currentPage == 'datenschutz'" class="padding_r" />
    </el-main>
    <el-footer class="footer">
      <PageFooter @goto="goto" />
    </el-footer>
  </el-container>
</template>


<script>
import EmissionTable from "./components/EmissionTable";
import HeaderImage from "./components/HeaderImage";
import HeaderBar from './components/HeaderBar';
import InfoContent from "./components/InfoContent";
import PageFooter from "./components/PageFooter";
import ImpressumContent from './components/ImpressumContent';
import DatenschutzContent from './components/DatenschutzContent';


export default {
  name: 'App',
  components: {
    EmissionTable,
    HeaderImage,
    HeaderBar,
    InfoContent,
    PageFooter,
    ImpressumContent,
    DatenschutzContent
  },
  data: () => ({
    currentPage: "main",
    //Test-Dummys, Backend kommt später
    backend_data: [
      { id: "0", unternehmen: "Loading ...", land: "Loading ...", wert: 0 }
    ],
    filter_unternehmen: [
      { text: "MusterA", value: "MusterA" },
      { text: "MusterB", value: "MusterB" },
      { text: "MusterC", value: "MusterC" },
      { text: "MusterD", value: "MusterD" },
    ],
    filter_land: [
      { text: "China", value: "China" },
      { text: "Amerika", value: "Amerika" },
      { text: "Deutschland", value: "Deutschland" },
      { text: "Hawaii", value: "Hawaii" },
    ],
    //Sprachen, die das Right-to-Left-Schreibsystem verwenden
    rtl_languages: ["ar", "arc", "dv", "fa", "ha", "he", "khw", "ks", "ku", "ps", "ur", "yi"],
    responseAvailable: false
  }),
  computed: {
    alignment() {
      let language = navigator.language;
      if (this.rtl_languages.includes(language)) {
        return "rtl";
      }
      return "ltr";
    },

  },
  methods: {
    goto(target) {
      this.currentPage = target;
    },
    reload(obj) {
      console.log(obj);
    },

    //Hole die Daten für die Tabelle
    fetchBackendData() {
      fetch("http://localhost:8081/data",
        {
          "method": "GET",
          headers: {
            "Content-Type": "application/json",
            "Origin": "http://localhost:8080",
          }
        }).then(response => response.json())
          .then(data => this.parseAndLoadTable(data));
    },
    parseAndLoadTable(data) {
      let index = 1;
      let processedData = [];
      data.forEach(element => {
        element.id = index;
        processedData.push(element);
      });
      this.backend_data = processedData;
    },
    //Hole die Daten für die Filter
    fetchCountryFilterData(){
      fetch("http://localhost:8081/countries",
        {
          "method": "GET",
          headers: {
            "Content-Type": "application/json",
            "Origin": "http://localhost:8080",
          }
        }).then(response => response.json())
          .then(data => this.parseAndLoadCountry(data));
    },
    parseAndLoadCountry(data){
      this.filter_land = [];
      data.forEach(element => {
        let obj = {};
        obj.text = element;
        obj.value = element;
        this.filter_land.push(obj);
      })
    },
    fetchCompanyFilterData(){
      fetch("http://localhost:8081/companies",
        {
          "method": "GET",
          headers: {
            "Content-Type": "application/json",
            "Origin": "http://localhost:8080",
          }
        }).then(response => response.json())
          .then(data => this.parseAndLoadCompany(data));
    },
    parseAndLoadCompany(data){
      this.filter_unternehmen = [];
      data.forEach(element => {
        let obj = {};
        obj.text = element;
        obj.value = element;
        this.filter_unternehmen.push(obj);
      })
    }
  },
  mounted: function () {
    this.fetchBackendData();
    this.fetchCountryFilterData();
    this.fetchCompanyFilterData();
  }
}
</script>

<style>
html,
body {
  height: 100vh;
  margin: 0;
  padding: 0;
  background-color: #87d5ca;
  display: flex;
  justify-content: center;
}

html,
body,
button {
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

.full_height {
  width: 80vw;
  border: 1px solid #398378;
  background-color: #398378;
  border-radius: 1%;
  height: 96vh;
  margin-top: 1%;
  margin-bottom: 1%;
}

.padding_l {
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

.header {
  padding-left: 0%;
  padding-right: 0%;
  padding-top: 0%;
  padding-bottom: 0%;
  height: auto;
}

.content {
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

.height_100 {
  height: 100%;
  padding: 0;
}
</style>
