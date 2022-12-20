<template>
    <div class="wrapper">
      <el-button class="linkElem" @click="handleSelect('impressum')" link>Impressum</el-button>
      <el-button class="linkElem" @click="handleSelect('datenschutz')" link>Datenschutz</el-button>
    </div>
</template>

<script>

export default {
name: "Footer",
methods: {
    handleSelect(key){
        if(key == "impressum"){
        this.$emit('goto', 'impressum');
        } else if (key == "datenschutz") {
        this.$emit('goto', 'datenschutz');
        }
    }
}
}

</script>

<style scoped>

.wrapper{
width: 100%;
display: flex;
justify-content: center;
}

.linkElem{
    margin-left: 1vw;
    margin-right: 1vw;
    color: white;
}

</style>