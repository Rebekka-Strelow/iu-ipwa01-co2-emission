<template>
    <el-row class="row-bg" justify="end"> 
        <el-col span=6>
            <el-input v-model="input"  @clear="fireReset" placeholder="Suchtext" clearable/>
        </el-col>
        <el-col span=6>
            <el-button @click="fireSearch" plain>Suchen</el-button>
        </el-col>
    </el-row>

</template>
<script>
export default {
    name: "SearchBar",
    props: [
        "type"
    ],
    methods: {
        fireSearch() {
            this.$emit('search', this.type, this.input);
        },
        fireReset(){
            this.$emit('reset', this.type);
        }
    },
    data: () => ({
        input: "Hallo Welt"
    })
}
</script>
<style>

</style>