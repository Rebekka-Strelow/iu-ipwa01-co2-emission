<template>
  <el-container class="full_height">
    <el-header class="header">
      <HeaderImage :alignment=alignment />
      <HeaderBar @goto="goto" @reload="reload" :alignment=alignment />
    </el-header>
    <el-main class="content height_100">
      <EmissionTable v-if="this.currentPage == 'main'" class="padding_r" :json_data=backend_data
        :filter_unternehmen=filter_unternehmen :filter_land=filter_land @search="search" @reset="reset" />

      <InfoContent v-if="this.currentPage == 'info'" class="padding_r" :faq_data=faq_data @search="search" @reset="reset"/>

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
import { ElMessage } from 'element-plus';
import Fuse from 'fuse.js';


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
    //aktuell angezeigte Seite
    currentPage: "main",

    //Globale Valiablen, um die Daten aus dem Backend zu speichern
    backend_data: [],
    faq_data: [],
    filter_unternehmen: [],
    filter_land: [],

    //Sprachen, die das Right-to-Left-Schreibsystem verwenden
    rtl_languages: ["ar", "arc", "dv", "fa", "ha", "he", "khw", "ks", "ku", "ps", "ur", "yi"],
  }),
  computed: {
    //Wird die Seite von Links nach Rechts oder von Rechts nach Links dargestellt?
    alignment() {
      let language = navigator.language;
      if (this.rtl_languages.includes(language)) {
        return "rtl";
      }
      return "ltr";
    }
  },
  methods: {
    //Wechsele die angezeigte Seite
    goto(target) {
      this.currentPage = target;
    },

    //Suche in dem angegebenen Datensatz
    search(target, text) {
      //Suche in der Datentabelle
      if (target == "data") {
        const options = {
          minMatchCharLength: text.length,
          keys: ["unternehmen", "land"]
        }
        const fuse = new Fuse(this.backend_data, options);
        let result = fuse.search(text);
        this.backend_data = [];
        result.forEach(element => {
          this.backend_data.push(element.item);
        })
      }

      //Suche in den FAQs
      if(target == "faq"){
        const options = {
          minMatchCharLength: text.length,
          keys: ["question", "answer"]
        }
        const fuse = new Fuse(this.faq_data, options);
        let result = fuse.search(text);
        this.faq_data = [];
        result.forEach(element => {
          this.faq_data.push(element.item);
        })
      }

    },

    //Entferne den Such-Filter wieder
    reset(target) {
      if (target == "data") {
        this.fetchBackendData();
      }
      if (target == "faq") {
        this.fetchFAQData();
      }
    },

    //Stößt die Resets für Daten und Filter an und lädt dann die Daten neu ins Frontend
    reload(obj) {
      if (obj == "data") {
        this.resetData();
      } else if (obj == "filters") {
        this.resetFilters();
      }
      this.fetchBackendData();
      this.fetchCountryFilterData();
      this.fetchCompanyFilterData();
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

    //Hole die Daten für die FAQs
    fetchFAQData() {
      fetch("http://localhost:8081/faq",
        {
          "method": "GET",
          headers: {
            "Content-Type": "application/json",
            "Origin": "http://localhost:8080",
          }
        }).then(response => response.json())
        .then(data => this.parseAndLoadFAQ(data));
    },
    parseAndLoadFAQ(data) {
      let index = 1;
      let processedData = [];
      data.forEach(element => {
        element.id = index;
        processedData.push(element);
      });
      this.faq_data = processedData;
    },

    //Hole die Daten für die Filter der Länder
    fetchCountryFilterData() {
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
    parseAndLoadCountry(data) {
      this.filter_land = [];
      data.forEach(element => {
        let obj = {};
        obj.text = element;
        obj.value = element;
        this.filter_land.push(obj);
      })
    },

    //Hole die Daten für die Filter der Unternehmen
    fetchCompanyFilterData() {
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
    parseAndLoadCompany(data) {
      this.filter_unternehmen = [];
      data.forEach(element => {
        let obj = {};
        obj.text = element;
        obj.value = element;
        this.filter_unternehmen.push(obj);
      })
    },

    //Reset-Methode für die Tabellendaten
    resetData() {
      fetch("http://localhost:8081/resetData",
        {
          "method": "GET",
          headers: {
            "Content-Type": "application/json",
            "Origin": "http://localhost:8080",
          }
        }).then((response) => {
          if (!response.ok) {
            ElMessage({
              showClose: true,
              message: 'Beim Neuladen der Daten ist ein Fehler aufgetreten',
              type: 'error',
            })
          }
          ElMessage({
            showClose: true,
            message: 'Neuladen der Daten erfolgreich',
            type: 'success',
          })
        })
    },

    //Reset-Methode für die Filter
    resetFilters() {
      fetch("http://localhost:8081/resetFilters",
        {
          "method": "GET",
          headers: {
            "Content-Type": "application/json",
            "Origin": "http://localhost:8080",
          }
        }).then((response) => {
          if (!response.ok) {
            ElMessage({
              showClose: true,
              message: 'Beim Neuladen der Filter ist ein Fehler aufgetreten',
              type: 'error',
            })
          }
          ElMessage({
            showClose: true,
            message: 'Neuladen der Filter erfolgreich',
            type: 'success',
          })
        })
    }
  },
  mounted: function () {
    //On Mount: Lade die Daten ins Frontend ein
    this.fetchBackendData();
    this.fetchFAQData();
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
  font-family: libre_franklin;
}

:root {
  --el-color-primary: #398378;
}

h1 {
  margin-top: 2%;
  text-align: left;
}

.el-table {
  margin-bottom: 2%;
}


@font-face {
  font-family: libre_franklin;
  src: url('~@/assets/fonts/LibreFranklin-Thin.ttf');
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
