<template>
        <el-menu 
          class="headerBar" 
          mode="horizontal"
          @select="handleSelect"
          :ellipsis="false">
          <!-- LTR-Anordnung -->
          <el-menu-item v-if="this.alignment=='ltr'" index="1">Hauptseite</el-menu-item>
            <el-menu-item v-if="this.alignment=='ltr'" index="2">Informationen</el-menu-item>
            <div v-if="this.alignment=='ltr'" class="flex-grow" />
            <el-sub-menu v-if="this.alignment=='ltr'" index="3">
              <template #title >Aktionen</template>
              <el-menu-item index="3-1">Daten neu einlesen</el-menu-item>
              <el-menu-item index="3-2">Filter neu berechnen</el-menu-item>
            </el-sub-menu>

            <!-- RTL-Anordnung -->
            <el-sub-menu v-if="this.alignment=='rtl'" index="3">
              <template #title >Aktionen</template>
              <el-menu-item index="3-1">Daten neu einlesen</el-menu-item>
              <el-menu-item index="3-2">Filter neu berechnen</el-menu-item>
            </el-sub-menu>
            <div v-if="this.alignment=='rtl'" class="flex-grow" />
            <el-menu-item v-if="this.alignment=='rtl'" index="2">Informationen</el-menu-item>
            <el-menu-item v-if="this.alignment=='rtl'" index="1">Hauptseite</el-menu-item>

        </el-menu>  
</template>

<script>

export default {
  name: "HeaderBar",
  methods: {
    handleSelect(key){
      if(key == "1"){
        this.$emit('goto', 'main');
      } else if (key == "2") {
        this.$emit('goto', 'info');
      } else if (key == "3-1") {
        this.$emit('reload', 'data');
      } else if (key == "3-2") {
        this.$emit('reload', 'filters');
      }
    }
  },
  props: [
    'alignment'
  ]
}

</script>

<style>

.flex-grow{
  flex-grow: 1;
}

</style>